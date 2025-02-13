import React, { Component } from "react";
import { Form, Card } from "react-bootstrap";
import { connect } from 'react-redux';
import { LoaderButton } from "../presentation";
import style from '../../../public/scss/theme.scss';
import actions from '../../actions';


 class Signup extends Component {
    // initialize state for form fields this component will control
    state = {
      isLoading: false,
      email: "",
      password: "",
      confirmPassword: "",
      confirmationCode: "",
      newUser: null
    };

  componentDidMount() {
    console.log('Signup.componentDidMount() :::', this.props);
    console.log('Signup.componentDidMount() :::', this.state);
  }

  validateForm() {
    // submit button stays in disabled state until these conditions are TRUE
    return (
      this.state.email.length > 0 &&
      this.state.password.length > 0 &&
      this.state.password === this.state.confirmPassword
    );
  }

  validateConfirmationForm() {
    // submit button stays in disabled state until this condition is TRUE
    console.log('confirmationCode:::', this.state.confirmationCode);
    return this.state.confirmationCode.length > 0;
  }

  handleChange = event => {
    // form input fields whose change is controlled by this container are handled here
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = async event => {
    // prevent default submit event/action
    event.preventDefault();
    // trigger submit button's async-only state from initialization of async call until a value is returned
    this.setState({ isLoading: true });
    // async call
    try {
      // state fields controlled by this container are packaged to be passed into async function
      let user = {
        username: this.state.email,
        password: this.state.password
      };
      // async redux action called from here 
      await this.props.createUser(user);
      // response to async redux call flows from redux cycle into this component's props
      //  capture the new current user value to be used locally and passed into component's state to trigger rerender
      let newUser = this.props.user.currentUser;
      console.log(' after action call ::: Signup.newUser --- ', newUser);
      // trigger re-render by calling setState() method 
      this.setState({
        newUser
      });

    } catch (e) {
      console.log('error.this', this);
      console.log('e::::', e);
      // inform user of error during signup process
      alert(e);
    }
    // with async redux action/call now complete, exit loader button's async-only state
    this.setState({ isLoading: false });
  }
  

  handleConfirmationSubmit = async event => {
    event.preventDefault();

    this.setState({ isLoading: true });

    try {

      let user = {
        username: this.state.email,
        confirmationCode: this.state.confirmationCode || null,
        password: this.state.password || null
      }

      await this.props.confirmUser(user);

      await this.props.signInUser(user);

      this.props.userHasAuthenticated(true);

      this.props.history.push("/");

    } catch (e) {
      alert(e.message);
      this.setState({ isLoading: false });
    }
  }

  renderConfirmationForm() {
    return (
      <div className="container col-md-5">
      <Card className={style.Aligner} >
        <Card.Body>
          <form onSubmit={this.handleConfirmationSubmit}>
            <Form.Group controlId="confirmationCode" variant="large">
              <Form.Label>Confirmation Code</Form.Label>
              <Form.Control
                autoFocus
                type="tel"
                value={this.state.confirmationCode}
                onChange={this.handleChange}
              />
              <Form.Text className="text-muted">Please check your email for the code.</Form.Text>
            </Form.Group>
            <LoaderButton
              block
              className="btn-lg"
              disabled={!this.validateConfirmationForm()}
              type="submit"
              isLoading={this.state.isLoading}
              text="Verify"
              loadingText="Verifying…"
            />
          </form>
          </Card.Body>
        </Card>

      </div>
    );
  }

  renderForm() {
    return (
      <div className="container col-md-5">
      <Card className={style.Aligner} >
        <Card.Body>
            <form onSubmit={this.handleSubmit}>
              <Form.Group controlId="email" variant="large">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  autoFocus
                  type="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
            </Form.Group>
              <Form.Group controlId="password" variant="large">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  value={this.state.password}
                  onChange={this.handleChange}
                  type="password"
                />
              </Form.Group>
              <Form.Group controlId="confirmPassword" variant="large">
                <Form.Label>Confirm A Password</Form.Label>
                <Form.Control
                  value={this.state.confirmPassword}
                  onChange={this.handleChange}
                  type="password"
                />
              </Form.Group>
              <LoaderButton
                block
                className="btn-lg"
                disabled={!this.validateForm()}
                type="submit"
                isLoading={this.state.isLoading}
                text="Signup"
                loadingText="Signing up…"
              />
            </form>
            </Card.Body>
        </Card>

      </div>
    );
  }

  render() {
    return (
      <div className="Signup">
        {this.state.newUser === null
          ? this.renderForm()
          : this.renderConfirmationForm()}
      </div>
    );
  }
}

const stateToProps = (state) => {
  return {
    user: state.user
  }
}

const dispatchToProps = (dispatch) => {
  return {
    createUser: (...params) => dispatch(actions.actionCreateUser(...params)),
    confirmUser: (...params) => dispatch(actions.actionConfirmUser(...params)),
    signInUser: (...params) => dispatch(actions.actionSignInUser(...params)),
  }
}

export default connect(stateToProps, dispatchToProps)(Signup);