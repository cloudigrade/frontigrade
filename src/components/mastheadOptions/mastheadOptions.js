import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown, Icon, MenuItem } from 'patternfly-react';

const MastheadOptions = ({ user, logoutUser, showAboutModal }) => (
  <nav className="collapse navbar-collapse">
    <ul className="navbar-iconic nav navbar-nav navbar-right">
      {showAboutModal && (
        <Dropdown componentClass="li" id="help">
          <Dropdown.Toggle useAnchor className="nav-item-iconic">
            <Icon type="pf" name="help" />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <MenuItem onClick={showAboutModal}>About</MenuItem>
          </Dropdown.Menu>
        </Dropdown>
      )}
      {!logoutUser && (
        <li className="nav-item-iconic">
          <Icon type="pf" name="user" /> {user && user.username}
        </li>
      )}
      {logoutUser && (
        <Dropdown componentClass="li" id="user">
          <Dropdown.Toggle useAnchor className="nav-item-iconic">
            <Icon type="pf" name="user" /> {user && user.username}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <MenuItem onClick={logoutUser}>Log out</MenuItem>
          </Dropdown.Menu>
        </Dropdown>
      )}
    </ul>
  </nav>
);

MastheadOptions.propTypes = {
  user: PropTypes.object.isRequired,
  logoutUser: PropTypes.func,
  showAboutModal: PropTypes.func
};

MastheadOptions.defaultProps = {
  logoutUser: null,
  showAboutModal: null
};

export default MastheadOptions;
