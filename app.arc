@app
begin-app

@static

@http
get /env

@tables
data
  scopeID *String
  dataID **String
  ttl TTL
