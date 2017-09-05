/**
 * Provides authentication.
 */

import React, {Component} from 'react';
import AuthService from '../services/auth';


class AuthProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: null,
        };
    }

    componentDidMount() {
        // Look for the token in local storage
        this.setState({
            token: localStorage.getItem('token'),
        })
    }

    login(credentials) {
        // for now just set the token to whatever
        const auth = new AuthService();
        auth.login(credentials, token => {
            localStorage.setItem('token', token);
            this.setState({ token });
        }, console.error);
    }

    logout() {
        // for now just remove the token
        localStorage.removeItem('token');
        this.setState({ token: null });
    }

    render() {
        if (this.state.token) {
            return (
                <p onClick={this.logout.bind(this)}>The guy is authed</p>
            );
        }
        return (
            <div>
                <p >The guy is not authed</p>
                <button onClick={() => this.login({username: 'admin', password: 'admin'})} >
                    login as admin
                </button>
                <button onClick={() => this.login({username: 'user', password: 'user'})} >
                    login as user
                </button>
            </div>
        );
    }
}


export default AuthProvider;