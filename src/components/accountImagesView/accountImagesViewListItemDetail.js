import React from 'react';
import PropTypes from 'prop-types';
import { Alert, Checkbox, Form, Grid, Icon, Spinner } from 'patternfly-react';
import apiTypes from '../../constants/apiConstants';
import { connectTranslate, reduxActions, reduxSelectors, reduxTypes, store } from '../../redux';
import helpers from '../../common/helpers';

class AccountImagesViewListItemDetail extends React.Component {
  componentDidMount() {
    const { getAccountImage, id } = this.props;

    getAccountImage(id);
  }

  onSubmit = event => {
    event.preventDefault();
  };

  onCheck = (event, type) => {
    const { image, updateAccountImageFieldRhel, updateAccountImageFieldRhocp } = this.props;
    const { checked } = event.target;

    const challengeSubmitProp =
      type === 'rhocp' ? apiTypes.API_SUBMIT_IMAGE_OPENSHIFT_CHALLENGED : apiTypes.API_SUBMIT_IMAGE_RHEL_CHALLENGED;

    const updateImageField = type === 'rhocp' ? updateAccountImageFieldRhocp : updateAccountImageFieldRhel;

    updateImageField(image[apiTypes.API_SUBMIT_IMAGE_ID], {
      [apiTypes.API_SUBMIT_IMAGE_RESOURCE_TYPE]: image[apiTypes.API_RESPONSE_IMAGES_EDIT_RESOURCE_TYPE],
      [challengeSubmitProp]: checked
    }).then(
      () => {
        store.dispatch({
          type: reduxTypes.account.UPDATE_ACCOUNT_IMAGES_INSTANCES
        });
      },
      error => {
        const imageName =
          image[apiTypes.API_RESPONSE_IMAGES_EDIT_NAME] ||
          `Image #${image[apiTypes.API_RESPONSE_IMAGES_EDIT_ID] || ''}`;

        store.dispatch({
          type: reduxTypes.toastNotifications.TOAST_ADD,
          alertType: 'error',
          header: `Error updating ${imageName}`,
          message: helpers.getMessageFromResults(error)
        });
      }
    );
  };

  renderRhelDetectedReasons() {
    const { image, t } = this.props;

    const rhelEnabledRepos = image[apiTypes.API_RESPONSE_IMAGES_EDIT_RHEL_ENABLED_REPOS];
    const rhelProductCerts = image[apiTypes.API_RESPONSE_IMAGES_EDIT_RHEL_PRODUCT_CERTS];
    const rhelReleaseFiles = image[apiTypes.API_RESPONSE_IMAGES_EDIT_RHEL_RELEASE_FILES];
    const rhelSignedPackages = image[apiTypes.API_RESPONSE_IMAGES_EDIT_RHEL_SIGNED_PACKAGES];
    const rhelCloudAccess = image[apiTypes.API_RESPONSE_IMAGES_EDIT_CLOUD_ACCESS];

    return (
      <React.Fragment>
        <ul className="cloudmeter-list">
          {rhelEnabledRepos && <li>{t('list-images.rhel.rhel-detail-enabled-repos')}</li>}
          {rhelProductCerts && <li>{t('list-images.rhel.rhel-detail-product-certs')}</li>}
          {rhelReleaseFiles && <li>{t('list-images.rhel.rhel-detail-release-files')}</li>}
          {rhelSignedPackages && <li>{t('list-images.rhel.rhel-detail-signed-packages')}</li>}
          {rhelCloudAccess && <li>{t('list-images.rhel.rhel-detail-cloud-access')}</li>}
        </ul>
        <p>{t('list-images.rhel.rhel-not-running')}</p>
      </React.Fragment>
    );
  }

  renderRhelNotDetectedReasons() {
    const { image, t } = this.props;

    const marketPlace = image[apiTypes.API_RESPONSE_IMAGES_EDIT_MARKETPLACE];

    return (
      <React.Fragment>
        <ul className="cloudmeter-list">{marketPlace && <li>{t('list-images.rhel.rhel-detail-marketplace')}</li>}</ul>
        <p>{t('list-images.rhel.rhel-running')}</p>
      </React.Fragment>
    );
  }

  renderRhocpDetectedReasons() {
    const { image, t } = this.props;

    const rhocpDetected = image[apiTypes.API_RESPONSE_IMAGES_EDIT_OPENSHIFT_DETECTED];

    return (
      <React.Fragment>
        <ul className="cloudmeter-list">{rhocpDetected && <li>{t('list-images.rhocp.rhocp-detail-detected')}</li>}</ul>
        <p>{t('list-images.rhocp.rhocp-not-running')}</p>
      </React.Fragment>
    );
  }

  renderRhocpNotDetectedReasons() {
    const { t } = this.props;

    return <p>{t('list-images.rhocp.rhocp-running')}</p>;
  }

  render() {
    const { image, error, errorMessage, pending, rhocpError, rhocpPending, rhelError, rhelPending } = this.props;

    const rhelDetected = image[apiTypes.API_RESPONSE_IMAGES_EDIT_RHEL_DETECTED] || false;
    const rhelChallenged = image[apiTypes.API_RESPONSE_IMAGES_EDIT_RHEL_CHALLENGED] || false;
    const rhocpDetected = image[apiTypes.API_RESPONSE_IMAGES_EDIT_OPENSHIFT_DETECTED] || false;
    const rhocpChallenged = image[apiTypes.API_RESPONSE_IMAGES_EDIT_OPENSHIFT_CHALLENGED] || false;

    if (error) {
      return (
        <Grid fluid>
          <Grid.Row>
            <Grid.Col xs={12}>
              <Alert type="error">
                <span>Error retrieving image detail: {errorMessage}</span>
              </Alert>
            </Grid.Col>
          </Grid.Row>
        </Grid>
      );
    }

    if (pending) {
      return (
        <Grid fluid>
          <Grid.Row>
            <Grid.Col xs={12}>
              <Spinner loading size="sm" className="blank-slate-pf-icon" />
              <div className="text-center">Loading...</div>
            </Grid.Col>
          </Grid.Row>
        </Grid>
      );
    }

    return (
      <Grid fluid className="fadein">
        <Grid.Row>
          <Grid.Col xs={6}>
            {rhelDetected && (
              <React.Fragment>
                <h5>
                  <strong>Red Hat Enterprise Linux is detected</strong>
                </h5>
                {this.renderRhelDetectedReasons()}
              </React.Fragment>
            )}
            {!rhelDetected && (
              <React.Fragment>
                <h5>
                  <strong>Red Hat Enterprise Linux is not detected</strong>
                </h5>
                {this.renderRhelNotDetectedReasons()}
              </React.Fragment>
            )}
            <Form onSubmit={this.onSubmit}>
              <Form.FormGroup validationState={rhelError ? 'error' : null}>
                <Checkbox
                  checked={rhelChallenged}
                  disabled={rhelPending}
                  className={{ 'cloudmeter-flag-status-pending': rhelPending }}
                  onChange={event => this.onCheck(event, 'rhel')}
                >
                  {rhelPending && (
                    <Icon className="cloudmeter-flag-status-icon fa-spin" size="lg" type="fa" name="spinner" />
                  )}
                  {rhelChallenged ? 'Flagged' : 'Flag'} for review{' '}
                  {rhelChallenged && <Icon type="fa" name="flag" className="cloudmeter-pficon-error" />}
                </Checkbox>
              </Form.FormGroup>
            </Form>
          </Grid.Col>
          <Grid.Col xs={6}>
            {rhocpDetected && (
              <React.Fragment>
                <h5>
                  <strong>Red Hat OpenShift Container Platform is detected</strong>
                </h5>
                {this.renderRhocpDetectedReasons()}
              </React.Fragment>
            )}
            {!rhocpDetected && (
              <React.Fragment>
                <h5>
                  <strong>Red Hat OpenShift Container Platform is not detected</strong>
                </h5>
                {this.renderRhocpNotDetectedReasons()}
              </React.Fragment>
            )}
            <Form onSubmit={this.onSubmit}>
              <Form.FormGroup validationState={rhocpError ? 'error' : null}>
                <Checkbox
                  checked={rhocpChallenged}
                  disabled={rhocpPending}
                  className={{ 'cloudmeter-flag-status-pending': rhocpPending }}
                  onChange={event => this.onCheck(event, 'rhocp')}
                >
                  {rhocpPending && (
                    <Icon className="cloudmeter-flag-status-icon fa-spin" size="lg" type="fa" name="spinner" />
                  )}
                  {rhocpChallenged ? 'Flagged' : 'Flag'} for review{' '}
                  {rhocpChallenged && <Icon type="fa" name="flag" className="cloudmeter-pficon-error" />}
                </Checkbox>
              </Form.FormGroup>
            </Form>
          </Grid.Col>
        </Grid.Row>
      </Grid>
    );
  }
}

AccountImagesViewListItemDetail.propTypes = {
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  getAccountImage: PropTypes.func,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  image: PropTypes.object,
  pending: PropTypes.bool,
  rhocpError: PropTypes.bool,
  rhocpPending: PropTypes.bool,
  rhelError: PropTypes.bool,
  rhelPending: PropTypes.bool,
  t: PropTypes.func,
  updateAccountImageFieldRhel: PropTypes.func,
  updateAccountImageFieldRhocp: PropTypes.func
};

AccountImagesViewListItemDetail.defaultProps = {
  error: false,
  errorMessage: null,
  getAccountImage: helpers.noop,
  image: {},
  pending: false,
  rhocpError: false,
  rhocpPending: false,
  rhelError: false,
  rhelPending: false,
  t: helpers.noopTranslate,
  updateAccountImageFieldRhel: helpers.noop,
  updateAccountImageFieldRhocp: helpers.noop
};

const mapDispatchToProps = dispatch => ({
  getAccountImage: id => dispatch(reduxActions.account.getAccountImage(id)),
  updateAccountImageFieldRhel: (id, data) => dispatch(reduxActions.account.updateAccountImageFieldRhel(id, data)),
  updateAccountImageFieldRhocp: (id, data) => dispatch(reduxActions.account.updateAccountImageFieldRhocp(id, data))
});

const makeMapStateToProps = () => {
  const getImageDetail = reduxSelectors.accountImages.makeImageDetail();

  return (state, props) => ({
    ...getImageDetail(state, props)
  });
};

const ConnectedAccountImagesViewListItemDetail = connectTranslate(makeMapStateToProps, mapDispatchToProps)(
  AccountImagesViewListItemDetail
);

export {
  ConnectedAccountImagesViewListItemDetail as default,
  ConnectedAccountImagesViewListItemDetail,
  AccountImagesViewListItemDetail
};
