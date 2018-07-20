import React from 'react';
import PropTypes from 'prop-types';
import { Toolbar as PfToolbar } from 'patternfly-react';
import ToolbarGroup from './toolbarGroup';
import ToolbarFilter from './toolbarFilter';
import ToolbarResults from './toolbarResults';
import ToolbarRight from './toolbarRight';
import ToolbarSort from './toolbarSort';

/**
 * FixMe: PF-React issue
 * PF-React behavior issues around toolbar.results component related to direct child components.
 * Use of immediate "child detection" interferes with the ability to provide a wrapper component,
 * see PF-React Toolbar/Toolbar.js. Not ideal, but the way around the issue is to implement
 * similar child detection and split, or pass the child through as an attribute.
 */
const Toolbar = ({ children }) => {
  const mainChildren = React.Children.map(children, child => (child.type !== ToolbarResults ? child : null));
  const resultsChildren = React.Children.map(children, child => (child.type === ToolbarResults ? child : null));

  return (
    <PfToolbar>
      {mainChildren}
      <PfToolbar.Results>{resultsChildren}</PfToolbar.Results>
    </PfToolbar>
  );
};

Toolbar.propTypes = {
  children: PropTypes.node.isRequired
};

Toolbar.Group = ToolbarGroup;
Toolbar.Filter = ToolbarFilter;
Toolbar.Results = ToolbarResults;
Toolbar.Right = ToolbarRight;
Toolbar.Sort = ToolbarSort;

export { Toolbar as default, Toolbar };
