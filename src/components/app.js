import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import _ from 'lodash';
import { VerticalNav } from 'patternfly-react';
import { Router, routes } from './router/router';
import Authentication from './authentication/authentication';
import MastheadOptions from './mastheadOptions/mastheadOptions';
import ToastNotificationsList from './toastNotificationsList/toastNotificationsList';
import titleImg from '../styles/images/title.svg';

class App extends Component {
  static renderContent() {
    return (
      <React.Fragment>
        <ToastNotificationsList />
        <Router />
      </React.Fragment>
    );
  }

  navigateTo(path) {
    const { history } = this.props;
    history.push(path);
  }

  renderMenuItems() {
    const { location } = this.props;
    const menu = routes();
    const activeItem = menu.find(item => _.startsWith(location.pathname, item.to));

    return menu.map(item => (
      <VerticalNav.Item
        key={item.to}
        title={item.title}
        iconClass={item.iconClass}
        active={item === activeItem || (!activeItem && item.redirect)}
        onClick={() => this.navigateTo(item.to)}
      />
    ));
  }

  render() {
    const { user } = this.props;

    return (
      <Authentication>
        <div className="layout-pf layout-pf-fixed">
          <VerticalNav persistentSecondary={false}>
            <VerticalNav.Masthead>
              <VerticalNav.Brand titleImg={titleImg} />
              <MastheadOptions user={user} />
            </VerticalNav.Masthead>
            {this.renderMenuItems()}
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
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  location: PropTypes.object,
  user: PropTypes.object
};

App.defaultProps = {
  location: {},
  user: {}
};

const mapStateToProps = state => ({
  user: state.user.user
});

export default withRouter(connect(mapStateToProps)(App));
