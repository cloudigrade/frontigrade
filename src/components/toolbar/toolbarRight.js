import React from 'react';
import PropTypes from 'prop-types';
import { Toolbar as PfToolbar } from 'patternfly-react';

const ToolbarRight = ({ children }) => <PfToolbar.RightContent>{children}</PfToolbar.RightContent>;

ToolbarRight.propTypes = {
  children: PropTypes.node.isRequired
};

ToolbarRight.defaultProps = {};

export { ToolbarRight as default, ToolbarRight };
