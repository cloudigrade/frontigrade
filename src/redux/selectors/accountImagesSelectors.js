import { createSelector } from 'reselect';
import _cloneDeep from 'lodash/cloneDeep';

/**
 * Account Image detail selector
 */
const imageDetail = (state, props) => state.accountImageEdit[props.id];

const imageDetailSelector = createSelector(
  [imageDetail],
  detail => detail
);

const makeImageDetailSelector = () => imageDetailSelector;

/**
 * Account Images view selector
 */
const imagesView = state => state.accountImages.view;

const imagesImageDetail = state => state.accountImageEdit;

const imagesImageAccount = state => state.accountImages.account;

const imagesViewSelector = createSelector(
  [imagesView, imagesImageDetail, imagesImageAccount],
  (imgsView, imgsImageDetail, imgsImageAccount) => {
    const detailKeys = Object.keys(imgsImageDetail);

    if (!detailKeys.length) {
      return {
        ...imgsView,
        account: imgsImageAccount
      };
    }

    const updatedImgs = _cloneDeep(imgsView.images);

    detailKeys.forEach(value => {
      const index = updatedImgs.findIndex(image => Number.parseInt(value, 10) === image.id);
      updatedImgs[index] = {
        ...updatedImgs[index],
        ...imgsImageDetail[value].image
      };
    });

    return {
      ...imgsView,
      ...{
        images: updatedImgs
      },
      account: imgsImageAccount
    };
  }
);

const makeImagesViewSelector = () => imagesViewSelector;

const accountImagesSelectors = {
  imagesView: imagesViewSelector,
  makeImagesView: makeImagesViewSelector,
  imageDetail: imageDetailSelector,
  makeImageDetail: makeImageDetailSelector
};

export {
  accountImagesSelectors as default,
  accountImagesSelectors,
  imagesViewSelector,
  makeImagesViewSelector,
  imageDetailSelector,
  makeImageDetailSelector
};
