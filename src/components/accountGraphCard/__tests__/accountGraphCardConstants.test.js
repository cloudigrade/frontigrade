import { accountGraphCardTypes, rhelOptionsType, rhocpOptionsType } from '../accountGraphCardConstants';

describe('AccountImagesViewTypes', () => {
  it('should export the same number of types as imported', () => {
    expect(Object.keys(accountGraphCardTypes)).toHaveLength(2);
  });

  it('should return types that are defined', () => {
    Object.keys(accountGraphCardTypes).forEach(type => expect(accountGraphCardTypes[type]).toBeDefined());
  });

  it('should return types that match', () => {
    expect(accountGraphCardTypes.rhelOptions).toEqual(rhelOptionsType);
    expect(accountGraphCardTypes.rhocpOptions).toEqual(rhocpOptionsType);
  });
});
