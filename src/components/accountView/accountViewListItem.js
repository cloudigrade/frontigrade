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

  static renderLeftContent() {
    return null;
  }

  static renderDescription() {
    return null;
  }

  rhelFilteredSecondsHours() {
    const { filter, item } = this.props;

    let rhelSecondsHours;

    switch (filter.graphRhelValue) {
      case 'rhelMemoryTime':
        rhelSecondsHours = item[apiTypes.API_RESPONSE_ACCOUNTS_RHEL_MEMORY];
        break;
      case 'rhelVcpuTime':
        rhelSecondsHours = item[apiTypes.API_RESPONSE_ACCOUNTS_RHEL_VCPU];
        break;
      default:
        rhelSecondsHours = item[apiTypes.API_RESPONSE_ACCOUNTS_RHEL_RUNTIME];
        break;
    }

    return helpers.generateHoursFromSeconds(rhelSecondsHours);
  }

  rhocpFilteredSecondsHours() {
    const { filter, item } = this.props;

    let rhocpSecondsHours;

    switch (filter.graphOpenshiftValue) {
      case 'openshiftMemoryTime':
        rhocpSecondsHours = item[apiTypes.API_RESPONSE_ACCOUNTS_OPENSHIFT_MEMORY];
        break;
      case 'openshiftVcpuTime':
        rhocpSecondsHours = item[apiTypes.API_RESPONSE_ACCOUNTS_OPENSHIFT_VCPU];
        break;
      default:
        rhocpSecondsHours = item[apiTypes.API_RESPONSE_ACCOUNTS_OPENSHIFT_RUNTIME];
        break;
    }

    return helpers.generateHoursFromSeconds(rhocpSecondsHours);
  }

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

  /**
   * FixMe: PF-React issue
   * listview "additionalInfo" attribute "requires" an array propType, restrictive limit.
   * Open it up to allow both, "node" OR "array"
   */
  renderAdditionalInfo() {
    const { item, t } = this.props;

    const rhelChallenged = Number.parseInt(item[apiTypes.API_RESPONSE_ACCOUNTS_RHEL_CHALLENGED], 10) > 0;
    const openshiftChallenged = Number.parseInt(item[apiTypes.API_RESPONSE_ACCOUNTS_OPENSHIFT_CHALLENGED], 10) > 0;

    const images =
      item[apiTypes.API_RESPONSE_ACCOUNTS_IMAGES] === null ? 'N/A' : item[apiTypes.API_RESPONSE_ACCOUNTS_IMAGES];

    const instances =
      item[apiTypes.API_RESPONSE_ACCOUNTS_INSTANCES] === null ? 'N/A' : item[apiTypes.API_RESPONSE_ACCOUNTS_INSTANCES];

    const rhelSecondsHours =
      item[apiTypes.API_RESPONSE_ACCOUNTS_RHEL_INSTANCES] === null ? null : this.rhelFilteredSecondsHours();

    const rhocpSecondsHours =
      item[apiTypes.API_RESPONSE_ACCOUNTS_OPENSHIFT_INSTANCES] === null ? null : this.rhocpFilteredSecondsHours();

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
        {rhelSecondsHours !== null && (
          <Tooltip tooltip={`${rhelSecondsHours.seconds} seconds`} placement="bottom">
            <Icon type="fa" name="clock-o" />
            <strong>{rhelSecondsHours.hours}</strong>
          </Tooltip>
        )}
        {rhelSecondsHours === null && (
          <React.Fragment>
            <Icon type="fa" name="clock-o" />
            <strong>N/A</strong>
          </React.Fragment>
        )}
        <Tooltip delayShow={100} popover={rhelPopover} trigger="click">
          <PFLabel bsStyle="warning">
            <abbr title="Red Hat Enterprise Linux">RHEL</abbr>
          </PFLabel>{' '}
          {rhelChallenged && <Icon type="fa" name="flag" className="cloudmeter-pficon-error" />}
        </Tooltip>
      </ListView.InfoItem>,
      <ListView.InfoItem key="4" className="cloudmeter-listview-label cloudmeter-listview-label-has-badge">
        {rhocpSecondsHours !== null && (
          <Tooltip tooltip={`${rhocpSecondsHours.seconds} seconds`} placement="bottom">
            <Icon type="fa" name="clock-o" />
            <strong>{rhocpSecondsHours.hours}</strong>
          </Tooltip>
        )}
        {rhocpSecondsHours === null && (
          <React.Fragment>
            <Icon type="fa" name="clock-o" />
            <strong>N/A</strong>
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
  filter: PropTypes.shape({
    graphOpenshiftValue: PropTypes.string,
    graphRhelValue: PropTypes.string
  }),
  item: PropTypes.object.isRequired,
  onDelete: PropTypes.func,
  onDetail: PropTypes.func,
  onEdit: PropTypes.func,
  t: PropTypes.func
};

AccountViewListItem.defaultProps = {
  className: '',
  filter: {
    graphOpenshiftValue: null,
    graphRhelValue: null
  },
  onDelete: null,
  onDetail: helpers.noop,
  onEdit: null,
  t: helpers.noopTranslate
};

export { AccountViewListItem as default, AccountViewListItem };
