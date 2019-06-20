import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch } from 'react-router-dom';
import { VehicleInfo, DriverInfo, FinalInfo, ReviewUserInput } from '.';
import { StatusBar, BasicInfo, UnauthenticatedRoute } from '../presentation';
import actions from '../../actions';


class WizardContainer extends Component {
    // set intial state for fields to be used and controlled in this component
    state = {
        // UI state used by the form submit button
        isLoading: false,
        // form fields, possible refactor these into an object
        firstName: '',
        lastName: '',
        addressOne: '',
        addressTwo: '',
        city: '',
        stateOrCommonwealth: '',
        // RE:  zipCode field (below)...
        // normally this would be an antipattern, to initialize state from props
        // however, per:
        // https://daveceddia.com/where-initialize-state-react/
        zipCode: this.props.zipCode,  // initial state fed from <Welcome /> user input
        emailAddress: '',
        birthday: ''
    };

  componentDidMount = () => {
    // log initial state & props
    console.log('QuoteUserInputForm.didMount()', this);
    // select page hero image
    this.props.changeHeroImage('heroForm');
  }

  validateForm = () => {
    // basic client form validations
    // true result activates the form's submit buttonch
    return (
      this.state.firstName.length > 0  // will add back the rest once complete w/ development
      // this.state.email.length > 0 &&
      // this.state.zipCode > 0
      // this.state.password.length > 0 &&
      // this.state.password === this.state.confirmPassword
    );
  }
 
  handleChange = event => {
    console.log('handleChange:::', event.target.value);  // delete once finished w/ development
    // form input fields are components controlled by this container
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = async event => {
    event.preventDefault();
    console.log('QuoteUserInputForm.handleSubmit.props:::', this.props)
    // don't want to send entire state object as it includes isLoading boolean, should not be sent to redux
    let { firstName, lastName, addressOne, addressTwo, city, stateOrCommonwealth, zipCode, birthday } = this.state; 
    // define fields tobe sent into redux cycle
    let addressFormData = {
      firstName,
      lastName,
      addressOne,
      addressTwo,
      city,
      stateOrCommonwealth,
      zipCode,
      birthday
    };
    // triggers <LoaderButton /> component to show async-only view
    this.setState({ isLoading: true });

      try {
        // submit addressFormData promise
        await this.props.submitAddressForm(addressFormData);
      } catch (e) {
        console.log('e::::', e);
        alert(e);
      }
    // signify that the async form submit call is complete, end async-only view
    this.setState({ isLoading: false });
    // url-based nav using react-router props
    if(this.props.location.pathname == '/get-your-quote/basic-info') {
      this.props.history.push('/get-your-quote/vehicle-info');
    }
  }

  render() {
    // console.log('QuoteUserInputForm.childProps:::', this.props);

    // destructured assignment of fields for childProps pattern
    let { isLoading, firstName, lastName, addressOne, addressTwo, city, stateOrCommonwealth, zipCode, birthday, whichFormStep } = this.state; 
    // destructured assignment of parent (class) props to be passed to child
    let { validateForm, handleChange, handleSubmit } = this;
    // define fields to be passed in as childProps
    let childProps = {
      // parent (class) state t/b passed to childProps
      isLoading,
      firstName,
      lastName,
      addressOne,
      addressTwo,
      city,
      stateOrCommonwealth,
      zipCode,
      birthday,
      whichFormStep,
      // parent (class) methods t/b passed to childProps
      validateForm,
      handleChange,
      handleSubmit
    };

    console.log('childProps', childProps);
    console.log('history.location.pathname:::', this.props.history.location.pathname);
    const historyLocation =  this.props.history.location.pathname;

    return (
      <div className="main-container">
        <section className="flush-with-above height-80 d-block">
          <div className="tab-content">
            <div className="tab-pane fade show active" id="general" role="tabpanel">
              <div className="container">
                
                <div className="row mb-4">

                  <StatusBar historyLocation={historyLocation} />

                </div>
                <div className="">

                      <Switch>
                        <UnauthenticatedRoute exact path="/get-your-quote/basic-info" component={BasicInfo} props={childProps} />
                        <UnauthenticatedRoute exact path="/get-your-quote/vehicle-info" component={VehicleInfo} props={childProps} />
                        <UnauthenticatedRoute exact path="/get-your-quote/vehicle-info-review" component={ReviewUserInput} props={childProps} />
                        <UnauthenticatedRoute exact path="/get-your-quote/driver-info" component={DriverInfo} props={childProps} />
                        <UnauthenticatedRoute exact path="/get-your-quote/driver-info-review" component={ReviewUserInput} props={childProps} />
                        <UnauthenticatedRoute exact path="/get-your-quote/final-info" component={FinalInfo} props={childProps} />
                        <UnauthenticatedRoute exact path="/get-your-quote/final-info-review" component={ReviewUserInput} props={childProps} />
                      </Switch>      

                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

const stateToProps = state => {
  return {
    user: state.user,
    heroImage: state.nav.heroImage,
    zipCode: state.unauthenticatedSessionData.zipCode
  };
};

const dispatchToProps = dispatch => {
  return {
    changeHeroImage: heroImage => dispatch(actions.actionChangeHeroImage(heroImage)),
    submitAddressForm: addressFormData => dispatch(actions.actionSubmitAddressForm(addressFormData))
  };
};

export default connect(
  stateToProps,
  dispatchToProps
)(WizardContainer);
