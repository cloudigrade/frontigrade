import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Icon, ListView, Label as PFLabel } from 'patternfly-react';
import apiTypes from '../../constants/apiConstants';
import helpers from '../../common/helpers';
import Tooltip from '../tooltip/tooltip';

class AccountImagesViewListItem extends React.Component {
  constructor(props) {
    super(props);
    this.kebab = React.createRef();
  }

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

  renderHeading() {
    const { item } = this.props;

    return item[apiTypes.API_RESPONSE_IMAGES_NAME] || `Image #${item[apiTypes.API_RESPONSE_IMAGES_ID]}`;
  }

  static renderLeftContent() {
    return null;
  }

  renderDescription() {
    const { item } = this.props;

    return (
      <div className="cloudmeter-split-description">
        <span className="cloudmeter-description-left">
          <ListView.DescriptionHeading>
            {item[apiTypes.API_RESPONSE_IMAGES_NAME] || `Image #${item[apiTypes.API_RESPONSE_IMAGES_ID]}`}
          </ListView.DescriptionHeading>
        </span>
        <span className="cloudmeter-description-right" />
      </div>
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

    return [
      <ListView.InfoItem key="1">
        <Icon type="pf" name="screen" className="cloudmeter-listview-infoitem" />
        <strong>{instances}</strong> Instances
      </ListView.InfoItem>,
      <ListView.InfoItem key="2" className="cloudmeter-listview-infoitem">
        {seconds !== null && (
          <Tooltip delayShow={100} popover={<React.Fragment>{seconds} seconds</React.Fragment>}>
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
      <ListView.InfoItem key="3" className="cloudmeter-listview-label">
        <PFLabel bsStyle={item[apiTypes.API_RESPONSE_IMAGES_RHEL] ? 'primary' : 'default'}>
          <abbr title="Red Hat Enterprise Linux">RHEL</abbr>
        </PFLabel>
      </ListView.InfoItem>,
      <ListView.InfoItem key="4" className="cloudmeter-listview-label hidden">
        <PFLabel bsStyle={item[apiTypes.API_RESPONSE_IMAGES_OPENSHIFT] ? 'primary' : 'default'}>
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
        stacked
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
