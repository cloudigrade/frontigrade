import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Card, Form, Grid } from 'patternfly-react';
import { reduxActions } from '../../redux';
import { fieldValidation } from '../formField/formField';
import helpers from '../../common/helpers';
import titleImg from '../../styles/images/title.svg';

class Authentication extends React.Component {
  static renderLoading(message = 'Loading...') {
    return (
      <Card className="cloudmeter-login-loading-card">
        <Card.Body>
          <div className="spinner spinner-xl" />
          <div className="text-center">{message}</div>
        </Card.Body>
      </Card>
    );
  }

  static getDerivedStateFromProps(props, state) {
    let initialState = null;

    if (helpers.OC_MODE) {
      initialState = {
        email: state.email || process.env.REACT_APP_DEV_USER,
        password: state.password || process.env.REACT_APP_DEV_PASSWORD,
        emailError: '',
        passwordError: '',
        formValid: true
      };
    }

    return initialState;
  }

  state = {
    email: '',
    emailError: null,
    password: '',
    passwordError: null,
    remember: false,
    formTouched: false,
    formValid: false
  };

  componentDidMount() {
    const { session, checkUser } = this.props;

    if (!session.authorized) {
      checkUser();
    }
  }

  onChangeEmail = event => {
    const { value } = event.target;
    const errorMessage = fieldValidation.isEmpty(value) ? 'Email must be valid' : '';

    this.setState(
      {
        email: value,
        emailError: errorMessage,
        formTouched: true
      },
      () => this.isFormValid()
    );
  };

  onChangePassword = event => {
    const { value } = event.target;
    const errorMessage = fieldValidation.isEmpty(value) ? 'Password must be valid' : '';

    this.setState(
      {
        password: value,
        passwordError: errorMessage,
        formTouched: true
      },
      () => this.isFormValid()
    );
  };

  onChangeRemember = event => {
    const { checked } = event.target;

    this.setState({
      remember: checked
    });
  };

  isFormValid() {
    const { emailError, passwordError } = this.state;
    const formValid = emailError === '' && passwordError === '';

    this.setState({
      formValid
    });
  }

  login = () => {
    const { email, password, formValid } = this.state;
    const { checkUser, loginUser } = this.props;

    if (formValid) {
      this.setState(
        {
          formTouched: false
        },
        () =>
          loginUser({
            username: email,
            password
          }).then(() => checkUser())
      );
    }
  };

  renderLogin() {
    const { email, emailError, formTouched, password, passwordError, remember } = this.state;
    const { session } = this.props;

    return (
      <Card className="cloudmeter-login-card">
        <header className="login-pf-header">
          <select className="selectpicker">
            <option>English</option>
          </select>
          <h1>Log In to Your Account</h1>
        </header>
        <Card.Body>
          <form autoComplete={remember ? 'on' : 'off'}>
            <div className="cloudmeter-login-card-error help-block" aria-live="polite">
              {(!formTouched && session.error && session.loginFailed) ||
              (emailError !== '' && emailError !== null) ||
              (passwordError !== '' && passwordError !== null)
                ? 'Email address or password is incorrect.'
                : null}
            </div>
            <Form.FormGroup controlId="email">
              <Form.ControlLabel srOnly>Email address</Form.ControlLabel>
              <Form.FormControl
                bsSize="lg"
                type="email"
                value={email}
                placeholder="Email address"
                name="email"
                onChange={this.onChangeEmail}
              />
            </Form.FormGroup>
            <Form.FormGroup controlId="password">
              <Form.ControlLabel srOnly>Password</Form.ControlLabel>
              <Form.FormControl
                bsSize="lg"
                type="password"
                value={password}
                placeholder="Password"
                name="password"
                onChange={this.onChangePassword}
              />
            </Form.FormGroup>
            <Form.FormGroup controlId="remember" className="login-pf-settings cloudmeter-login-settings">
              <Form.Checkbox
                name="remember"
                checked={remember}
                inline
                className="checkbox-label"
                onChange={this.onChangeRemember}
              >
                Remember email address
              </Form.Checkbox>
              <Button bsStyle="link" className="sr-only">
                Forgot password?
              </Button>
            </Form.FormGroup>
            <Button bsStyle="primary" bsSize="large" className="btn-block" onClick={this.login}>
              Log In
            </Button>
          </form>
        </Card.Body>
      </Card>
    );
  }

  render() {
    const { children, session } = this.props;

    if (session.authorized) {
      return children;
    }

    return (
      <div className="login-pf cloudmeter-login fadein">
        <div className="login-pf-page cloudmeter-login-body">
          <div className="container-fluid">
            <Grid.Row>
              <Grid.Col sm={8} smOffset={2} md={6} mdOffset={3} lg={6} lgOffset={3}>
                <header className="login-pf-page-header">
                  <img className="login-pf-brand cloudmeter-login-brand" src={titleImg} alt="Cloud Meter" />
                </header>
                <Grid.Row>
                  <Grid.Col sm={10} smOffset={1} md={8} mdOffset={2} lg={8} lgOffset={2}>
                    {!session.pending && this.renderLogin()}
                    {session.pending && Authentication.renderLoading()}
                  </Grid.Col>
                </Grid.Row>
              </Grid.Col>
            </Grid.Row>
          </div>
        </div>
      </div>
    );
  }
}

Authentication.propTypes = {
  checkUser: PropTypes.func,
  children: PropTypes.node.isRequired,
  loginUser: PropTypes.func,
  session: PropTypes.shape({
    error: PropTypes.bool,
    loginFailed: PropTypes.bool,
    authorized: PropTypes.bool,
    pending: PropTypes.bool
  })
};

Authentication.defaultProps = {
  checkUser: helpers.noop,
  loginUser: helpers.noop,
  session: {}
};

const mapDispatchToProps = dispatch => ({
  checkUser: () => dispatch(reduxActions.user.checkUser()),
  loginUser: data => dispatch(reduxActions.user.loginUser(data))
});

const mapStateToProps = state => ({ session: state.user.session });

export default connect(mapStateToProps, mapDispatchToProps)(Authentication);
