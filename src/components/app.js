import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { VerticalNav } from 'patternfly-react';
import { reduxActions } from '../redux';
import helpers from '../common/helpers';
import { Router } from './router/router';
import Authentication from './authentication/authentication';
import MastheadOptions from './mastheadOptions/mastheadOptions';
import ToastNotificationsList from './toastNotificationsList/toastNotificationsList';
import titleImg from '../styles/images/title.svg';

class App extends Component {
  logoutUser = () => {
    this.props.logoutUser();
  };

  renderMenuActions() {
    return [<VerticalNav.Item key="logout" className="collapsed-nav-item" title="Logout" onClick={this.logoutUser} />];
  }

  render() {
    const { user } = this.props;

    return (
      <Authentication>
        <div className="layout-pf layout-pf-fixed cloudmeter-verticalnav-hide">
          <VerticalNav persistentSecondary={false}>
            <VerticalNav.Masthead>
              <VerticalNav.Brand titleImg={titleImg} />
              <MastheadOptions user={user} logoutUser={this.logoutUser} />
            </VerticalNav.Masthead>
            {this.renderMenuActions()}
          </VerticalNav>
          <div className="container-pf-nav-pf-vertical">
            <ToastNotificationsList />
            <Router />
          </div>
        </div>
      </Authentication>
    );
  }
}

App.propTypes = {
  logoutUser: PropTypes.func,
  user: PropTypes.object
};

App.defaultProps = {
  logoutUser: helpers.noop,
  user: {}
};

const mapDispatchToProps = dispatch => ({
  logoutUser: () => dispatch(reduxActions.user.logoutUser())
});

const mapStateToProps = state => ({
  user: state.user.session.userInfo
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
