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
        print(opt)
        print("OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO")
        print(type(opt))

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


def get_expiry(request, name):
    tick = yf.Ticker("{}".format(name))
    expiries = tick.options
    expiries = json.dumps(expiries)
    expiries = json.loads(expiries)

    chain = tick.option_chain('2020-05-01')
    calls = chain.calls
    calls = calls.to_json()
    calls = json.loads(calls)

    return JsonResponse(expiries, safe=False)


def get_yahoo_data(request, stock, exp):
    ticker = yf.Ticker("{}".format(stock))
    expiries = ticker.options
    option = ticker.option_chain(expiries[exp])
    calls = option.calls.fillna(0)
    puts = option.puts.fillna(0)

    out = {"strike": calls['strike'].values.tolist(), "bid": calls['bid'].values.tolist(), "ask": calls['ask'].values.tolist(),
           "openInterest": calls['openInterest'].values.tolist(), "volume": calls['volume'].values.tolist(), "inTheMoney": calls['inTheMoney'].values.tolist()}
    
    out = [calls['strike'], calls['bid'], calls['ask'], calls['openInterest'], calls['volume'], calls['inTheMoney'],
            puts['strike'], puts['bid'], puts['ask'], puts['openInterest'], puts['volume'], puts['inTheMoney'], ]
    out = list(map(lambda x: x.fillna(0).values.tolist(), out))
    
    out = {"expiry": expiries,
            "Cstrike": out[0], "Cbid": out[1], "Cask": out[2], "CopenInterest": out[3], "Cvolume": out[4], "CinTheMoney": out[5],
            "Pstrike": out[6], "Pbid": out[7], "Pask": out[8], "PopenInterest": out[9], "Pvolume": out[10], "PinTheMoney": out[11]}

    out = json.dumps(out)
    out = json.loads(out)

    print(out)
    print(type(out))
    print(out.keys())
    
    return JsonResponse(out, safe=False)


def xget_yahoo_data(request, stock, exp):
    ticker = yf.Ticker("{}".format(stock))

    info = ticker.info
    
    expiries = ticker.options
    opt = ticker.option_chain(expiries[exp])
    calls = opt.calls
    puts = opt.puts

    out = [calls['strike'], calls['bid'], calls['ask'], calls['openInterest'], calls['volume'], calls['inTheMoney'],
            puts['strike'], puts['bid'], puts['ask'], puts['openInterest'], puts['volume'], puts['inTheMoney'], ]
    
    print(out, "ooooooooooooooooooooooooooooooooooo")
    
    out = list(map(lambda x: x.fillna(0).values.tolist(), out))
    """ out = {"name": info["shortName"], "expiry": expiries, "previous": info["previousClose"], "bid": info['bid'], "sharesShort": info['sharesShort'],
            "sharesPercentSharesOut": info['sharesPercentSharesOut'], "priceToBook": info['priceToBook'], "shortRatio": info['shortRatio'],
            "shortPercentOfFloat": info['shortPercentOfFloat'],
            "Cstrike": out[0], "Cbid": out[1], "Cask": out[2], "CopenInterest": out[3], "Cvolume": out[4], "CinTheMoney": out[5],
            "Pstrike": out[6], "Pbid": out[7], "Pask": out[8], "PopenInterest": out[9], "Pvolume": out[10], "PinTheMoney": out[11]} """

    out = { "Cstrike": out[0], "Cbid": out[1], "Cask": out[2], "CopenInterest": out[3], "Cvolume": out[4], "CinTheMoney": out[5]}
    print(out, "zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz")

    out = json.dumps(out)
    out = json.loads(out)
    print(out)
    print(type(out))
    return JsonResponse(out, safe=False)
