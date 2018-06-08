import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Icon, Masthead as PfMasthead, MenuItem } from 'patternfly-react';
import { reduxActions } from '../../redux';
import helpers from '../../common/helpers';
import titleImg from '../../styles/images/title.svg';

class Masthead extends React.Component {
  state = {
    mobileToggle: true
  };

  onAbout = e => {
    e.preventDefault();
  };

  onHelp = e => {
    e.preventDefault();
  };

  onLogoutUser = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  navToggle = () => {
    const { mobileToggle } = this.state;

    this.setState({ mobileToggle: !mobileToggle });
  };

  renderMobileNav() {
    if (this.state.mobileToggle) {
      return null;
    }

    return (
      <div
        role="menu"
        className="nav-pf-vertical nav-pf-vertical-with-sub-menus nav-pf-vertical-with-badges hidden show-mobile-nav"
        aria-live="polite"
      >
        <ul className="list-group">
          <li className="list-group-item">
            <a role="menuitem" href="#about" onClick={this.onAbout}>
              <span className="list-group-item-value">About</span>
            </a>
          </li>
          <li className="list-group-item">
            <a role="menuitem" href="#help" onClick={this.onHelp}>
              <span className="list-group-item-value">Help</span>
            </a>
          </li>
          <li className="list-group-item">
            <a role="menuitem" href="#logout" onClick={this.onLogoutUser}>
              <span className="list-group-item-value">Logout</span>
            </a>
          </li>
        </ul>
      </div>
    );
  }

  static renderActions() {
    return (
      <PfMasthead.Dropdown id="app-help-dropdown" title={<span aria-hidden className="pficon pficon-help" />}>
        <MenuItem eventKey="1" onClick={this.onHelp}>
          Help
        </MenuItem>
        <MenuItem eventKey="2" onClick={this.onAbout}>
          About
        </MenuItem>
      </PfMasthead.Dropdown>
    );
  }

  renderUserDropdown() {
    const { user } = this.props;

    return (
      <PfMasthead.Dropdown
        id="app-user-dropdown"
        title={
          <React.Fragment>
            <Icon type="pf" name="user" /> {user && user.username}
          </React.Fragment>
        }
      >
        <MenuItem onClick={this.onLogoutUser}>Logout</MenuItem>
      </PfMasthead.Dropdown>
    );
  }

  render() {
    return (
      <PfMasthead titleImg={titleImg} title="Cloud Meter" className="cloudmeter-nav" onNavToggleClick={this.navToggle}>
        <PfMasthead.Collapse>
          {Masthead.renderActions()}
          {this.renderUserDropdown()}
        </PfMasthead.Collapse>
        {this.renderMobileNav()}
      </PfMasthead>
    );
  }
}

Masthead.propTypes = {
  logoutUser: PropTypes.func,
  user: PropTypes.shape({
    username: PropTypes.string
  })
};

Masthead.defaultProps = {
  logoutUser: helpers.noop,
  user: {}
};

const mapDispatchToProps = dispatch => ({
  logoutUser: () => dispatch(reduxActions.user.logoutUser())
});

const mapStateToProps = state => ({
  user: state.user.session
});

const ConnectedMasthead = connect(
  mapStateToProps,
  mapDispatchToProps
)(Masthead);

export { ConnectedMasthead as default, ConnectedMasthead, Masthead };
