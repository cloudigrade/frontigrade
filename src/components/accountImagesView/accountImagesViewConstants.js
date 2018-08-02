import helpers from '../../common/helpers';
import apiTypes from '../../constants/apiConstants';

const dateFieldTypes = helpers.generatePriorYearMonthArray();

const filterFieldTypes = [
  {
    id: apiTypes.API_QUERY_NAME,
    title: 'Name',
    placeholder: 'Filter by Name',
    filterType: 'text'
  }
];

const sortFieldTypes = [
  {
    id: 'name',
    title: 'Name',
    isNumeric: false,
    sortAscending: true
  },
  {
    id: 'images',
    title: 'Images',
    isNumeric: false,
    sortAscending: true
  },
  {
    id: 'instances',
    title: 'Instances',
    isNumeric: false,
    sortAscending: true
  },
  {
    id: 'rhel',
    title: 'Rhel',
    isNumeric: false,
    sortAscending: true
  },
  {
    id: 'openshift',
    title: 'OpenShift',
    isNumeric: false,
    sortAscending: true
  }
];

const accountImagesViewTypes = {
  dateFields: dateFieldTypes,
  filterFields: filterFieldTypes,
  sortFields: sortFieldTypes
};

export { accountImagesViewTypes as default, accountImagesViewTypes, dateFieldTypes, filterFieldTypes, sortFieldTypes };
