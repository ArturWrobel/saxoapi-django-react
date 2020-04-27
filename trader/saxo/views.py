from django.shortcuts import render
from django.http import request
from rest_framework.views import APIView
from rest_framework.response import Response
from django.views.generic import View

from saxo_openapi import API
import saxo_openapi.endpoints.rootservices as rs
import saxo_openapi.endpoints.accounthistory as ah
import saxo_openapi.endpoints.chart as chart

import yfinance as yf
import requests
from bs4 import BeautifulSoup

from pprint import pprint
import json
import pandas as pd
import datetime as dt
from django.http import JsonResponse

""" def index(request):
    return render(request, 'frontend/index.html') """

ClientKey = "|y06GmvdoRNnrAh9aXBJew=="
with open('./saxo/data/token/tok.txt', 'r') as f:
    token = f.read().strip()
token = f"{token}"
client = API(access_token=token)
klient = client


def get_saxo_data(cross, horiz):
    """ with open ('./saxo/data/token/tok.txt', 'r') as f:
        token = f.read().strip()

    token = f"{token}"
    client = API(access_token=token) """

    # lets make a diagnostics request, it should return '' with a state 200
    r = rs.diagnostics.Get()
    print("request is: ", r)
    rv = client.request(r)
    assert rv is None and r.status_code == 200
    print('diagnostics passed')

    # request available rootservices-features
    r = rs.features.Availability()
    rv = client.request(r)
    print("request is: ", r)
    print("response: ")
    pprint(rv, indent=2)
    print(r.status_code)

    params = {
        "AssetType": "FxSpot",
        "Horizon": horiz,
        "Count": 100,
        "Uic": cross
    }

    c = chart.charts.GetChartData(params=params)
    z = client.request(c)
    data = json.dumps(z, indent=2)
    data = json.loads(data)
    # print(data)
    # print("================================")

    if r.status_code == 200:
        print("Gate open and data retrived!")
        df = pd.DataFrame(data['Data'])
        df[['Time', 'Reszta']] = df.Time.str.split(".", expand=True)
        df = df.drop('Reszta', 1)
        df.Time = df.Time.apply(pd.to_datetime)
        #df.set_index('Time', inplace=True)
        df.drop(["CloseBid", "HighBid", "LowBid",
                 "OpenBid"], axis=1, inplace=True)
        df.to_csv('./saxo/data/data.csv')
        print(df)
    return df


def get_data(request, *args, **kwargs):
    data = get_saxo_data()
    return JsonResponse(data, safe=False)


class ChartData(APIView):

    def get(self, request, cross, horiz, format=None):
        return Response(get_saxo_data(cross, horiz))


class Portfolio(APIView):

    def portfolio(klient, ClientKey):
        client = klient
        ClientKey = ClientKey
        r = ah.accountvalues.AccountSummary(ClientKey=ClientKey)
        client.request(r)
        data = json.dumps(r.response, indent=2)
        data = json.loads(data)
        return data["Data"]

    def get(self, request, format=None):
        return Response(Portfolio.portfolio(klient, ClientKey))


class YahooData(APIView):
    def __init__(self, stock):
        self.stock = stock

    def get_yahoo_data(stock):
        aapl = yf.Ticker("{}".format(stock))
        # print(aapl.options)
        expiries = aapl.options
        print(expiries)
        opt1 = aapl.option_chain('2020-05-01')
        calls = opt1.calls
        # print(calls)
        print(calls.columns)

        opt = calls.to_json()
        #opt = json.dumps(opt)
        opt = json.loads(opt)

        return opt

    def get(self, request, format=None):
        return Response(self.get_yahoo_data(stock))


def get_sp500(request, *args, **kwargs):
    sp = pd.read_html(
        "https://en.wikipedia.org/wiki/List_of_S%26P_500_companies")
    x = sp[0]["Symbol"]
    x = x.to_list()
    x = json.dumps(x, indent=2)
    x = json.loads(x)
    print(type(x))
    return JsonResponse(x, safe=False)

def get_yahoo_data(request, stock, exp):
    
    def yahoo_page_scrap(name):
        url = f"https://finance.yahoo.com/quote/{stock}?p={stock}&.tsrc=fin-srch"
        response = requests.get(url)
        soup = BeautifulSoup(response.text,'lxml')
        name = soup.find_all('div', {'D(ib) Mt(-5px) Mend(20px) Maw(56%)--tab768 Maw(52%) Ov(h) smartphone_Maw(85%) smartphone_Mend(0px)'})[0].find('h1').text
        price = float(soup.find_all('div', {'My(6px) Pos(r) smartphone_Mt(6px)'})[0].find('span').text)
        previous = float(soup.find_all('td', {'Ta(end) Fw(600) Lh(14px)'})[0].find('span').text)
        days_range = soup.find(id = "quote-summary").find_all('tr', 'Bxz(bb) Bdbw(1px) Bdbs(s) Bdc($seperatorColor) H(36px)')[4].text
        ex_div = soup.find(id = "quote-summary").find_all('tr', 'Bxz(bb) Bdbw(1px) Bdbs(s) Bdc($seperatorColor) H(36px)')[13].text
        change = round((price - previous)/previous*100,2)
        return [name, price, previous, change, days_range, ex_div]
    
    info = yahoo_page_scrap(stock)
    
    ticker = yf.Ticker("{}".format(stock))
    expiries = ticker.options
    option = ticker.option_chain(expiries[exp])
    calls = option.calls.fillna(0)
    puts = option.puts.fillna(0)

    print("Cena", info[1])
    ycalls = calls.loc[calls['inTheMoney'] == True].tail(8)
    yputs = puts.loc[puts['inTheMoney'] != True].tail(8)
    xcalls = calls.loc[calls['inTheMoney'] != True].head(8)
    xputs = puts.loc[puts['inTheMoney'] == True].head(8)
    
    out = [ycalls['strike'], ycalls['bid'], ycalls['ask'], ycalls['openInterest'], ycalls['volume'],
            yputs['strike'], yputs['bid'], yputs['ask'], yputs['openInterest'], yputs['volume'],
            xcalls['strike'], xcalls['bid'], xcalls['ask'], xcalls['openInterest'], xcalls['volume'],
            xputs['strike'], xputs['bid'], xputs['ask'], xputs['openInterest'], xputs['volume']]
        
    out = list(map(lambda x: x.fillna(0).values.tolist(), out))
    
    out = { "expiry": expiries, "info": info,
            "Cstrike": out[0], "Cbid": out[1], "Cask": out[2], "CopenInterest": out[3], "Cvolume": out[4],
            "Pstrike": out[5], "Pbid": out[6], "Pask": out[7], "PopenInterest": out[8], "Pvolume": out[9],
            "XCstrike": out[10], "XCbid": out[11], "XCask": out[12], "XCopenInterest": out[13], "XCvolume": out[14],
            "XPstrike": out[15], "XPbid": out[16], "XPask": out[17], "XPopenInterest": out[18], "XPvolume": out[19]}

    out = json.dumps(out)
    out = json.loads(out)

    print(out)
    print(type(out))
    print(out.keys())
    
    return JsonResponse(out, safe=False)