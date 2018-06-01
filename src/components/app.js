import React from 'react';
import { withRouter } from 'react-router';
import { Router } from './router/router';
import Authentication from './authentication/authentication';
import Masthead from './masthead/masthead';
import ToastNotificationsList from './toastNotificationsList/toastNotificationsList';

const App = () => (
  <React.Fragment>
    <Authentication>
      <div className="layout-pf layout-pf-fixed">
        <Masthead />
        <div>
          <ToastNotificationsList />
          <Router />
        </div>
      </div>
    </Authentication>
  </React.Fragment>
);

export default withRouter(App);
