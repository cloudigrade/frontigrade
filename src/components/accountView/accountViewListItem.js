import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { DropdownKebab, Icon, ListView, Label as PFLabel, MenuItem } from 'patternfly-react';
import apiTypes from '../../constants/apiConstants';
import helpers from '../../common/helpers';
import Tooltip from '../tooltip/tooltip';

class AccountViewListItem extends React.Component {
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

  renderActions() {
    const { item, onDelete, onEdit } = this.props;

    return (
      <div ref={this.kebab}>
        {(onEdit || onDelete) && (
          <DropdownKebab
            id={`account-item-menu-${item[apiTypes.API_RESPONSE_ACCOUNTS_ID]}`}
            title="More options"
            pullRight
          >
            {onEdit && <MenuItem onClick={() => onEdit(item)}>Edit Name</MenuItem>}
            {onDelete && <MenuItem onClick={() => onDelete(item)}>Delete</MenuItem>}
          </DropdownKebab>
        )}
      </div>
    );
  }

  renderHeading() {
    const { item } = this.props;

    const timestamp = item[apiTypes.API_RESPONSE_ACCOUNTS_DATE];
    let title =
      item[apiTypes.API_RESPONSE_ACCOUNTS_NAME] ||
      item[apiTypes[apiTypes.API_RESPONSE_ACCOUNTS_ACCOUNT_ID]] ||
      `Account ${item[apiTypes.API_RESPONSE_ACCOUNTS_ID] || ''}`;

    if (title && title.length > 25) {
      title = <span title={title}>{title}</span>;
    }

    return (
      <span className="cloudmeter-list-view-item-heading">
        <strong className="cloudmeter-list-view-item-heading-title">{title}</strong>
        <br />
        Created {moment(timestamp).format('h:mmA, MMMM Do YYYY')}
      </span>
    );
  }

  static renderLeftContent() {
    return null;
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

    const images =
      item[apiTypes.API_RESPONSE_ACCOUNTS_IMAGES] === null ? 'N/A' : item[apiTypes.API_RESPONSE_ACCOUNTS_IMAGES];

    const instances =
      item[apiTypes.API_RESPONSE_ACCOUNTS_INSTANCES] === null ? 'N/A' : item[apiTypes.API_RESPONSE_ACCOUNTS_INSTANCES];

    const rhelSecondsHours = helpers.generateHoursFromSeconds(item[apiTypes.API_RESPONSE_ACCOUNTS_RHEL_RUNTIME]);
    const rhocpSecondsHours = helpers.generateHoursFromSeconds(item[apiTypes.API_RESPONSE_ACCOUNTS_OPENSHIFT_RUNTIME]);

    const rhelSeconds = rhelSecondsHours.seconds;
    const rhocpSeconds = rhocpSecondsHours.seconds;

    const rhelHours = rhelSeconds === null ? 'N/A' : rhelSecondsHours.hours;
    const rhocpHours = rhocpSeconds === null ? 'N/A' : rhocpSecondsHours.hours;

    const imagesPopover = t(
      'list-accounts.images.images-tooltip',
      'Total number of machine images that are in use by active instances for the selected date range.'
    );

    const instancesPopover = t(
      'list-accounts.instances.instances-tooltip',
      'Total number of active instances for the selected date range.'
    );

    const rhelPopover = t(
      'list-accounts.rhel.rhel-tooltip',
      'Hours of Red Hat Enterprise Linux usage for the selected date range.'
    );

    const rhocpPopover = t(
      'list-accounts.rhocp.rhocp-tooltip',
      'Hours of Red Hat OpenShift Container Platform usage for the selected date range.'
    );

    return [
      <ListView.InfoItem key="1" className="cloudmeter-listview-infoitem">
        <Tooltip delayShow={100} popover={imagesPopover} trigger="click">
          <Icon type="pf" name="cluster" />
          <strong>{images}</strong> Images
        </Tooltip>
      </ListView.InfoItem>,
      <ListView.InfoItem key="2" className="cloudmeter-listview-infoitem">
        <Tooltip delayShow={100} popover={instancesPopover} trigger="click">
          <Icon type="pf" name="screen" />
          <strong>{instances}</strong> Instances
        </Tooltip>
      </ListView.InfoItem>,
      <ListView.InfoItem key="3" className="cloudmeter-listview-label cloudmeter-listview-label-has-badge">
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
          </PFLabel>
        </Tooltip>
      </ListView.InfoItem>,
      <ListView.InfoItem key="4" className="cloudmeter-listview-label cloudmeter-listview-label-has-badge">
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
          </PFLabel>
        </Tooltip>
      </ListView.InfoItem>
    ];
  }

  render() {
    const { className, item } = this.props;

    return (
      <ListView.Item
        className={`cloudmeter-accountview-list-view-item ${className}`}
        onClick={this.onVerifyDetail}
        key={item[apiTypes.API_RESPONSE_ACCOUNTS_ID]}
        leftContent={AccountViewListItem.renderLeftContent()}
        heading={this.renderHeading()}
        description={AccountViewListItem.renderDescription()}
        additionalInfo={this.renderAdditionalInfo()}
        actions={this.renderActions()}
        stacked={false}
      />
    );
  }
}

AccountViewListItem.propTypes = {
  className: PropTypes.string,
  item: PropTypes.object.isRequired,
  onDelete: PropTypes.func,
  onDetail: PropTypes.func,
  onEdit: PropTypes.func,
  t: PropTypes.func
};

AccountViewListItem.defaultProps = {
  className: '',
  onDelete: null,
  onDetail: helpers.noop,
  onEdit: null,
  t: helpers.noopTranslate
};

export { AccountViewListItem as default, AccountViewListItem };
