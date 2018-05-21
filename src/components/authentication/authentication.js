import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Card, Form, Grid } from 'patternfly-react';
import { reduxActions } from '../../redux';
import titleImg from '../../styles/images/title.svg';

class Authentication extends React.Component {
  static renderLoading(message = 'Loading...') {
    return (
      <Card className="cloudmeter-login-loadingcard">
        <Card.Body>
          <div className="spinner spinner-xl" />
          <div className="text-center">{message}</div>
        </Card.Body>
      </Card>
    );
  }

  componentDidMount() {
    const { session, checkUser } = this.props;

    if (!session.authorized) {
      checkUser();
    }
  }

  login = () => {
    const { loginUser } = this.props;

    loginUser({
      username: 'test',
      password: 'test'
    });
  };

  renderLogin() {
    return (
      <Card className="cloudmeter-login-card">
        <header className="login-pf-header">
          <select className="selectpicker">
            <option>English</option>
          </select>
          <h1>Log In to Your Account</h1>
        </header>
        <Card.Body>
          <form autoComplete="on">
            <Form.FormGroup controlId="email">
              <Form.ControlLabel srOnly>Email address</Form.ControlLabel>
              <Form.FormControl
                bsSize="lg"
                type="email"
                value=""
                placeholder="Email address"
                name="email"
                onChange={e => console.log(e)}
              />
            </Form.FormGroup>
            <Form.FormGroup controlId="password">
              <Form.ControlLabel srOnly>Password</Form.ControlLabel>
              <Form.FormControl
                bsSize="lg"
                type="password"
                value=""
                placeholder="Password"
                name="password"
                onChange={e => console.log(e)}
              />
            </Form.FormGroup>
            <Form.FormGroup controlId="remember" className="login-pf-settings cloudmeter-login-settings">
              <Form.Checkbox name="remember" checked={false} inline className="checkbox-label">
                Remember email address
              </Form.Checkbox>
              <Button bsStyle="link">Forgot password?</Button>
            </Form.FormGroup>
            <Button bsStyle="primary" className="btn-block btn-lg" onClick={this.login}>
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
      return <React.Fragment>{children}</React.Fragment>;
    }

    return (
      <div className="login-pf cloudmeter-login fadein">
        <div className="login-pf-page cloudmeter-login-body">
          <div className="container-fluid">
            <Grid.Row>
              <Grid.Col sm={8} smOffset={2} md={6} mdOffset={3} lg={6} lgOffset={3}>
                <header className="login-pf-page-header">
                  <img className="login-pf-brand" src={titleImg} alt="Cloud Meter" />
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
  loginUser: PropTypes.func.isRequired,
  checkUser: PropTypes.func.isRequired,
  children: PropTypes.node,
  session: PropTypes.object
};

Authentication.defaultProps = {
  children: null,
  session: {}
};

const mapDispatchToProps = dispatch => ({
  loginUser: data => dispatch(reduxActions.user.loginUser(data)),
  checkUser: () => dispatch(reduxActions.user.checkUser())
});

const mapStateToProps = state => ({ session: state.user.session });

export default connect(mapStateToProps, mapDispatchToProps)(Authentication);
