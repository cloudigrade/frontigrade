import React from 'react';
import PropTypes from 'prop-types';
import { Button, Filter } from 'patternfly-react';
import helpers from '../../common/helpers';

const ToolbarResults = ({
  activeFilters,
  alignRight,
  resultsType,
  resultsTypePlural,
  onRemoveFilter,
  onClearFilters,
  selectedCount,
  totalCount
}) => {
  const renderCounts = () => (
    <h5 className={alignRight ? 'cloudmeter-view-count' : undefined}>
      {selectedCount > 0 && `${selectedCount} of `}
      {`${totalCount} ${totalCount === 1 ? resultsType : resultsTypePlural}`}
      {selectedCount > 0 && ' selected'}
    </h5>
  );

  if (activeFilters.length) {
    return (
      <React.Fragment>
        <Filter.ActiveLabel>Active Filters:</Filter.ActiveLabel>
        <Filter.List>
          {activeFilters.map(item => (
            <Filter.Item key={item.label} onRemove={onRemoveFilter} filterData={item}>
              {item.label}
            </Filter.Item>
          ))}
        </Filter.List>
        <Button bsStyle="link" onClick={onClearFilters}>
          Clear All Filters
        </Button>
        {renderCounts()}
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <Filter.ActiveLabel>No Filters</Filter.ActiveLabel>
      {renderCounts()}
    </React.Fragment>
  );
};

ToolbarResults.propTypes = {
  activeFilters: PropTypes.array,
  alignRight: PropTypes.bool,
  resultsType: PropTypes.string,
  resultsTypePlural: PropTypes.string,
  onClearFilters: PropTypes.func,
  onRemoveFilter: PropTypes.func,
  selectedCount: PropTypes.number,
  totalCount: PropTypes.number
};

ToolbarResults.defaultProps = {
  activeFilters: [],
  alignRight: false,
  resultsType: 'Result',
  resultsTypePlural: 'Results',
  onClearFilters: helpers.noop,
  onRemoveFilter: helpers.noop,
  selectedCount: 0,
  totalCount: 0
};

export { ToolbarResults as default, ToolbarResults };
