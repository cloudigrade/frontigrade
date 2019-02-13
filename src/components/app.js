import React from 'react';
import PropTypes from 'prop-types';
import { connectRouter, reduxActions } from '../redux';
import helpers from '../common/helpers';
import { Router } from './router/router';
import AboutModal from './aboutModal/aboutModal';
import AccountWizard from './accountWizard/accountWizard';
import AccountDeleteModal from './accountEditModals/accountDeleteModal';
import AccountEditModal from './accountEditModals/accountEditModal';
import Authentication from './authentication/authentication';
import ConfirmationModal from './confirmationModal/confirmationModal';
import I18n from './i18n/i18n';
import PageLayout from './pageLayout/pageLayout';
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
          <PageLayout>
            <ToastNotificationsList />
            <AboutModal />
            <AccountWizard />
            <AccountDeleteModal />
            <AccountEditModal />
            <ConfirmationModal />
            <Router />
          </PageLayout>
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
