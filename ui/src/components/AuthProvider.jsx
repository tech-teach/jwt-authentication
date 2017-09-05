/**
 * Provides authentication.
 */

import React, {Component} from 'react';


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

    login() {
        // for now just set the token to whatever
        const token = 'skdfjlskdf.sdfsdfsdf.sdfsdfsdfsdf';
        localStorage.setItem('token', token);
        this.setState({ token });
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
            <p onClick={this.login.bind(this)}>The guy is not authed</p>
        );
    }
}


export default AuthProvider;