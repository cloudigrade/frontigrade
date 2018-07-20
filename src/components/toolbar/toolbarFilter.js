import React from 'react';
import PropTypes from 'prop-types';
import { Filter, FormControl } from 'patternfly-react';
import helpers from '../../common/helpers';

const ToolbarFilter = ({
  children,
  filterField,
  filterFields,
  filterValue,
  onFilterSelected,
  onKeyPress,
  onUpdateValue,
  onSelectFilter
}) => {
  const onValueKeyPress = event => {
    if (event.key === 'Enter' && onUpdateValue) {
      event.stopPropagation();
      event.preventDefault();
      onKeyPress(event.key, event.target.value);
    }
  };

  let filterInput = null;

  if (filterField) {
    if (filterField.filterType === 'select') {
      filterInput = (
        <Filter.ValueSelector
          filterValues={filterField.filterValues}
          currentValue={filterValue}
          placeholder={filterField.placeholder}
          onFilterValueSelected={onFilterSelected}
        />
      );
    } else {
      filterInput = (
        <FormControl
          type={filterField.filterType}
          value={filterValue || ''}
          placeholder={filterField.placeholder}
          maxLength={128}
          onChange={onUpdateValue}
          onKeyPress={onValueKeyPress}
        />
      );
    }
  }

  /**
   * FixMe: PF-React issue
   * Title is a required attribute in PF-React "FilterTypeSelector".
   * However PF-React is missing this call out. Recommend updating propTypes for "filterTypes" in PF-React with:
   * PropTypes.arrayOf(
   *   PropTypes.shape({
   *     title: PropTypes.string.isRequired,
   *     ...
   *   })
   * )
   */
  if (filterFields.length && filterFields.filter(val => val.title).length === filterFields.length) {
    return (
      <Filter>
        {children}
        {filterFields.length > 1 && (
          <Filter.TypeSelector
            filterTypes={filterFields}
            currentFilterType={filterField}
            onFilterTypeSelected={onSelectFilter}
          />
        )}
        {filterInput}
      </Filter>
    );
  }

  return null;
};

ToolbarFilter.propTypes = {
  children: PropTypes.node,
  filterField: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    filterType: PropTypes.string.isRequired,
    filterValues: PropTypes.array
  }),
  filterFields: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string.isRequired,
      placeholder: PropTypes.string,
      filterType: PropTypes.string.isRequired,
      filterValues: PropTypes.array
    })
  ),
  filterValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string.isRequired,
      placeholder: PropTypes.string,
      filterType: PropTypes.string.isRequired,
      filterValues: PropTypes.array
    })
  ]),
  onFilterSelected: PropTypes.func,
  onKeyPress: PropTypes.func,
  onUpdateValue: PropTypes.func,
  onSelectFilter: PropTypes.func
};

ToolbarFilter.defaultProps = {
  children: null,
  filterField: null,
  filterFields: [],
  filterValue: '',
  onFilterSelected: helpers.noop,
  onKeyPress: helpers.noop,
  onUpdateValue: helpers.noop,
  onSelectFilter: helpers.noop
};

export { ToolbarFilter as default, ToolbarFilter };
