### Light Proxy

#### Start

`npm start`

#### Usage example

`http_proxy='127.0.0.1:3000' curl 'http://www.google.com.ua/?gfe_rd=cr&amp;ei=dghVV4LSGrCt8we1yJbABg'`

#### Workflow

1. On first request proxy create `cache.txt` for caching
    1. Send request with url
        1. Write response to cache
        2. Send response to requester
        
2. On second request will response with body from cache and send request
    1. Send response to requester from cache
    2. Send request with url
        1. Write response to cache