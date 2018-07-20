import helpers from '../../common/helpers';

const dateFieldTypes = helpers.generatePriorYearMonthArray();

const filterFieldTypes = [
  {
    id: 'search_by_name',
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

const accountViewTypes = { dateFields: dateFieldTypes, filterFields: filterFieldTypes, sortFields: sortFieldTypes };

export { accountViewTypes as default, accountViewTypes, dateFieldTypes, filterFieldTypes, sortFieldTypes };
