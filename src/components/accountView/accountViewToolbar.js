import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'patternfly-react';
import { reduxTypes, store } from '../../redux';
import { fieldValidation } from '../formField/formField';
import accountViewTypes from './accountViewConstants';
import Toolbar from '../toolbar/toolbar';

class AccountViewToolbar extends React.Component {
  componentDidMount() {
    const { dateFields, dateValue, filterField, filterFields, sortFields, sortValue } = this.props;

    if (!dateValue) {
      this.onUpdateDateField(dateFields[0]);
    }

    if (!filterField) {
      this.onSelectFilter(filterFields[0]);
    }

    if (!sortValue) {
      this.onUpdateSortField(sortFields[0]);
    }
  }

  onAddAccount = () => {
    store.dispatch({
      type: reduxTypes.account.ADD_ACCOUNT_SHOW
    });
  };

  onExport = () => {
    store.dispatch({
      type: reduxTypes.toastNotifications.TOAST_ADD,
      alertType: 'warning',
      message: 'Export not yet enabled'
    });
  };

  onUpdateDateField = dateValue => {
    this.onDispatch(reduxTypes.filter.TOOLBAR_SET_DATE_TYPE, { dateValue });
  };

  onClearFilters = () => {
    this.onDispatch(reduxTypes.filter.TOOLBAR_CLEAR_FILTERS);
  };

  onRemoveFilter = filter => {
    this.onDispatch(reduxTypes.filter.TOOLBAR_REMOVE_FILTER, { filter });
  };

  onSelectFilter = filterField => {
    this.onDispatch(reduxTypes.filter.TOOLBAR_SET_FILTER_TYPE, { filterField });
  };

  onToggleSortDirection = () => {
    this.onDispatch(reduxTypes.filter.TOOLBAR_TOGGLE_SORT_ASCENDING);
  };

  onUpdateSortField = sortValue => {
    this.onDispatch(reduxTypes.filter.TOOLBAR_SET_SORT_TYPE, { sortValue });
  };

  onUpdateFilterValue = event => {
    this.onDispatch(reduxTypes.filter.TOOLBAR_SET_FILTER_VALUE, { filterValue: event.target.value });
  };

  onKeyPress = (key, filterValue) => {
    if (key === 'Enter') {
      this.onAddFilterValue(filterValue);
    }
  };

  onSelectFilterValue = filterValue => {
    this.onDispatch(reduxTypes.filter.TOOLBAR_SET_FILTER_VALUE, { filterValue });
    this.onAddFilterValue(filterValue);
  };

  onAddFilterValue = filterValue => {
    const { filterField } = this.props;

    if (!fieldValidation.isEmpty(filterValue)) {
      const filterText = `${filterField.title || filterField}: ${filterValue.title || filterValue}`;

      this.onDispatch(reduxTypes.filter.TOOLBAR_ADD_FILTER, {
        filter: { field: filterField, value: filterValue, label: filterText }
      });
    }
  };

  onDispatch = (type, data = {}) => {
    const { view } = this.props;

    store.dispatch({
      type,
      view,
      ...data
    });
  };

  render() {
    const {
      activeFilters,
      dateValue,
      dateFields,
      filterField,
      filterFields,
      filterValue,
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
          onUpdateField={this.onUpdateSortField}
          onToggleDirection={this.onToggleSortDirection}
          sortAscending={sortAscending}
          sortFields={sortFields}
          sortValue={sortValue}
        />
        <Toolbar.Right>
          <Toolbar.Group>
            <Button bsStyle="primary" disabled={false} onClick={this.onAddAccount}>
              Add Account
            </Button>
            <Button disabled onClick={this.onExport}>
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

AccountViewToolbar.propTypes = {
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
  view: PropTypes.string
};

AccountViewToolbar.defaultProps = {
  activeFilters: [],
  dateFields: accountViewTypes.dateFields,
  dateValue: null,
  filterField: null,
  filterFields: accountViewTypes.filterFields,
  filterValue: '',
  resultsType: 'Result',
  resultsTypePlural: 'Results',
  selectedCount: 0,
  sortAscending: true,
  sortFields: accountViewTypes.sortFields,
  sortValue: null,
  totalCount: 0,
  view: 'account'
};

export { AccountViewToolbar as default, AccountViewToolbar };
