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
with open ('./saxo/data/token/tok.txt', 'r') as f:
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
        #print(data)
        #print("================================")

        if r.status_code == 200:
            print("Gate open and data retrived!")
            df = pd.DataFrame(data['Data'])
            df[['Time', 'Reszta']] = df.Time.str.split(".", expand= True)
            df = df.drop('Reszta', 1)
            df.Time = df.Time.apply(pd.to_datetime)
            #df.set_index('Time', inplace=True)
            df.drop(["CloseBid","HighBid","LowBid","OpenBid"], axis=1, inplace=True)
            df.to_csv('./saxo/data/data.csv')
            print(df)
        return df    

def get_data(request, *args, **kwargs):    
    data = get_saxo_data()
    return JsonResponse(data, safe=False)

class ChartData(APIView):
    
    def get(self, request, cross, horiz, format = None):
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
    
    def get(self, request, format = None):
        return Response(Portfolio.portfolio(klient, ClientKey))


""" import http.client

class RakutenData(APIView):
    
    def get_rakuten_data(self):
        conn = http.client.HTTPSConnection("apidojo-yahoo-finance-v1.p.rapidapi.com")

        headers = {
            'x-rapidapi-host': "apidojo-yahoo-finance-v1.p.rapidapi.com",
            'x-rapidapi-key': "2b53134734mshf846a678c1ebc88p1e490ejsn6e701a2b2ab3"
            }

        conn.request("GET", "/market/get-movers?start=3&count=3&region=US&lang=en", headers=headers)

        res = conn.getresponse()
        data = res.read()
        data = json.loads(data)

        return data
    
    def get(self, request, format = None):
        return Response(RakutenData.get_rakuten_data(self)) """
    
class YahooData(APIView):
    
    def get_yahoo_data(self):
        aapl = yf.Ticker("AAPL")
        #print(aapl.options)
        opt= aapl.options
        print(type(opt))
        print(opt[0])
        
        opt1 = aapl.option_chain('2020-04-24')
        print(opt1)
        #data = opt
        opt1 = json.dumps(opt1, indent=2)
        opt1 = json.loads(opt1)
        print(opt)
        print(type(opt))
        
        return opt
    
    def get(self, request, format = None):
        return Response(YahooData.get_yahoo_data(self))
    
def get_sp500(request, *args, **kwargs):
    sp = pd.read_html("https://en.wikipedia.org/wiki/List_of_S%26P_500_companies")
    x = sp[0]["Symbol"]
    x = x.to_list()
    x = json.dumps(x, indent=2)
    x = json.loads(x)
    print(type(x))
    return JsonResponse(x, safe=False)
    
    
