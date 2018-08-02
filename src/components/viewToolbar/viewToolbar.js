import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'patternfly-react';
import { reduxTypes, store } from '../../redux';
import { fieldValidation } from '../formField/formField';
import Toolbar from '../toolbar/toolbar';

class ViewToolbar extends React.Component {
  componentDidMount() {
    const { dateFields, dateValue, filterField, filterFields, sortFields, sortValue } = this.props;

    if (!dateValue && dateFields) {
      this.onUpdateDateField(dateFields[0]);
    }

    if (!filterField && filterFields) {
      this.onSelectFilter(filterFields[0]);
    }

    if (!sortValue && sortFields) {
      this.onUpdateSortField(sortFields[0]);
    }
  }

  onUpdateDateField = dateValue => {
    this.dispatchFilter(reduxTypes.filter.TOOLBAR_SET_DATE_TYPE, { dateValue });
  };

  onClearFilters = () => {
    this.dispatchFilter(reduxTypes.filter.TOOLBAR_CLEAR_FILTERS);
  };

  onRemoveFilter = filter => {
    this.dispatchFilter(reduxTypes.filter.TOOLBAR_REMOVE_FILTER, { filter });
  };

  onSelectFilter = filterField => {
    this.dispatchFilter(reduxTypes.filter.TOOLBAR_SET_FILTER_TYPE, { filterField });
  };

  onToggleSortDirection = () => {
    this.dispatchFilter(reduxTypes.filter.TOOLBAR_TOGGLE_SORT_ASCENDING);
  };

  onUpdateSortField = sortValue => {
    this.dispatchFilter(reduxTypes.filter.TOOLBAR_SET_SORT_TYPE, { sortValue });
  };

  onUpdateFilterValue = event => {
    this.dispatchFilter(reduxTypes.filter.TOOLBAR_SET_FILTER_VALUE, { filterValue: event.target.value });
  };

  onKeyPress = (key, filterValue) => {
    if (key === 'Enter') {
      this.onAddFilterValue(filterValue);
    }
  };

  onSelectFilterValue = filterValue => {
    this.dispatchFilter(reduxTypes.filter.TOOLBAR_SET_FILTER_VALUE, { filterValue });
    this.onAddFilterValue(filterValue);
  };

  onAddFilterValue = filterValue => {
    const { filterField } = this.props;

    if (!fieldValidation.isEmpty(filterValue)) {
      const filterText = `${filterField.title || filterField}: ${filterValue.title || filterValue}`;

      this.dispatchFilter(reduxTypes.filter.TOOLBAR_ADD_FILTER, {
        filter: { field: filterField, query: filterField.id, value: filterValue, label: filterText }
      });
    }
  };

  dispatchFilter = (type, data = {}) => {
    const { view, viewGlobal } = this.props;

    if (view && type) {
      store.dispatch({
        type,
        view,
        viewGlobal,
        ...data
      });
    }
  };

  render() {
    const {
      activeFilters,
      dateValue,
      dateFields,
      filterField,
      filterFields,
      filterValue,
      onAddAccount,
      onExport,
      resultsType,
      resultsTypePlural,
      sortAscending,
      sortFields,
      sortValue,
      selectedCount,
      totalCount
    } = this.props;

    return (
      <Toolbar>
        <Toolbar.Sort onUpdateField={this.onUpdateDateField} sortFields={dateFields} sortValue={dateValue} />
        <Toolbar.Filter
          filterField={filterField}
          filterFields={filterFields}
          filterValue={filterValue}
          onFilterSelected={this.onSelectFilterValue}
          onKeyPress={this.onKeyPress}
          onUpdateValue={this.onUpdateFilterValue}
          onSelectFilter={this.onSelectFilter}
        />
        <Toolbar.Sort
          disabled
          onUpdateField={this.onUpdateSortField}
          onToggleDirection={this.onToggleSortDirection}
          sortAscending={sortAscending}
          sortFields={sortFields}
          sortValue={sortValue}
        />
        <Toolbar.Right>
          <Toolbar.Group>
            <Button bsStyle="primary" disabled={!onAddAccount} onClick={onAddAccount}>
              Add Account
            </Button>
            <Button disabled={!onExport} onClick={onExport}>
              Export
            </Button>
          </Toolbar.Group>
        </Toolbar.Right>
        <Toolbar.Results
          activeFilters={activeFilters}
          alignRight
          onClearFilters={this.onClearFilters}
          onRemoveFilter={this.onRemoveFilter}
          resultsType={resultsType}
          resultsTypePlural={resultsTypePlural}
          selectedCount={selectedCount}
          totalCount={totalCount}
        />
      </Toolbar>
    );
  }
}

ViewToolbar.propTypes = {
  activeFilters: PropTypes.array,
  dateValue: PropTypes.shape({
    end: PropTypes.string,
    start: PropTypes.string,
    title: PropTypes.string,
    value: PropTypes.string
  }),
  dateFields: PropTypes.array,
  filterField: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    placeholder: PropTypes.string,
    filterType: PropTypes.string,
    filterValues: PropTypes.array
  }),
  filterFields: PropTypes.array,
  filterValue: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onAddAccount: PropTypes.func,
  onExport: PropTypes.func,
  resultsType: PropTypes.string,
  resultsTypePlural: PropTypes.string,
  selectedCount: PropTypes.number,
  sortAscending: PropTypes.bool,
  sortFields: PropTypes.array,
  sortValue: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    isNumeric: PropTypes.bool,
    sortAscending: PropTypes.bool
  }),
  totalCount: PropTypes.number,
  view: PropTypes.string,
  viewGlobal: PropTypes.string
};

ViewToolbar.defaultProps = {
  activeFilters: [],
  dateFields: [],
  dateValue: null,
  filterField: null,
  filterFields: [],
  filterValue: '',
  onAddAccount: null,
  onExport: null,
  resultsType: 'Result',
  resultsTypePlural: 'Results',
  selectedCount: 0,
  sortAscending: true,
  sortFields: [],
  sortValue: null,
  totalCount: 0,
  view: null,
  viewGlobal: null
};

export { ViewToolbar as default, ViewToolbar };
