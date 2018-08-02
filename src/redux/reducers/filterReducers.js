import { accountTypes, filterTypes } from '../constants';
import apiTypes from '../../constants/apiConstants';
import helpers from '../../common/helpers';

/**
 * ToDo: API-no-default-list
 * API currently has no default values, we set these defaults in state as temp-fix.
 * The dateFieldTypes load, and values for lines
 *
 * [apiTypes.API_QUERY_END]: dateFieldTypes.defaultTime.end,
 * [apiTypes.API_QUERY_START]: dateFieldTypes.defaultTime.start
 *
 * should be removed.
 */
const dateFieldTypes = helpers.generatePriorYearMonthArray();

const initialState = {
  activeFilters: [],
  currentPage: 1,
  expandedItems: [],
  filterField: null,
  filterValue: '',
  pageSize: 15,
  selectedCount: 0,
  selectedItems: [],
  totalCount: 0,
  totalPages: 0,
  query: {
    [apiTypes.API_QUERY_NAME]: null
  },
  syncView: null
};

const initialGlobalState = {
  dateValue: null,
  sortAscending: true,
  sortValue: null,
  query: {
    [apiTypes.API_QUERY_END]: dateFieldTypes.defaultTime.end,
    [apiTypes.API_QUERY_START]: dateFieldTypes.defaultTime.start,
    [apiTypes.API_QUERY_USER_ID]: null
  }
};

const initialFilterState = {
  account: {
    ...initialState
  },
  accountGlobal: {
    ...initialGlobalState
  },
  accountImages: {
    ...initialState
  }
};

const filterReducers = (state = initialFilterState, action) => {
  const checkActionType =
    (action.view && action.type) || (Object.keys(filterTypes).indexOf(action.type) < 0 && action.type) || null;

  let activeFilters;
  let query;

  switch (checkActionType) {
    case filterTypes.TOOLBAR_SET_DATE_TYPE:
      query = { ...state[action.viewGlobal || action.view].query };
      query[apiTypes.API_QUERY_END] = action.dateValue[apiTypes.API_QUERY_END];
      query[apiTypes.API_QUERY_START] = action.dateValue[apiTypes.API_QUERY_START];

      return helpers.setStateProp(
        action.viewGlobal || action.view,
        {
          dateValue: action.dateValue,
          currentPage: 1,
          query
        },
        {
          state,
          reset: false
        }
      );

    case filterTypes.TOOLBAR_SET_SORT_TYPE:
      return helpers.setStateProp(
        action.viewGlobal || action.view,
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

      query = { ...state[action.view].query };

      activeFilters.forEach(filter => {
        query[filter.query] = filter.value;
      });

      return helpers.setStateProp(
        action.view,
        {
          activeFilters,
          currentPage: 1,
          query
        },
        {
          state,
          reset: false
        }
      );

    case filterTypes.TOOLBAR_REMOVE_FILTER:
      query = { ...state[action.view].query };

      activeFilters = state[action.view].activeFilters.filter(filter => {
        if (action.filter.field.id === filter.field.id) {
          delete query[filter.query];
          return false;
        }

        return true;
      });

      return helpers.setStateProp(
        action.view,
        {
          activeFilters,
          currentPage: 1,
          query
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
      query = { ...state[action.view].query };

      state[action.view].activeFilters.forEach(filter => {
        delete query[filter.query];
      });

      return helpers.setStateProp(
        action.view,
        {
          activeFilters: [],
          currentPage: 1,
          query
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
      const accountTotalCount = (action.payload.data[apiTypes.API_RESPONSE_ACCOUNTS] || []).length;
      const accountTotalPages = Math.ceil(accountTotalCount / state[accountView].pageSize);
      const accountCurrentPage = Math.min(state[accountView].currentPage, accountTotalPages || 1);

      return helpers.setStateProp(
        accountView,
        {
          currentPage: accountCurrentPage,
          totalCount: accountTotalCount,
          totalPages: accountTotalPages
        },
        {
          state,
          reset: false
        }
      );

    case helpers.FULFILLED_ACTION(accountTypes.GET_ACCOUNT_IMAGES):
      const imagesView = 'accountImages';
      const imagesTotalCount = (action.payload.data[apiTypes.API_RESPONSE_IMAGES] || []).length;
      const imagesTotalPages = Math.ceil(imagesTotalCount / state[imagesView].pageSize);
      const imagesCurrentPage = Math.min(state[imagesView].currentPage, imagesTotalPages || 1);

      return helpers.setStateProp(
        imagesView,
        {
          currentPage: imagesCurrentPage,
          totalCount: imagesTotalCount,
          totalPages: imagesTotalPages
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
