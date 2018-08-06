import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { DropdownKebab, Icon, ListView, Label as PFLabel, MenuItem } from 'patternfly-react';
import apiTypes from '../../constants/apiConstants';
import helpers from '../../common/helpers';

class AccountViewListItem extends React.Component {
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

  kebab = React.createRef();

  renderActions() {
    const { item, onEdit, onArchive } = this.props;

    return (
      <div ref={this.kebab}>
        {(onEdit || onArchive) && (
          <DropdownKebab id={`account-item-menu-${item[apiTypes.API_RESPONSE_ACCOUNTS_ID]}`} pullRight>
            {onEdit && <MenuItem onClick={() => onEdit(item)}>Edit Name</MenuItem>}
            {onArchive && (
              <MenuItem className="hidden" onClick={() => onArchive(item)}>
                Archive
              </MenuItem>
            )}
          </DropdownKebab>
        )}
      </div>
    );
  }

  static renderHeading() {
    return null;
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
            {item[apiTypes.API_RESPONSE_ACCOUNTS_NAME] ||
              item[apiTypes[apiTypes.API_RESPONSE_ACCOUNTS_ACCOUNT_ID]] ||
              `Account ${item[apiTypes.API_RESPONSE_ACCOUNTS_ID] || ''}`}
          </ListView.DescriptionHeading>
        </span>
        <span className="cloudmeter-description-right">
          Created {moment(item[apiTypes.API_RESPONSE_ACCOUNTS_DATE]).format('h:mmA, MMMM Do YYYY')}
        </span>
      </div>
    );
  }

  /**
   * FixMe: PF-React issue
   * listview "additionalInfo" attribute "requires" an array propType, restrictive limit.
   * Open it up to allow both, "node" OR "array"
   */
  renderAdditionalInfo() {
    const { item } = this.props;

    const images =
      item[apiTypes.API_RESPONSE_ACCOUNTS_IMAGES] === null ? 'N/A' : item[apiTypes.API_RESPONSE_ACCOUNTS_IMAGES];

    const instances =
      item[apiTypes.API_RESPONSE_ACCOUNTS_INSTANCES] === null ? 'N/A' : item[apiTypes.API_RESPONSE_ACCOUNTS_INSTANCES];

    const rhel = item[apiTypes.API_RESPONSE_ACCOUNTS_RHEL] === null ? 'N/A' : item[apiTypes.API_RESPONSE_ACCOUNTS_RHEL];

    const rhos =
      item[apiTypes.API_RESPONSE_ACCOUNTS_OPENSHIFT] === null ? 'N/A' : item[apiTypes.API_RESPONSE_ACCOUNTS_OPENSHIFT];

    return [
      <ListView.InfoItem key="1" className="cloudmeter-listview-infoitem">
        <Icon type="pf" name="cluster" />
        <strong>{images}</strong> Images
      </ListView.InfoItem>,
      <ListView.InfoItem key="2" className="cloudmeter-listview-infoitem">
        <Icon type="pf" name="screen" />
        <strong>{instances}</strong> Instances
      </ListView.InfoItem>,
      <ListView.InfoItem key="3" className="cloudmeter-listview-label">
        <strong>{rhel}</strong>
        <PFLabel bsStyle="warning">
          <abbr title="Red Hat Enterprise Linux">RHEL</abbr>
        </PFLabel>
      </ListView.InfoItem>,
      <ListView.InfoItem key="4" className="cloudmeter-listview-label">
        <strong>{rhos}</strong>
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
        key={item[apiTypes.API_RESPONSE_ACCOUNTS_ID]}
        leftContent={AccountViewListItem.renderLeftContent()}
        heading={AccountViewListItem.renderHeading()}
        description={this.renderDescription()}
        additionalInfo={this.renderAdditionalInfo()}
        actions={this.renderActions()}
        stacked={false}
      />
    );
  }
}

AccountViewListItem.propTypes = {
  item: PropTypes.object.isRequired,
  onArchive: PropTypes.func,
  onDetail: PropTypes.func,
  onEdit: PropTypes.func
};

AccountViewListItem.defaultProps = {
  onArchive: null,
  onDetail: helpers.noop,
  onEdit: null
};

export { AccountViewListItem as default, AccountViewListItem };
