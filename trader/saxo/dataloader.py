from saxo_openapi import API
import saxo_openapi.endpoints.rootservices as rs
import saxo_openapi.endpoints.chart as chart
from pprint import pprint
import json
import pandas as pd
import numpy as np
import datetime as dt

def import_data():     
    with open ('static/token/tok.txt', 'r') as f:
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
            "Count": 100,
            "Uic": 18
            }
            
    c = chart.charts.GetChartData(params=params)
    z = client.request(c)
    data = json.dumps(z, indent=2)
    data = json.loads(data)

    if r.status_code == 200:
        print("Gate open and data retrived!")
        df = pd.DataFrame(data['Data'])
        df[['Time', 'Reszta']] = df.Time.str.split(".", expand= True)
        df = df.drop('Reszta', 1)
        df.Time = df.Time.apply(pd.to_datetime)
        df.set_index('Time', inplace=True)
        df.to_csv('static/data/data.csv')
        #df.to_json('static/data/data.json') 
    return df