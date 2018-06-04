import React from 'react';
import { withRouter } from 'react-router';
import { Router } from './router/router';
import Authentication from './authentication/authentication';
import Masthead from './masthead/masthead';
import AccountWizard from './accountWizard/accountWizard';
import ConfirmationModal from './confirmationModal/confirmationModal';
import ToastNotificationsList from './toastNotificationsList/toastNotificationsList';

const App = () => (
  <React.Fragment>
    <Authentication>
      <div className="layout-pf layout-pf-fixed">
        <Masthead />
        <div>
          <ToastNotificationsList />
          <AccountWizard />
          <ConfirmationModal />
          <Router />
        </div>
      </div>
    </Authentication>
  </React.Fragment>
);

export default withRouter(App);
