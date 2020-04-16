from django.shortcuts import render
from django.http import request
from rest_framework.views import APIView
from rest_framework.response import Response
from django.views.generic import View

from saxo_openapi import API
import saxo_openapi.endpoints.rootservices as rs
import saxo_openapi.endpoints.chart as chart
from pprint import pprint
import json
import pandas as pd
import datetime as dt
from django.http import JsonResponse

""" def index(request):
    return render(request, 'frontend/index.html') """

def get_saxo_data():
        with open ('./saxo/data/token/tok.txt', 'r') as f:
            token = f.read().strip()

        token = f"{token}"
        client = API(access_token=token)

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
                "Horizon": 5,
                "Count": 10,
                "Uic": 18
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
            df.to_csv('./saxo/data/data.csv')
            print(df)
        return df    

def get_data(request, *args, **kwargs):    
    data = get_saxo_data()
    return JsonResponse(data, safe=False)

class ChartData(APIView):
    authentication_classes = []
    permission_classes = []
    
    def get(self, request, format = None):
        
        return Response(get_saxo_data())