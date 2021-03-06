import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import AuthProvider from './components/AuthProvider';
import AuthConsumer from './components/AuthConsumer';

// Needs to be pem encoded, lame :(
const PUBLIC_KEY = `
-----BEGIN RSA PUBLIC KEY-----
MIIBCgKCAQEAp6aWR0qcqFeCmK/lxgYfrTSXx7/WTpBqSp18TbLcjr1QV4kyxswG
+QzDl7EITokSd3yvI6eMbv6NxkRqumG7M50mNKm6DljRMh26/R4z17r4IFgNZr60
FQ48cHWE7xl5O4INSyjHGIK6vHepDsbHeGJNYAbeNTB0F9CHl6TKYeZNAnYVykPd
C3/Wp5TzLNP6KgDvGMlyLHh1ZyF0Xau+bupGvvMfnL9hw04/Y7eCr8knVFOVfC5e
lNt6NMxKtjutm/EqLW49tZRvVG5IvNhFmr2G4QzmRT6WmaWgq19L9eZ4S4qoDsYe
E7SE3LWqBPR/O3L8GCw9wJEeG+A75k/QqwIDAQAB
-----END RSA PUBLIC KEY-----
`;


class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <AuthProvider publicKey={PUBLIC_KEY}>
          <AuthConsumer
            user={{/* will be populated by the provider */}}
            token={'' /* will be populated by the provider */ } />
        </AuthProvider>
      </div>
    );
  }
}

export default App;
