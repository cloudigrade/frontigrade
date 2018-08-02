import { accountViewTypes, dateFieldTypes, filterFieldTypes, sortFieldTypes } from '../accountViewConstants';

describe('AccountViewTypes', () => {
  it('should export the same number of types as imported', () => {
    expect(Object.keys(accountViewTypes)).toHaveLength(3);
  });

  it('should return types that are defined', () => {
    Object.keys(accountViewTypes).forEach(type => expect(accountViewTypes[type]).toBeDefined());
  });

  it('should return types that match', () => {
    expect(accountViewTypes.dateFields).toEqual(dateFieldTypes);
    expect(accountViewTypes.filterFields).toEqual(filterFieldTypes);
    expect(accountViewTypes.sortFields).toEqual(sortFieldTypes);
  });
});
