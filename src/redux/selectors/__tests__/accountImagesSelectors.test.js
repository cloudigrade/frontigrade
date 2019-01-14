import accountImagesSelectors from '../accountImagesSelectors';

describe('AccountImagesSelectors', () => {
  it('Should return specific selectors', () => {
    expect(accountImagesSelectors).toMatchSnapshot('selectors');
  });

  it('Should filter the state with imageDetail', () => {
    const state = {
      accountImageEdit: {
        2: {
          test: 'success'
        }
      }
    };
    const props = {
      id: 2
    };

    expect(accountImagesSelectors.imageDetail(state, props)).toMatchSnapshot('imageDetail');
  });

  it('Should filter the state with imagesView', () => {
    const state = {
      accountImages: {
        view: {
          images: [{ id: 2 }]
        }
      },
      accountImageEdit: {}
    };

    expect(accountImagesSelectors.imagesView(state)).toMatchSnapshot('imagesView');

    const updatedState = {
      accountImages: {
        view: {
          images: [{ id: 2 }]
        }
      },
      accountImageEdit: {
        2: {
          image: {
            test: 'success'
          }
        }
      }
    };

    expect(accountImagesSelectors.imagesView(updatedState)).toMatchSnapshot('imagesViewUpdated');
  });
});
