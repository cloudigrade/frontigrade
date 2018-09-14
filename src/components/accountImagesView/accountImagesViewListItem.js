import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Icon, ListView, Label as PFLabel } from 'patternfly-react';
import apiTypes from '../../constants/apiConstants';
import helpers from '../../common/helpers';
import Tooltip from '../tooltip/tooltip';

class AccountImagesViewListItem extends React.Component {
  kebab = React.createRef();

  /**
   * FixMe: PF-React issue
   * Need a prop added to PF-React ListView for generic whole row event, instead of
   * having to use a "ref" and "contains" check
   */
  onVerifyDetail = event => {
    const { item, onDetail } = this.props;
    const currentKebabRef = this.kebab.current;

    if ((currentKebabRef && !currentKebabRef.contains(event.target)) || !currentKebabRef) {
      onDetail(item);
    }
  };

  static renderLeftContent() {
    return null;
  }

  renderHeading() {
    const { item } = this.props;

    return item[apiTypes.API_RESPONSE_IMAGES_NAME] || `Image #${item[apiTypes.API_RESPONSE_IMAGES_ID]}`;
  }

  renderDescription() {
    const { item } = this.props;

    return (
      <ListView.DescriptionHeading>
        {item[apiTypes.API_RESPONSE_IMAGES_NAME] ||
          item[apiTypes.API_RESPONSE_IMAGES_IMAGE_ID] ||
          `Image #${item[apiTypes.API_RESPONSE_IMAGES_ID] || ''}`}
      </ListView.DescriptionHeading>
    );
  }

  /**
   * FixMe: PF-React issue
   * listview "additionalInfo" attribute "requires" an array propType, restrictive limit.
   * Open it up to allow both, "node" OR "array"
   */
  /**
   * FixMe: API - issue
   * added additional checks around seconds and instances since we're having to calculate seconds
   * into hours. went ahead and added instances into the mix since unsure. ideally we'd prefer a
   * simple display check, like null, then dump it out to the UI. the tooltip was added to
   * provide the original seconds value in the event the calculation is off
   */
  renderAdditionalInfo() {
    const { item } = this.props;

    let seconds = Number.parseFloat(item[apiTypes.API_RESPONSE_IMAGES_SECONDS]);
    seconds = Number.isNaN(seconds) ? null : seconds;

    const hours = seconds === null ? '-' : Math.floor(moment.duration(seconds, 'seconds').asHours());

    let instances = Number.parseInt(item[apiTypes.API_RESPONSE_IMAGES_INSTANCES], 10);
    instances = Number.isNaN(instances) ? '-' : instances;

    const tooltip = <React.Fragment>{seconds} seconds</React.Fragment>;

    return [
      <ListView.InfoItem key="1">
        <Icon type="pf" name="screen" className="cloudmeter-listview-infoitem" />
        <strong>{instances}</strong>
        Instances
      </ListView.InfoItem>,
      <ListView.InfoItem key="2" className="cloudmeter-listview-infoitem">
        {seconds !== null && (
          <Tooltip delayShow={100} tooltip={tooltip}>
            <Icon type="fa" name="clock-o" />
            <strong>{hours}</strong> Hours
          </Tooltip>
        )}
        {seconds === null && (
          <React.Fragment>
            <Icon type="fa" name="clock-o" />
            <strong>{hours}</strong> Hours
          </React.Fragment>
        )}
      </ListView.InfoItem>,
      <ListView.InfoItem
        key="3"
        className={
          item[apiTypes.API_RESPONSE_IMAGES_RHEL]
            ? 'cloudmeter-listview-label'
            : 'cloudmeter-listview-label cloudmeter-listview-label-hidden'
        }
      >
        <PFLabel bsStyle="warning">
          <abbr title="Red Hat Enterprise Linux">RHEL</abbr>
        </PFLabel>
      </ListView.InfoItem>,
      <ListView.InfoItem
        key="4"
        className={
          item[apiTypes.API_RESPONSE_IMAGES_OPENSHIFT]
            ? 'cloudmeter-listview-label'
            : 'cloudmeter-listview-label cloudmeter-listview-label-hidden'
        }
      >
        <PFLabel bsStyle="primary">
          <abbr title="Red Hat OpenShift Container Platform">RHOCP</abbr>
        </PFLabel>
      </ListView.InfoItem>
    ];
  }

  render() {
    const { item } = this.props;

    return (
      <ListView.Item
        onClick={this.onVerifyDetail}
        key={item[apiTypes.API_RESPONSE_IMAGES_ID]}
        leftContent={AccountImagesViewListItem.renderLeftContent()}
        description={this.renderDescription()}
        additionalInfo={this.renderAdditionalInfo()}
        stacked={false}
      />
    );
  }
}

AccountImagesViewListItem.propTypes = {
  item: PropTypes.object.isRequired,
  onDetail: PropTypes.func
};

AccountImagesViewListItem.defaultProps = {
  onDetail: helpers.noop
};

export { AccountImagesViewListItem as default, AccountImagesViewListItem };
