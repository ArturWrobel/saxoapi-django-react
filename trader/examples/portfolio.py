import saxo_openapi
import saxo_openapi.endpoints.portfolio as pf
import json

with open ('tok.txt', 'r') as f:
    token = f.read().strip()

client = saxo_openapi.API(access_token=token)
AccountKey = "|y06GmvdoRNnrAh9aXBJew=="
r = pf.accounts.AccountDetails(AccountKey=AccountKey)
rv = client.request(r)
print(json.dumps(r.response, indent=4))