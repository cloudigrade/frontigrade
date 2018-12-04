import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Icon, ListView, Label as PFLabel } from 'patternfly-react';
import apiTypes from '../../constants/apiConstants';
import helpers from '../../common/helpers';
import AccountImagesViewListItemDetail from './accountImagesViewListItemDetail';
import Tooltip from '../tooltip/tooltip';

class AccountImagesViewListItem extends React.Component {
  static renderLeftContent() {
    return <ListView.Icon name="unknown" />;
  }

  renderHeading() {
    const { item } = this.props;

    const timestamp = item[apiTypes.API_RESPONSE_IMAGES_EDIT_UPDATED];
    let title =
      item[apiTypes.API_RESPONSE_IMAGES_NAME] ||
      item[apiTypes.API_RESPONSE_IMAGES_IMAGE_ID] ||
      `Image #${item[apiTypes.API_RESPONSE_IMAGES_ID] || ''}`;

    if (title && title.length > 25) {
      title = <span title={title}>{title}</span>;
    }

    return (
      <span className="cloudmeter-list-view-item-heading">
        <strong className="cloudmeter-list-view-item-heading-title">{title}</strong>
        {timestamp && (
          <React.Fragment>
            <br />
            Updated {moment(timestamp).format('h:mmA, MMMM Do YYYY')}
          </React.Fragment>
        )}
      </span>
    );
  }

  static renderDescription() {
    return null;
  }

  /**
   * FixMe: PF-React issue
   * listview "additionalInfo" attribute "requires" an array propType, restrictive limit.
   * Open it up to allow both, "node" OR "array"
   */
  renderAdditionalInfo() {
    const { item, t } = this.props;

    const rhelChallenged = item[apiTypes.API_RESPONSE_IMAGES_RHEL_CHALLENGED];
    const openshiftChallenged = item[apiTypes.API_RESPONSE_IMAGES_OPENSHIFT_CHALLENGED];

    const parsedSecondsHours = helpers.generateHoursFromSeconds(item[apiTypes.API_RESPONSE_IMAGES_SECONDS]);

    const rhelSeconds = !item[apiTypes.API_RESPONSE_IMAGES_RHEL] ? null : parsedSecondsHours.seconds;
    const rhocpSeconds = !item[apiTypes.API_RESPONSE_IMAGES_OPENSHIFT] ? null : parsedSecondsHours.seconds;

    const rhelHours = rhelSeconds === null ? 'N/A' : parsedSecondsHours.hours;
    const rhocpHours = rhocpSeconds === null ? 'N/A' : parsedSecondsHours.hours;

    let instances = Number.parseInt(item[apiTypes.API_RESPONSE_IMAGES_INSTANCES], 10);
    instances = Number.isNaN(instances) ? 'N/A' : instances;

    const instancesPopover = t(
      'list-images.instances.instances-tooltip',
      'Total number of active instances for the selected date range.'
    );

    const rhelPopover = t(
      'list-images.rhel.rhel-tooltip',
      'Hours of Red Hat Enterprise Linux usage for the selected date range.'
    );

    const rhocpPopover = t(
      'list-images.rhocp.rhocp-tooltip',
      'Hours of Red Hat OpenShift Container Platform usage for the selected date range.'
    );

    return [
      <ListView.InfoItem key="1" className="cloudmeter-listview-infoitem">
        <Tooltip delayShow={100} popover={instancesPopover} trigger="click">
          <Icon type="pf" name="screen" />
          <strong>{instances}</strong> Instances
        </Tooltip>
      </ListView.InfoItem>,
      <ListView.InfoItem key="2" className="cloudmeter-listview-label cloudmeter-listview-label-has-badge">
        {rhelSeconds !== null && (
          <Tooltip tooltip={`${rhelSeconds} seconds`} placement="bottom">
            <Icon type="fa" name="clock-o" />
            <strong>{rhelHours}</strong>
          </Tooltip>
        )}
        {rhelSeconds === null && (
          <React.Fragment>
            <Icon type="fa" name="clock-o" />
            <strong>{rhelHours}</strong>
          </React.Fragment>
        )}
        <Tooltip delayShow={100} popover={rhelPopover} trigger="click">
          <PFLabel bsStyle="warning">
            <abbr title="Red Hat Enterprise Linux">RHEL</abbr>
          </PFLabel>{' '}
          {rhelChallenged && <Icon type="fa" name="flag" className="cloudmeter-pficon-error" />}
        </Tooltip>
      </ListView.InfoItem>,
      <ListView.InfoItem key="3" className="cloudmeter-listview-label cloudmeter-listview-label-has-badge">
        {rhocpSeconds !== null && (
          <Tooltip tooltip={`${rhocpSeconds} seconds`} placement="bottom">
            <Icon type="fa" name="clock-o" />
            <strong>{rhocpHours}</strong>
          </Tooltip>
        )}
        {rhocpSeconds === null && (
          <React.Fragment>
            <Icon type="fa" name="clock-o" />
            <strong>{rhocpHours}</strong>
          </React.Fragment>
        )}
        <Tooltip delayShow={100} popover={rhocpPopover} trigger="click">
          <PFLabel bsStyle="primary">
            <abbr title="Red Hat OpenShift Container Platform">RHOCP</abbr>
          </PFLabel>{' '}
          {openshiftChallenged && <Icon type="fa" name="flag" className="cloudmeter-pficon-error" />}
        </Tooltip>
      </ListView.InfoItem>
    ];
  }

  render() {
    const { item } = this.props;

    return (
      <ListView.Item
        className="cloudmeter-accountview-list-view-item"
        key={item[apiTypes.API_RESPONSE_IMAGES_ID]}
        leftContent={AccountImagesViewListItem.renderLeftContent()}
        heading={this.renderHeading()}
        description={AccountImagesViewListItem.renderDescription()}
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
  t: PropTypes.func
};

AccountImagesViewListItem.defaultProps = {
  t: helpers.noopTranslate
};

export { AccountImagesViewListItem as default, AccountImagesViewListItem };
