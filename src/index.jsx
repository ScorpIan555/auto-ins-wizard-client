import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import Amplify from 'aws-amplify';
import config from './config';
import store from './stores';
import App from './App';

// import 'bootstrap';

// Configure aws-amplify services
Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: config.cognito.region,
    userPoolId: config.cognito.USER_POOL_ID,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID
  },
  Storage: {
    region: config.s3.region,
    bucket: config.s3.BUCKET,
    identityPoolId: config.cognito.IDENTITY_POOL_ID
  },
  API: {
    endpoints: [
      {
        name: 'notes',  // needs to be changed to 'quotes'
        endpoint: config.apiGateway.URL,
        region: config.apiGateway.REGION
      }
    ]
  }
});

const app = (
  <Provider store={store.configure(null)}>
    <Router>
      <App />
    </Router>
  </Provider>
);

ReactDOM.hydrate(app, document.getElementById('root'));
