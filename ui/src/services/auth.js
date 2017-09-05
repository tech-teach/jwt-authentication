/**
 * Interact with an auth service
 */


import request from 'superagent';


const SERVICE_URL = 'http://localhost/auth';


class AuthService {
    constructor(serviceUrl = SERVICE_URL) {
        this.serviceUrl = serviceUrl;
    }

    login(credentials, onSucces, onError) {
        request
            .post(this.serviceUrl + '/login')
            .send(credentials || {username: null, password: null})
            .end((err, res) => {
                if (!err) {
                    onSucces(res.body.token);
                } else {
                    onError(err);
                }
            })
    }
}

export default AuthService;