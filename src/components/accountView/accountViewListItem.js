import React from 'react';
import PropTypes from 'prop-types';
import { DropdownKebab, Icon, ListView, Label as PFLabel, MenuItem } from 'patternfly-react';
import helpers from '../../common/helpers';

class AccountViewListItem extends React.Component {
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
    const { onDetail } = this.props;
    const currentKebabRef = this.kebab.current;

    if ((currentKebabRef && !currentKebabRef.contains(event.target)) || !currentKebabRef) {
      onDetail(event);
    }
  };

  renderActions() {
    const { item, onEdit, onArchive } = this.props;

    return (
      <div ref={this.kebab}>
        {(onEdit || onArchive) && (
          <DropdownKebab id={`account-item-menu-${item.id}`} pullRight>
            {onEdit && <MenuItem onClick={onEdit}>Edit Name</MenuItem>}
            {onArchive && <MenuItem onClick={onArchive}>Archive</MenuItem>}
          </DropdownKebab>
        )}
      </div>
    );
  }

  renderHeading() {
    const { item } = this.props;

    return <ListView.DescriptionHeading>{item.name}</ListView.DescriptionHeading>;
  }

  static renderLeftContent() {
    return null;
  }

  static renderDescription() {
    return null;
  }

  /**
   * ToDo: Eslint
   * Accessibility plugin tried to call out "Label" named component, converted to "PFLabel"
   * instead, look at Eslint settings
   */
  /**
   * FixMe: PF-React issue
   * listview "additionalInfo" attribute "requires" an array propType, restrictive limit.
   * Open it up to allow both, "node" OR "array"
   */
  static renderAdditionalInfo() {
    return [
      <ListView.InfoItem key="1">
        <Icon type="pf" name="cluster" />
        <strong>0</strong> Images
      </ListView.InfoItem>,
      <ListView.InfoItem key="2">
        <Icon type="pf" name="screen" />
        <strong>0</strong> Instances
      </ListView.InfoItem>,
      <ListView.InfoItem key="3">
        <strong>0</strong>
        <PFLabel bsStyle="primary">
          <abbr title="Red Hat Enterprise Linux">RHEL</abbr>
        </PFLabel>
      </ListView.InfoItem>,
      <ListView.InfoItem key="4">
        <strong>0</strong>
        <PFLabel bsStyle="primary">
          <abbr title="Red Hat Open Stack">RHOS</abbr>
        </PFLabel>
      </ListView.InfoItem>
    ];
  }

  render() {
    const { item } = this.props;

    return (
      <ListView.Item
        onClick={this.onVerifyDetail}
        key={item.id}
        leftContent={AccountViewListItem.renderLeftContent()}
        heading={this.renderHeading()}
        description={AccountViewListItem.renderDescription()}
        additionalInfo={AccountViewListItem.renderAdditionalInfo()}
        actions={this.renderActions()}
        stacked={false}
      />
    );
  }
}

AccountViewListItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string
  }).isRequired,
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
