import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Icon, ListView, Label as PFLabel } from 'patternfly-react';
import apiTypes from '../../constants/apiConstants';
import helpers from '../../common/helpers';
import AccountImagesViewListItemDetail from './accountImagesViewListItemDetail';
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
    return <ListView.Icon name="unknown" />;
  }

  static renderHeading() {
    return null;
  }

  renderDescription() {
    const { item } = this.props;
    let title =
      item[apiTypes.API_RESPONSE_IMAGES_NAME] ||
      item[apiTypes.API_RESPONSE_IMAGES_IMAGE_ID] ||
      `Image #${item[apiTypes.API_RESPONSE_IMAGES_ID] || ''}`;

    if (title && title.length > 25) {
      title = <span title={title}>{title}</span>;
    }

    const timestamp = item[apiTypes.API_RESPONSE_IMAGES_EDIT_UPDATED];

    return (
      <React.Fragment>
        <ListView.DescriptionHeading>{title}</ListView.DescriptionHeading>
        {timestamp && (
          <ListView.DescriptionText>Updated {moment(timestamp).format('h:mmA, MMMM Do YYYY')}</ListView.DescriptionText>
        )}
      </React.Fragment>
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

    const rhelChallenged = item[apiTypes.API_RESPONSE_IMAGES_RHEL_CHALLENGED];
    const openshiftChallenged = item[apiTypes.API_RESPONSE_IMAGES_OPENSHIFT_CHALLENGED];

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
          item[apiTypes.API_RESPONSE_IMAGES_RHEL_DETECTED] || rhelChallenged
            ? 'cloudmeter-listview-label'
            : 'cloudmeter-listview-label cloudmeter-listview-label-hidden'
        }
      >
        <PFLabel bsStyle={rhelChallenged ? 'default' : 'warning'}>
          <abbr title="Red Hat Enterprise Linux">RHEL</abbr>
        </PFLabel>{' '}
        {rhelChallenged && <Icon type="fa" name="asterisk" className="cloudmeter-pficon-error" />}
      </ListView.InfoItem>,
      <ListView.InfoItem
        key="4"
        className={
          item[apiTypes.API_RESPONSE_IMAGES_OPENSHIFT_DETECTED] || openshiftChallenged
            ? 'cloudmeter-listview-label'
            : 'cloudmeter-listview-label cloudmeter-listview-label-hidden'
        }
      >
        <PFLabel bsStyle={openshiftChallenged ? 'default' : 'primary'}>
          <abbr title="Red Hat OpenShift Container Platform">RHOCP</abbr>
        </PFLabel>{' '}
        {openshiftChallenged && <Icon type="fa" name="asterisk" className="cloudmeter-pficon-error" />}
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
        heading={AccountImagesViewListItem.renderHeading()}
        description={this.renderDescription()}
        additionalInfo={this.renderAdditionalInfo()}
        stacked={false}
      >
        <AccountImagesViewListItemDetail item={item} />
      </ListView.Item>
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
