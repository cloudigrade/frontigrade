import React from 'react';
import PropTypes from 'prop-types';
import { detect } from 'detect-browser';
import {
  AboutModal as PfAboutModal,
  Button,
  ButtonVariant,
  TextContent,
  TextList,
  TextListItem
} from '@patternfly/react-core';
import { CheckIcon, PasteIcon } from '@patternfly/react-icons';
import { connect, reduxActions, reduxTypes, store } from '../../redux';
import helpers from '../../common/helpers';
import logo from '../../styles/images/logo.svg';
import logoBrand from '../../styles/images/logo-brand.svg';
import titleImg from '../../styles/images/title.svg';
import titleImgBrand from '../../styles/images/title-brand.svg';

class AboutModal extends React.Component {
  selectElement = React.createRef();

  state = {
    copied: false,
    timer: null
  };

  componentDidUpdate() {
    const { apiVersion, getSystemConfig, show } = this.props;

    if (show && apiVersion === null) {
      getSystemConfig();
    }
  }

  onCopy = () => {
    const { timer } = this.state;
    const selectElement = this.selectElement.current;
    const success = helpers.copyClipboard(selectElement.innerText);

    selectElement.focus();
    clearTimeout(timer);

    this.setState(
      {
        copied: success
      },
      () => this.resetStateTimer()
    );
  };

  onClose = () => {
    const { onClose } = this.props;

    if (onClose) {
      onClose();
    } else {
      store.dispatch({
        type: reduxTypes.aboutModal.ABOUT_MODAL_HIDE
      });
    }
  };

  resetStateTimer() {
    const { resetTimer } = this.props;
    const selectElement = this.selectElement.current;

    const timer = setTimeout(() => {
      selectElement.blur();

      this.setState({
        copied: false
      });
    }, resetTimer);

    this.setState({ timer });
  }

  render() {
    const { copied } = this.state;
    const { brand, apiVersion, uiVersion, show, session } = this.props;
    const browser = detect();

    const props = {
      show,
      onHide: this.onClose,
      logo,
      productTitle: <img src={titleImg} alt="Cloud Meter" />,
      altLogo: 'CM'
    };

    if (brand) {
      props.logo = logoBrand;
      props.productTitle = <img src={titleImgBrand} alt="Red Hat Cloud Meter" />;
      props.altLogo = 'RH CM';
      props.trademarkText = 'Copyright (c) 2018 Red Hat Inc.';
    }

    return (
      <PfAboutModal
        isOpen={props.show}
        onClose={this.onClose}
        productName="Cloud Meter"
        brandImageSrc=""
        brandImageAlt=""
        logoImageSrc={logo}
        logoImageAlt="Cloud Meter Logo"
      >
        <div
          ref={this.selectElement}
          className="cloudmeter-about-modal-list"
          tabIndex={-1}
          aria-label="Application information copied"
          aria-live="polite"
        >
          <TextContent>
            <TextList component="dl">
              {session && (
                <React.Fragment>
                  <TextListItem component="dt">Username</TextListItem>
                  <TextListItem component="dd">{session.username}</TextListItem>
                </React.Fragment>
              )}
              {browser && (
                <React.Fragment>
                  <TextListItem component="dt">Browser Version</TextListItem>
                  <TextListItem component="dd">{`${browser.name} ${browser.version}`}</TextListItem>
                  <TextListItem component="dt">Browser OS</TextListItem>
                  <TextListItem component="dd">{browser.os || ''}</TextListItem>
                </React.Fragment>
              )}
              {apiVersion && (
                <React.Fragment>
                  <TextListItem component="dt">API Version</TextListItem>
                  <TextListItem component="dd">{apiVersion}</TextListItem>
                </React.Fragment>
              )}
              {uiVersion && (
                <React.Fragment>
                  <TextListItem component="dt">UI Version</TextListItem>
                  <TextListItem component="dd">{uiVersion}</TextListItem>
                </React.Fragment>
              )}
            </TextList>
          </TextContent>
        </div>
        <div className="cloudmeter-about-modal-copy-footer">
          <Button
            onClick={this.onCopy}
            title="Copy application information"
            className="cloudmeter-about-modal-copy-button"
            variant={ButtonVariant.tertiary}
          >
            {(copied && <CheckIcon />) || <PasteIcon />}
          </Button>
        </div>
      </PfAboutModal>
    );
  }
}

AboutModal.propTypes = {
  apiVersion: PropTypes.string,
  uiVersion: PropTypes.string,
  brand: PropTypes.bool,
  getSystemConfig: PropTypes.func,
  onClose: PropTypes.func,
  resetTimer: PropTypes.number,
  session: PropTypes.shape({
    username: PropTypes.string
  }),
  show: PropTypes.bool.isRequired
};

AboutModal.defaultProps = {
  apiVersion: null,
  uiVersion: helpers.UI_VERSION,
  brand: helpers.RH_BRAND,
  getSystemConfig: helpers.noop,
  resetTimer: 3000,
  session: {
    username: null
  },
  onClose: null
};

const mapDispatchToProps = dispatch => ({
  getSystemConfig: () => dispatch(reduxActions.systemConfig.getSystemConfig())
});

const mapStateToProps = state => ({ ...state.aboutModal, session: state.user.session });

const ConnectedAboutModal = connect(
  mapStateToProps,
  mapDispatchToProps
)(AboutModal);

export { ConnectedAboutModal as default, ConnectedAboutModal, AboutModal };
