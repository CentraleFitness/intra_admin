import axios from 'axios';
import HttpMethods from './HttpMethods'

class Communication {
    constructor(method, path, params) {
        this.method = method;
        this.path = path;
        this.params = params;
    }

    sendRequest(thenFunc, catchFunc) {
        let method = this.method;
        let path = this.path;
        let params = this.params;

        if (method === HttpMethods.GET || method === HttpMethods.DELETE) {

            axios({
                method: method,
                url: path,
                params: params
            })
            .then(thenFunc)
            .catch(catchFunc);

        } else if (method === HttpMethods.POST || method === HttpMethods.PUT) {

            axios({
                method: method,
                url: path,
                data: JSON.stringify(params)
            })
            .then(thenFunc)
            .catch(catchFunc);
        }
    }

    sendRequestSiretAPI(thenFunc, catchFunc) {
        let method = this.method;
        let path = this.path;
        let params = this.params;

        let api_key = "bf387250a734234389eb6d21e96660db";
        let api_secret = "aa37da76c33d45d0034e75743e9afbf2";
        let credentials = btoa(api_key + ':' + api_secret);

        let basicAuth = 'Basic ' + credentials;

        axios({
            method: method,
            url: path,
            headers: {
                'Content-type': 'application/json',
                'Authorization': basicAuth
            },
            params: params
        })
        .then(thenFunc)
        .catch(catchFunc);
    }


}

export default Communication;