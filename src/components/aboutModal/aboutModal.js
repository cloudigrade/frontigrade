import React from 'react';
import PropTypes from 'prop-types';
import { detect } from 'detect-browser';
import { AboutModal as PfAboutModal } from 'patternfly-react';
import { connect, reduxTypes, store } from '../../redux';
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

  onClick = () => {
    const { timer } = this.state;
    const selectElement = this.selectElement.current;
    const success = helpers.copyClipboard(selectElement.innerText);

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

  onKeyUp = () => {
    this.onClick();
  };

  resetStateTimer() {
    const { resetTimer } = this.props;

    const timer = setTimeout(
      () =>
        this.setState({
          copied: false
        }),
      resetTimer
    );

    this.setState({ timer });
  }

  render() {
    const { copied } = this.state;
    const { brand, commitHash, show, session } = this.props;
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
      <PfAboutModal {...props}>
        <div
          role="button"
          ref={this.selectElement}
          onClick={this.onClick}
          onKeyUp={this.onKeyUp}
          tabIndex={0}
          aria-label="About modal, copy application information"
          aria-live="polite"
        >
          <PfAboutModal.Versions>
            {commitHash && <PfAboutModal.VersionItem label="Version Hash" versionText={commitHash || ''} />}
            {session && <PfAboutModal.VersionItem label="Username" versionText={session.username || ''} />}
            {browser && (
              <PfAboutModal.VersionItem label="Browser Version" versionText={`${browser.name} ${browser.version}`} />
            )}
            {browser && <PfAboutModal.VersionItem label="Browser OS" versionText={browser.os || ''} />}
          </PfAboutModal.Versions>
        </div>
        {copied && <div className="cloudmeter-about-modal-copy">Copied</div>}
      </PfAboutModal>
    );
  }
}

AboutModal.propTypes = {
  commitHash: PropTypes.string,
  brand: PropTypes.bool,
  onClose: PropTypes.func,
  resetTimer: PropTypes.number,
  session: PropTypes.shape({
    username: PropTypes.string
  }),
  show: PropTypes.bool.isRequired
};

AboutModal.defaultProps = {
  commitHash: helpers.UI_COMMIT_HASH,
  brand: helpers.RH_BRAND,
  resetTimer: 3000,
  session: {
    username: null
  },
  onClose: null
};

const mapStateToProps = state => ({ ...state.aboutModal, session: state.user.session });

const ConnectedAboutModal = connect(mapStateToProps)(AboutModal);

export { ConnectedAboutModal as default, ConnectedAboutModal, AboutModal };
