from saxo_openapi import API
import saxo_openapi.endpoints.trading as tr
import saxo_openapi.endpoints.portfolio as pf
import json

# Place your token in a file named: tok.txt
tok = ""
with open("tok.txt") as I:
    tok = I.read().strip()

# Our client to process the requests
client = API(access_token=tok)

# Positions, probably none, but maybe you see positions
# that you created by the explorer
r = pf.positions.PositionsMe()
rv = client.request(r)
print(json.dumps(rv, indent=2))

# Place some market orders
MO = [
{
    "AccountKey": "|y06GmvdoRNnrAh9aXBJew==",
    "Amount": "100000",
    "AssetType": "FxSpot",
    "BuySell": "Sell",
    "OrderType": "Market",
    "Uic": 21   # EURUSD
}
]

# create Order requests and process them
for r in [tr.orders.Order(data=orderspec) for orderspec in MO]:
    client.request(r)

# check for positions again
r = pf.positions.PositionsMe()
rv = client.request(r)
print(json.dumps(rv, indent=2))