import { BackgroundImageSrc } from '@patternfly/react-core';
import bgFilter from '@patternfly/patternfly-next/assets/images/background-filter.svg';
import pfBg576 from '@patternfly/patternfly-next/assets/images/pfbg_576.jpg';
import pfBg576R2x from '@patternfly/patternfly-next/assets/images/pfbg_576@2x.jpg';
import pfBg768 from '@patternfly/patternfly-next/assets/images/pfbg_768.jpg';
import pfBg768R2x from '@patternfly/patternfly-next/assets/images/pfbg_768@2x.jpg';
import pfBg992 from '@patternfly/patternfly-next/assets/images/pfbg_992.jpg';
import pfBg992R2x from '@patternfly/patternfly-next/assets/images/pfbg_992@2x.jpg';
import pfBg1200 from '@patternfly/patternfly-next/assets/images/pfbg_1200.jpg';
import pfBg2000 from '@patternfly/patternfly-next/assets/images/pfbg_2000.jpg';

export const bgImages = {
  [BackgroundImageSrc.lg]: pfBg1200,
  [BackgroundImageSrc.md]: pfBg992,
  [BackgroundImageSrc.md2x]: pfBg992R2x,
  [BackgroundImageSrc.sm]: pfBg768,
  [BackgroundImageSrc.sm2x]: pfBg768R2x,
  [BackgroundImageSrc.xl]: pfBg2000,
  [BackgroundImageSrc.xs]: pfBg576,
  [BackgroundImageSrc.xs2x]: pfBg576R2x,
  [BackgroundImageSrc.filter]: `${bgFilter}#image_overlay`
};

export default bgImages;
