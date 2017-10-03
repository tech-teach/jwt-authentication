/**
 * Interact with an auth service
 */


import request from 'superagent';


const SERVICE_URL = 'http://localhost/service';


class Service {
    constructor(token, serviceUrl = SERVICE_URL) {
        this.serviceUrl = serviceUrl;
        this.token = token;
    }

    get(url, onSucces, onError) {
        request
            .get(this.serviceUrl + url)
            .set('Authorization', `Bearer ${this.token}`)
            .end((err, res) => {
                if (!err) {
                    onSucces(res.body);
                } else {
                    onError(err);
                }
            })
    }

    getProtected(onSucces, onError) {
        this.get('/protected', onSucces, onError);
    }

    getSecret(onSucces, onError) {
        this.get('/secret', onSucces, onError);
    }
}

export default Service;