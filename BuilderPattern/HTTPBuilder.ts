type HTTPRequest = {
    url: string,
    method: "POST"|"GET"|"PUT" |"DELETE",
    headers: Record<string,string>,
    body?: Record<string , string>,
    timeout: number,
  
}


class HTTPRequestBuilder{

    private fields: Partial<HTTPRequest> ={};

    url(value:string): this {
        this.fields.url = value;
        return this;
    }

    method(value: "POST"|"GET"|"PUT" |"DELETE"): this {
        this.fields.method = value;
        return this;
    }

   header(key: string, value: string): this {
    if (!this.fields.headers) this.fields.headers = {};
    this.fields.headers[key] = value;   // ✅ accumulates
    return this;
    }

    body(value: Record<string , string>): this {
        this.fields.body = value;
        return this;
    }

    timeout(value: number): this {
        this.fields.timeout = value;
        return this;
    }

    build(): HTTPRequest {
        if(!this.fields.url || !this.fields.method) {
            throw new Error("URL and Method are required fields")
        }
        if (this.fields.method === "GET" && this.fields.body) {
            throw new Error("GET requests cannot have a body");  // ✅ cross-field rule
        }
        return this.fields as HTTPRequest;
    }
}

const request = new HTTPRequestBuilder()
        .url("https://api.example.com/data")
        .method("POST")
        .header("Content-Type", "application/json")
        .header("Authorization", "Bearer token")
        .body({key: "value"})
        .timeout(5000)
        .build();