import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LoaderButton } from '../presentation';
import { LinkContainer } from 'react-router-bootstrap';
import actions from '../../actions';
import style from '../../../public/scss/theme.scss'

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

    this.setState({ isLoading: true });

    try {
      await this.props.submitUserInput(this.state.zipCode);
    }
    catch (err) {
      console.log('err:::', err);
      alert(err)
    }
    
    this.setState({ isLoading: false });
    this.props.changeHeroImage('heroForm');
    this.props.history.push('/get-your-quote/basic-info');
  }

  render() {
    // destructure and assign component's class methods
    let { handleChange, handleSubmit, validateForm } = this;
    // destructure and assign properties from state object
    let { zipCode, isLoading } = this.state;

    return (
      <section className="space-lg">
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-lg-8">
              <div className="card">
                <div className="card-body">
                  <form>
                    <div className="form-group form-row  align-items-center justify-content-center" style={{"height": "150px"}}>
                      {/* <div className="col-3">
                        <label id="zipCodeLabel" className={style.zipCodeLabel} htmlFor="exampleInputUsername">Zip Code</label>
                      </div> */}
                      <div className="col-1 ">
                        <i className="material-icons mr-1">public</i>
                      </div>
                      <div className="col-8">
                        <input
                          type="text"
                          value={zipCode}
                          onChange={handleChange}
                          className={'form-control align-items-right form-control-lg col-12 rounded ' + style.welcomeInputBox}
                          id="zipCode"
                          placeholder="ZIP CODE"
                        />
                      </div>
                      
                    </div>
                    <LinkContainer to="/get-quote-form" onClick={handleSubmit}>
                      <LoaderButton
                        block
                        className="btn-lg btn-success"
                        disabled={!validateForm()}
                        type="submit"
                        isLoading={isLoading}
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
