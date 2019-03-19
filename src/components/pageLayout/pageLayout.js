import React from 'react';
import PropTypes from 'prop-types';
import {
  BackgroundImage,
  Brand,
  Page,
  PageHeader,
  PageSection,
  Toolbar,
  ToolbarGroup,
  ToolbarItem,
  Dropdown,
  DropdownToggle,
  DropdownItem,
  KebabToggle
} from '@patternfly/react-core';
import { HelpIcon, UserIcon } from '@patternfly/react-icons';
import { connect, reduxActions, reduxTypes, store } from '../../redux';
import helpers from '../../common/helpers';
import titleImg from '../../styles/images/title.svg';
import titleImgBrand from '../../styles/images/title-brand.svg';
import bgImages from '../../constants/patternflyConstants';

class PageLayout extends React.Component {
  state = {
    isMobile: false,
    isHelpDropdownOpen: false,
    isUserDropdownOpen: false,
    isMobileDropdownOpen: false
  };

  onAbout = e => {
    e.preventDefault();
    store.dispatch({
      type: reduxTypes.aboutModal.ABOUT_MODAL_SHOW
    });
  };

  onLogoutUser = e => {
    const { logoutUser } = this.props;

    e.preventDefault();
    Promise.all([logoutUser()]).then(() => window.location.replace('/'));
  };

  onHelpDropdownToggle = () => {
    const { isHelpDropdownOpen } = this.state;
    this.setState({
      isHelpDropdownOpen: !isHelpDropdownOpen
    });
  };

  onUserDropdownToggle = () => {
    const { isUserDropdownOpen } = this.state;
    this.setState({
      isUserDropdownOpen: !isUserDropdownOpen
    });
  };

  onMobileDropdownToggle = () => {
    const { isMobileDropdownOpen } = this.state;
    this.setState({
      isMobileDropdownOpen: !isMobileDropdownOpen
    });
  };

  onPageResize = size => {
    if (size) {
      this.setState({
        isMobile: size.mobileView
      });
    }
  };

  renderToolbar() {
    const { isUserDropdownOpen, isHelpDropdownOpen } = this.state;
    const { user } = this.props;

    const helpDropdownItems = [
      <DropdownItem key="help0" component="button" onClick={this.onAbout}>
        About
      </DropdownItem>
    ];

    const userDropdownItems = [
      <DropdownItem key="user0" component="button" onClick={this.onLogoutUser}>
        Logout
      </DropdownItem>
    ];

    const helpDropdownToggle = (
      <DropdownToggle onToggle={this.onHelpDropdownToggle} iconComponent={null}>
        <HelpIcon />
      </DropdownToggle>
    );

    const userDropdownToggle = (
      <DropdownToggle onToggle={this.onUserDropdownToggle}>
        <UserIcon /> {user && user.username}
      </DropdownToggle>
    );

    return (
      <Toolbar>
        <ToolbarGroup>
          <ToolbarItem>
            <Dropdown
              isPlain
              position="right"
              onSelect={this.onHelpDropdownToggle}
              isOpen={isHelpDropdownOpen}
              toggle={helpDropdownToggle}
              dropdownItems={helpDropdownItems}
            />
          </ToolbarItem>
          <ToolbarItem>
            <Dropdown
              isPlain
              position="right"
              onSelect={this.onUserDropdownToggle}
              isOpen={isUserDropdownOpen}
              toggle={userDropdownToggle}
              dropdownItems={userDropdownItems}
            />
          </ToolbarItem>
        </ToolbarGroup>
      </Toolbar>
    );
  }

  renderMobileToolbar() {
    const { isMobileDropdownOpen } = this.state;

    const mobileDropdownItems = [
      <DropdownItem key="help0" component="button" onClick={this.onAbout}>
        About
      </DropdownItem>,
      <DropdownItem key="user0" component="button" onClick={this.onLogoutUser}>
        Logout
      </DropdownItem>
    ];

    const mobileDropdownToggle = <KebabToggle onToggle={this.onMobileDropdownToggle} />;

    return (
      <Toolbar>
        <ToolbarGroup>
          <ToolbarItem>
            <Dropdown
              isPlain
              position="right"
              onSelect={this.onMobileDropdownToggle}
              isOpen={isMobileDropdownOpen}
              toggle={mobileDropdownToggle}
              dropdownItems={mobileDropdownItems}
            />
          </ToolbarItem>
        </ToolbarGroup>
      </Toolbar>
    );
  }

  render() {
    const { isMobile } = this.state;
    const { brand, children } = this.props;

    const header = (
      <PageHeader
        logo={<Brand src={brand ? titleImgBrand : titleImg} alt="Cloud Meter Logo" />}
        toolbar={isMobile ? this.renderMobileToolbar() : this.renderToolbar()}
        title="Cloud Meter"
        className="cloudmeter-nav"
      />
    );

    return (
      <React.Fragment>
        <BackgroundImage src={bgImages} />
        <Page className="layout-pf layout-pf-fixed" header={header} onPageResize={this.onPageResize}>
          <PageSection className="cloudmeter-page-section">{children}</PageSection>
        </Page>
      </React.Fragment>
    );
  }
}

PageLayout.propTypes = {
  brand: PropTypes.bool,
  children: PropTypes.node.isRequired,
  logoutUser: PropTypes.func,
  user: PropTypes.shape({
    username: PropTypes.string
  })
};

PageLayout.defaultProps = {
  brand: helpers.RH_BRAND,
  logoutUser: helpers.noop,
  user: {}
};

const mapDispatchToProps = dispatch => ({
  logoutUser: () => dispatch(reduxActions.user.logoutUser())
});

const mapStateToProps = state => ({
  user: state.user.session
});

const ConnectedPageLayout = connect(
  mapStateToProps,
  mapDispatchToProps
)(PageLayout);

export { ConnectedPageLayout as default, ConnectedPageLayout, PageLayout };
