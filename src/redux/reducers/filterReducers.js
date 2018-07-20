import { accountTypes, filterTypes } from '../constants';
import helpers from '../../common/helpers';

const initialState = {
  account: {
    activeFilters: [],
    currentPage: 1,
    dateValue: null,
    expandedItems: [],
    filterField: null,
    filterValue: '',
    pageSize: 15,
    selectedCount: 0,
    selectedItems: [],
    sortAscending: true,
    sortValue: null,
    totalCount: 0,
    totalPages: 0
  },
  detail: {}
};

const filterReducers = (state = initialState, action) => {
  const checkActionType =
    (action.view && action.type) || (Object.keys(filterTypes).indexOf(action.type) < 0 && action.type) || null;

  let activeFilters;

  switch (checkActionType) {
    case filterTypes.TOOLBAR_SET_DATE_TYPE:
      return helpers.setStateProp(
        action.view,
        {
          dateValue: action.dateValue,
          currentPage: 1
        },
        {
          state,
          reset: false
        }
      );

    case filterTypes.TOOLBAR_SET_SORT_TYPE:
      return helpers.setStateProp(
        action.view,
        {
          sortValue: action.sortValue,
          sortAscending: (action.sortValue && action.sortValue.sortAscending) || true,
          currentPage: 1
        },
        {
          state,
          reset: false
        }
      );

    case filterTypes.TOOLBAR_ADD_FILTER:
      activeFilters = [...state[action.view].activeFilters];

      const currentFilter = activeFilters.find(filter => action.filter.field === filter.field);
      const index = activeFilters.indexOf(currentFilter);

      if (index > -1) {
        activeFilters[index] = action.filter;
      } else {
        activeFilters.push(action.filter);
      }

      return helpers.setStateProp(
        action.view,
        {
          activeFilters,
          currentPage: 1
        },
        {
          state,
          reset: false
        }
      );

    case filterTypes.TOOLBAR_REMOVE_FILTER:
      activeFilters = state[action.view].activeFilters.filter(filter => action.filter.field !== filter.field);

      return helpers.setStateProp(
        action.view,
        {
          activeFilters,
          currentPage: 1
        },
        {
          state,
          reset: false
        }
      );

    case filterTypes.TOOLBAR_SET_FILTER_TYPE:
      return helpers.setStateProp(
        action.view,
        {
          filterField: action.filterField,
          filterValue: ''
        },
        {
          state,
          reset: false
        }
      );

    case filterTypes.TOOLBAR_SET_FILTER_VALUE:
      return helpers.setStateProp(
        action.view,
        {
          filterValue: action.filterValue
        },
        {
          state,
          reset: false
        }
      );

    case filterTypes.TOOLBAR_CLEAR_FILTERS:
      return helpers.setStateProp(
        action.view,
        {
          activeFilters: [],
          currentPage: 1
        },
        {
          state,
          reset: false
        }
      );

    case filterTypes.TOOLBAR_TOGGLE_SORT_ASCENDING:
      return helpers.setStateProp(
        action.view,
        {
          currentPage: 1,
          sortAscending: !state[action.view].sortAscending
        },
        {
          state,
          reset: false
        }
      );

    case helpers.FULFILLED_ACTION(accountTypes.GET_ACCOUNTS):
      const accountView = 'account';
      const totalCount = action.payload.data.count;
      const totalPages = Math.ceil(totalCount / state[accountView].pageSize);
      const currentPage = Math.min(state[accountView].currentPage, totalPages || 1);

      return helpers.setStateProp(
        accountView,
        {
          currentPage,
          totalCount,
          totalPages
        },
        {
          state,
          reset: false
        }
      );

    default:
      return state;
  }
};

filterReducers.initialState = initialState;

export { filterReducers as default, initialState, filterReducers };
