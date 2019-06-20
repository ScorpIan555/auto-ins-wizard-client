import React, { Component } from "react";
import { Button, Form, Card } from "react-bootstrap";
import { connect } from 'react-redux';
import { Auth } from "aws-amplify";
import style from '../../../public/scss/theme.scss';

class Login extends Component {
    state = {
      isLoading: false,
      email: "",
      password: ""
    };

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    // form input fields are components controlled by this container
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = async event => {
    event.preventDefault();

    this.setState({ isLoading: true });

    try {
      await Auth.signIn(this.state.email, this.state.password);

        this.props.userHasAuthenticated(true);

    } catch (e) {

      alert(e.message);

      this.setState({ isLoading: false });
    }
  }


  render() {
    return (
      <div className="container col-md-5">
        <Card className={style.Aligner} >
          <Card.Body>
            <form onSubmit={this.handleSubmit}>
            <Form.Group controlId="email" variant="large">
              <Form.Label className="label login-form-label">Email</Form.Label>
              <Form.Control
                autoFocus
                type="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="password" variant="large">
              <Form.Label className="label login-form-label">Password</Form.Label>
              <Form.Control
                value={this.state.password}
                onChange={this.handleChange}
                type="password"
              />
            </Form.Group>
            <Button
              block
              className="btn-lg"
              disabled={!this.validateForm()}
              type="submit"
            >
              Login
            </Button>
          </form>
          </Card.Body>
        </Card>

      </div>
    );
  }
}

const stateToProps = (state) => {
  return {
    // user: state.user
  }
}

const dispatchToProps = (dispatch) => {
  return {

    signInUser: (...params) => dispatch(actions.actionSignInUser(...params))
  }
}

export default connect(stateToProps, dispatchToProps)(Login)