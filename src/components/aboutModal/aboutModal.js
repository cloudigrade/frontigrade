import React from 'react';
import PropTypes from 'prop-types';
import { detect } from 'detect-browser';
import { AboutModal as PfAboutModal } from 'patternfly-react';
import { connect, reduxTypes, store } from '../../redux';
import helpers from '../../common/helpers';
import logo from '../../styles/images/logo.svg';
import logoBrand from '../../styles/images/logo-brand.svg';
// import productTitle from '../../styles/images/title.svg';
// import rhLogo from '../../styles/images/brand/logo.svg';
// import rhProductTitle from '../../styles/images/brand/title.svg';
import titleImg from '../../styles/images/title.svg';
import titleImgBrand from '../../styles/images/title-brand.svg';

class AboutModal extends React.Component {
  state = {
    copied: false,
    timer: null
  };

  onClick = () => {
    const selectElement = this.selectElement.current;
    const success = helpers.copyClipboard(selectElement.innerText);

    selectElement.blur();
    clearTimeout(this.state.timer);

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

  onKeyUp = event => {
    event.preventDefault();
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

  selectElement = React.createRef();

  render() {
    const { copied } = this.state;
    const { commitHash, show, session } = this.props;
    const browser = detect();

    const props = {
      show,
      onHide: this.onClose,
      logo,
      productTitle: <img src={titleImg} alt="Cloud Meter" />,
      altLogo: 'CM'
    };

    if (helpers.RH_BRAND) {
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
          {copied && <div className="cloudmeter-about-modal-copy">Copied</div>}
        </div>
      </PfAboutModal>
    );
  }
}

AboutModal.propTypes = {
  commitHash: PropTypes.string,
  onClose: PropTypes.func,
  resetTimer: PropTypes.number,
  session: PropTypes.shape({
    username: PropTypes.string
  }),
  show: PropTypes.bool.isRequired
};

AboutModal.defaultProps = {
  commitHash: helpers.UI_COMMIT_HASH,
  resetTimer: 3000,
  session: {
    username: null
  },
  onClose: null
};

const mapStateToProps = state => ({ ...state.aboutModal, session: state.user.session });

const ConnectedAboutModal = connect(mapStateToProps)(AboutModal);

export { ConnectedAboutModal as default, ConnectedAboutModal, AboutModal };
