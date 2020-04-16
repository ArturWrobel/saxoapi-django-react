import plotly.graph_objects as go

import pandas as pd
from datetime import datetime

df = pd.read_csv('data.csv')

fig = go.Figure(data=[go.Candlestick(x=df.index,
                open=df['OpenAsk'],
                high=df['HighAsk'],
                low=df['LowAsk'],
                close=df['CloseAsk'])])

fig.show()