import {
  accountImagesViewTypes,
  dateFieldTypes,
  filterFieldTypes,
  sortFieldTypes
} from '../accountImagesViewConstants';

describe('AccountImagesViewTypes', () => {
  it('should export the same number of types as imported', () => {
    expect(Object.keys(accountImagesViewTypes)).toHaveLength(3);
  });

  it('should return types that are defined', () => {
    Object.keys(accountImagesViewTypes).forEach(type => expect(accountImagesViewTypes[type]).toBeDefined());
  });

  it('should return types that match', () => {
    expect(accountImagesViewTypes.dateFields).toEqual(dateFieldTypes);
    expect(accountImagesViewTypes.filterFields).toEqual(filterFieldTypes);
    expect(accountImagesViewTypes.sortFields).toEqual(sortFieldTypes);
  });
});
