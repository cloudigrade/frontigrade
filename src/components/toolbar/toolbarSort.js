import React from 'react';
import PropTypes from 'prop-types';
import { Sort } from 'patternfly-react';

const ToolbarSort = ({
  children,
  disabled,
  onUpdateField,
  onToggleDirection,
  sortAscending,
  sortFields,
  sortValue
}) => (
  <Sort>
    {children}
    {onUpdateField &&
      sortFields &&
      sortValue && (
        <Sort.TypeSelector
          disabled={disabled}
          sortTypes={sortFields}
          currentSortType={sortValue}
          onSortTypeSelected={onUpdateField}
        />
      )}
    {onToggleDirection && (
      <Sort.DirectionSelector
        disabled={disabled}
        isNumeric={(sortValue && sortValue.isNumeric) || false}
        isAscending={sortAscending || false}
        onClick={onToggleDirection}
      />
    )}
  </Sort>
);

ToolbarSort.propTypes = {
  children: PropTypes.node,
  disabled: PropTypes.bool,
  onUpdateField: PropTypes.func,
  onToggleDirection: PropTypes.func,
  sortAscending: PropTypes.bool,
  sortFields: PropTypes.array,
  sortValue: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    isNumeric: PropTypes.bool
  })
};

ToolbarSort.defaultProps = {
  children: null,
  disabled: false,
  onUpdateField: null,
  onToggleDirection: null,
  sortAscending: true,
  sortFields: [],
  sortValue: {}
};

export { ToolbarSort as default, ToolbarSort };
