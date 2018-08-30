import React from 'react';
import PropTypes from 'prop-types';
import { connectRouter, reduxActions } from '../redux';
import helpers from '../common/helpers';
import { Router } from './router/router';
import AboutModal from './aboutModal/aboutModal';
import AccountWizard from './accountWizard/accountWizard';
import AccountEditModal from './accountEditModal/accountEditModal';
import Authentication from './authentication/authentication';
import ConfirmationModal from './confirmationModal/confirmationModal';
import I18n from './i18n/i18n';
import Masthead from './masthead/masthead';
import ToastNotificationsList from './toastNotificationsList/toastNotificationsList';

class App extends React.Component {
  componentDidMount() {
    const { getLocale } = this.props;

    getLocale();
  }

  render() {
    const { locale } = this.props;

    return (
      <I18n locale={(locale && locale.value) || null}>
        <Authentication>
          <div className="layout-pf layout-pf-fixed">
            <Masthead />
            <div>
              <ToastNotificationsList />
              <AboutModal />
              <AccountWizard />
              <AccountEditModal />
              <ConfirmationModal />
              <Router />
            </div>
          </div>
        </Authentication>
      </I18n>
    );
  }
}

App.propTypes = {
  getLocale: PropTypes.func,
  locale: PropTypes.shape({
    value: PropTypes.string
  })
};

App.defaultProps = {
  getLocale: helpers.noop,
  locale: {}
};

const mapDispatchToProps = dispatch => ({
  getLocale: () => dispatch(reduxActions.user.getLocale())
});

const mapStateToProps = state => ({ locale: state.user.session.locale });

export default connectRouter(mapStateToProps, mapDispatchToProps)(App);
