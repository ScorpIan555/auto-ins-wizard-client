import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LoaderButton } from '../presentation';
import { LinkContainer } from 'react-router-bootstrap';
import actions from '../../actions';

class Welcome extends Component {
    state = {
      zipCode: "",
      isLoading: false
    };
  
  componentDidMount() {
    // console.log('Welcome.componentDidMount()', this);
    this.props.changeHeroImage('heroWelcome');
  }

  validateForm = () => {
    return (
      this.state.zipCode.length > 0
    );
  }

  handleChange = event => {
    // console.log('handleChange', event.target.id, event.target.value);
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = async event => {
    event.preventDefault();
    console.log('handleSubmit.this.state.zipCode:::', this.state.zipCode);

    this.setState({ isLoading: true });

    try {
      console.log('handleSubmit.this.state.zipCode:::', this.state.zipCode);
      await this.props.submitUserInput(this.state.zipCode);
      
    }
    catch (err) {
      console.log('err:::', err);
    }
    
    this.setState({ isLoading: false });
    this.props.changeHeroImage('heroForm');
    this.props.history.push('/get-your-quote/basic-info');
  }

  render() {
    return (
      <section className="space-lg">
        <div className="container">
          <div className="row align-items-center justify-content-between">
            <div className="col-lg-6">
              <div className="card">
                <div className="card-body">
                  <form>
                    <div className="form-group">
                      <label htmlFor="exampleInputUsername">Zip Code</label>
                      <input
                        type="text"
                        value={this.state.zipCode}
                        onChange={this.handleChange}
                        className="form-control form-control-lg col-5"
                        id="zipCode"
                        placeholder="Enter your zip..."
                      />
                    </div>
                    <LinkContainer to="/get-quote-form" onClick={this.handleSubmit}>
                      <LoaderButton
                        block
                        className="btn-lg btn-success"
                        disabled={!this.validateForm()}
                        type="submit"
                        isLoading={this.state.isLoading}
                        text="Get Your Quote!"
                        loadingText="Let's Go!"
                      />
                    </LinkContainer>
                    
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const stateToProps = state => {
  return {
    user: state.user,
    heroImage: state.nav.heroImage
  };
};

const dispatchToProps = dispatch => {
  return {
    submitUserInput: (userInput) => dispatch(actions.actionSubmitUserWelcomeData(userInput)),
    changeHeroImage: (heroImage) => dispatch(actions.actionChangeHeroImage(heroImage))
  };
};

export default connect(stateToProps, dispatchToProps)(Welcome);
