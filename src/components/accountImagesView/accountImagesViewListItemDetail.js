import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox, Form, Grid, Icon } from 'patternfly-react';
import _isEqual from 'lodash/isEqual';
import apiTypes from '../../constants/apiConstants';
import { connect, reduxActions } from '../../redux';
import helpers from '../../common/helpers';

class AccountImagesViewListItemDetail extends React.Component {
  // FixMe: API - Hard Coded Values - "AwsMachineImage"
  state = {
    item: null, // eslint-disable-line
    rhelFlagged: false,
    rhelDetected: false,
    rhelError: false,
    rhelPending: false,
    openshiftFlagged: false,
    openshiftDetected: false,
    openshiftError: false,
    openshiftPending: false,
    resourceType: 'AwsMachineImage'
  };

  static getDerivedStateFromProps(props, state) {
    let initialState = null;

    // ToDo: Passing entire object for ease, in prep for API handling additional image display properties
    if (!_isEqual(props.item, state.item)) {
      initialState = {
        item: props.item,
        rhelFlagged: props.item[apiTypes.API_RESPONSE_IMAGES_RHEL_CHALLENGED],
        rhelDetected: props.item[apiTypes.API_RESPONSE_IMAGES_RHEL_DETECTED],
        openshiftFlagged: props.item[apiTypes.API_RESPONSE_IMAGES_OPENSHIFT_CHALLENGED],
        openshiftDetected: props.item[apiTypes.API_RESPONSE_IMAGES_OPENSHIFT_DETECTED]
      };
    }

    return initialState;
  }

  onSubmit = event => {
    event.preventDefault();
  };

  onCheckOpenshift = event => {
    const { item, updateAccountImageField } = this.props;
    const { resourceType } = this.state;
    const { checked } = event.target;

    this.setState(
      {
        openshiftPending: true
      },
      () => {
        updateAccountImageField(item[apiTypes.API_RESPONSE_IMAGES_ID], {
          [apiTypes.API_SUBMIT_IMAGE_RESOURCE_TYPE]: resourceType,
          [apiTypes.API_SUBMIT_IMAGE_OPENSHIFT_CHALLENGED]: checked
        }).then(
          () =>
            this.setState({
              openshiftError: false,
              openshiftFlagged: checked,
              openshiftPending: false
            }),
          () =>
            this.setState({
              openshiftError: true,
              openshiftFlagged: false,
              openshiftPending: false
            })
        );
      }
    );
  };

  onCheckRhel = event => {
    const { item, updateAccountImageField } = this.props;
    const { resourceType } = this.state;
    const { checked } = event.target;

    this.setState(
      {
        rhelPending: true
      },
      () => {
        updateAccountImageField(item[apiTypes.API_RESPONSE_IMAGES_ID], {
          [apiTypes.API_SUBMIT_IMAGE_RESOURCE_TYPE]: resourceType,
          [apiTypes.API_SUBMIT_IMAGE_RHEL_CHALLENGED]: checked
        }).then(
          () =>
            this.setState({
              rhelError: false,
              rhelFlagged: checked,
              rhelPending: false
            }),
          () =>
            this.setState({
              rhelError: true,
              rhelFlagged: false,
              rhelPending: false
            })
        );
      }
    );
  };

  render() {
    const {
      openshiftDetected,
      openshiftError,
      openshiftFlagged,
      openshiftPending,
      rhelDetected,
      rhelError,
      rhelFlagged,
      rhelPending
    } = this.state;

    return (
      <Grid fluid>
        <Grid.Row>
          <Grid.Col xs={6}>
            {rhelDetected && <strong>Red Hat Enterprise Linux was detected</strong>}
            {!rhelDetected && <strong>Red Hat Enterprise Linux was not detected</strong>}
            <Form onSubmit={this.onSubmit}>
              <Form.FormGroup controlId="test1" validationState={rhelError ? 'error' : null}>
                <Checkbox
                  checked={rhelFlagged}
                  disabled={rhelPending}
                  className={{ 'cloudmeter-flag-status-pending': rhelPending }}
                  onChange={this.onCheckRhel}
                >
                  {rhelPending && (
                    <Icon className="cloudmeter-flag-status-icon fa-spin" size="lg" type="fa" name="spinner" />
                  )}
                  {rhelFlagged ? 'Flagged' : 'Flag'} for review{' '}
                  {rhelFlagged && <Icon type="fa" name="asterisk" className="cloudmeter-pficon-error" />}
                </Checkbox>
              </Form.FormGroup>
            </Form>
          </Grid.Col>
          <Grid.Col xs={6}>
            {openshiftDetected && <strong>Red Hat OpenShift Container Platform was detected</strong>}
            {!openshiftDetected && <strong>Red Hat OpenShift Container Platform was not detected</strong>}
            <Form onSubmit={this.onSubmit}>
              <Form.FormGroup controlId="test2" validationState={openshiftError ? 'error' : null}>
                <Checkbox
                  checked={openshiftFlagged}
                  disabled={openshiftPending}
                  className={{ 'cloudmeter-flag-status-pending': openshiftPending }}
                  onChange={this.onCheckOpenshift}
                >
                  {openshiftPending && (
                    <Icon className="cloudmeter-flag-status-icon fa-spin" size="lg" type="fa" name="spinner" />
                  )}
                  {openshiftFlagged ? 'Flagged' : 'Flag'} for review{' '}
                  {openshiftFlagged && <Icon type="fa" name="asterisk" className="cloudmeter-pficon-error" />}
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
  item: PropTypes.object.isRequired,
  updateAccountImageField: PropTypes.func
};

AccountImagesViewListItemDetail.defaultProps = {
  updateAccountImageField: helpers.noop
};

const mapDispatchToProps = dispatch => ({
  updateAccountImageField: (id, data) => dispatch(reduxActions.account.updateAccountImageField(id, data))
});

const mapStateToProps = () => ({});

const ConnectedAccountImagesViewListItemDetail = connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountImagesViewListItemDetail);

export {
  ConnectedAccountImagesViewListItemDetail as default,
  ConnectedAccountImagesViewListItemDetail,
  AccountImagesViewListItemDetail
};
