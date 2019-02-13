import React from 'react';
import PropTypes from 'prop-types';
import {
  BackgroundImage,
  Brand,
  Page,
  PageHeader,
  PageSection,
  PageSidebar,
  Toolbar,
  ToolbarGroup,
  ToolbarItem,
  Dropdown,
  DropdownToggle,
  DropdownItem,
  Nav,
  NavList,
  NavItem
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
    isMobileNavOpen: false
  };

  onAbout = e => {
    e.preventDefault();
    store.dispatch({
      type: reduxTypes.aboutModal.ABOUT_MODAL_SHOW
    });
  };

  onHelp = e => {
    e.preventDefault();
  };

  onLogoutUser = e => {
    const { logoutUser } = this.props;

    e.preventDefault();
    Promise.all([logoutUser()]).then(() => window.location.replace('/'));
  };

  onHelpDropdownToggle = isHelpDropdownOpen => {
    this.setState({
      isHelpDropdownOpen
    });
  };

  onHelpDropdownSelect = () => {
    this.setState({
      isHelpDropdownOpen: false
    });
  };

  onUserDropdownToggle = isUserDropdownOpen => {
    this.setState({
      isUserDropdownOpen
    });
  };

  onUserDropdownSelect = () => {
    this.setState({
      isUserDropdownOpen: false
    });
  };

  onNavToggle = () => {
    const { isMobileNavOpen } = this.state;
    this.setState({
      isMobileNavOpen: !isMobileNavOpen
    });
  };

  onPageResize = size => {
    if (size) {
      this.setState({
        isMobile: size.mobileView
      });
    }
  };

  render() {
    const { brand, user, children } = this.props;
    const { isMobile, isUserDropdownOpen, isHelpDropdownOpen, isMobileNavOpen } = this.state;
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
      <DropdownToggle onToggle={this.onHelpDropdownToggle}>
        <HelpIcon />
      </DropdownToggle>
    );

    const userDropdownToggle = (
      <DropdownToggle onToggle={this.onUserDropdownToggle}>
        <UserIcon /> {user && user.username}
      </DropdownToggle>
    );

    const PageToolbar = (
      <Toolbar>
        <ToolbarGroup>
          <ToolbarItem>
            <Dropdown
              isPlain
              position="right"
              onSelect={this.onHelpDropdownSelect}
              isOpen={isHelpDropdownOpen}
              toggle={helpDropdownToggle}
              dropdownItems={helpDropdownItems}
            />
          </ToolbarItem>
          <ToolbarItem>
            <Dropdown
              isPlain
              position="right"
              onSelect={this.onUserDropdownSelect}
              isOpen={isUserDropdownOpen}
              toggle={userDropdownToggle}
              dropdownItems={userDropdownItems}
            />
          </ToolbarItem>
        </ToolbarGroup>
      </Toolbar>
    );

    const Header = (
      <PageHeader
        logo={<Brand src={brand ? titleImgBrand : titleImg} alt="Cloud Meter Logo" />}
        toolbar={PageToolbar}
        title="Cloud Meter"
        className="cloudmeter-nav"
      />
    );

    const MobileNav = (
      <Nav aria-label="Mobile Navigation">
        <NavList>
          <NavItem onClick={this.onAbout}>About</NavItem>
          <NavItem onClick={this.onLogoutUser}>Logout</NavItem>
        </NavList>
      </Nav>
    );

    const Sidebar = <PageSidebar nav={MobileNav} isNavOpen={isMobileNavOpen} />;

    const MobileHeader = (
      <PageHeader
        logo={<Brand src={brand ? titleImgBrand : titleImg} alt="Cloud Meter Logo" />}
        title="Cloud Meter"
        className="cloudmeter-nav"
        showNavToggle
        onNavToggle={this.onNavToggle}
        isNavOpen={isMobileNavOpen}
      />
    );

    return (
      <React.Fragment>
        <BackgroundImage src={bgImages} />
        <Page
          className="layout-pf layout-pf-fixed"
          header={isMobile ? MobileHeader : Header}
          sidebar={isMobile && Sidebar}
          onPageResize={this.onPageResize}
        >
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
