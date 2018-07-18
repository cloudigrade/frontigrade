import React from 'react';
import PropTypes from 'prop-types';
import { Toolbar as PfToolbar } from 'patternfly-react';

class Toolbar extends React.Component {
  static renderDateFilter() {
    return null;
  }

  static renderFilter() {
    return null;
  }

  static renderSort() {
    return null;
  }

  static renderActiveFilters() {
    return null;
  }

  renderCounts() {
    const { selectedCount } = this.props;

    return (
      <h5 className="cloudmeter-view-count">
        {(!selectedCount || selectedCount <= 0) && <React.Fragment>&nbsp;</React.Fragment>}
      </h5>
    );
  }

  render() {
    const { toolbarActions } = this.props;

    return (
      <PfToolbar>
        {Toolbar.renderDateFilter()}
        {Toolbar.renderFilter()}
        {Toolbar.renderSort()}
        <PfToolbar.RightContent>{toolbarActions}</PfToolbar.RightContent>
        <PfToolbar.Results>
          {Toolbar.renderActiveFilters()}
          {this.renderCounts()}
        </PfToolbar.Results>
      </PfToolbar>
    );
  }
}

Toolbar.propTypes = {
  selectedCount: PropTypes.number,
  toolbarActions: PropTypes.node
};

Toolbar.defaultProps = {
  selectedCount: 0,
  toolbarActions: null
};

export { Toolbar as default, Toolbar };
