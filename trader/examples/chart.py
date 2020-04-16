import dash
import dash_core_components as dcc 
import dash_html_components as html
from dash.dependencies import Input, Output
import flask
import pandas as pd

import datetime

df = pd.read_csv('data.csv')
kurs = 'USDJPY'

print(df)

server = flask.Flask(__name__)

app = dash.Dash(
    __name__,
    server = server,
    routes_pathname_prefix = "/dash/"
)

app.layout = html.Div([html.Label(children="Aplikacja Webowa do sciągania danych o kursach walut"),

  
    html.Br(),
    html.Br(),
    dcc.Graph( id = "ex",
    figure= {
        "data" : [
            {"x" : df.index, "y" : df.CloseAsk, "type": "line", "name": kurs  },
            ],
            "layout" : { "title" : "Kurs {}". format(kurs)}
    })
    ])


if __name__ == "__main__":
    app.run_server (debug=True)