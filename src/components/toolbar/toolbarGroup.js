import React from 'react';
import PropTypes from 'prop-types';

const ToolbarGroup = ({ children }) => <div className="form-group">{children}</div>;

ToolbarGroup.propTypes = {
  children: PropTypes.node.isRequired
};

ToolbarGroup.defaultProps = {};

export { ToolbarGroup as default, ToolbarGroup };
