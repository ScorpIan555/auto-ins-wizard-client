import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../../actions';
import { LoaderButton } from '../presentation';

class ReviewUserInput extends Component {
  state = {
    isLoading: false
  };

  componentDidMount = () => {
    console.log('this.props.userInput', this.props.userInput);
    console.log('this.props.addressFormData', this.props.addressFormData);
    console.log('this.props.vehicleFormData', this.props.vehicleFormData);
    console.log('this.props.driverFormData', this.props.driverFormData);
  }

  handleSubmit = async event => {
    event.preventDefault();
    console.log('QuoteUserInputForm.handleSubmit.props:::', this.props)
    // don't want to send entire state object as it includes isLoading boolean, should not be sent to redux
    let { firstName, lastName, addressOne, addressTwo, city, stateOrCommonwealth, zipCode, birthday } = this.state;
    // define fields to be sent into redux cycle
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
    // // triggers <LoaderButton /> component to show async-only view
    // this.setState({ isLoading: true });

    //   try {
    //     // submit addressFormData promise
    //     await this.props.submitAddressForm(addressFormData);
    //   } catch (e) {
    //     console.log('e::::', e);
    //     alert(e);
    //   }
    // // signify that the async form submit call is complete, end async-only view
    // this.setState({ isLoading: false });
    // url-based nav using react-router props
    if(this.props.location.pathname == '/get-your-quote/vehicle-info-review') {
      this.props.history.push('/get-your-quote/driver-info');
    }
    if(this.props.location.pathname == '/get-your-quote/driver-info-review') {
      this.props.history.push('/get-your-quote/final-info');
    }
    if(this.props.location.pathname == '/get-your-quote/final-info-review') {
      this.props.history.push('/');
    }
  }

  validateForm = () => {
    return {
        // bodyType !== '' &&
        // primaryUse !== '' &&
        // ownOrLease !== '' &&
        // lengthOfVehicleOwnership !== ''
    }
}

  render() {

    console.log('ReviewUserInput.render()', this.props);
    // destructure class methods
    let { handleSubmit, validateForm } = this;
    // destructure properties of the this.state object
    let { isLoading } = this.state;

    return (
      <div>
        <div>REVIEW USER INPUT</div>
        <h5>accordion here</h5>


        <div>
            <LoaderButton 
              block
              className="btn-lg"
              disabled={!validateForm()}
              type="button"
              isLoading={isLoading}
              text="Continue"
              loadingText="Signing up…"
              onClick={handleSubmit}
            />
        </div>

      </div>
      
      );
  }
}

const stateToProps = state => {
  return {
    userInput: state.unauthenticatedSessionData,
    addressFormData: state.unauthenticatedSessionData.addressFormData,
    vehicleFormData: state.unauthenticatedSessionData.vehicleFormData,
    driverFormData: state.unauthenticatedSessionData.driverFormData,
  };
};

const dispatchToProps = dispatch => {
  return {
    // submitDriverData: (formData) => dispatch(actions.actionSubmitDriverData(formData))
  };
};


export default connect(stateToProps, dispatchToProps)(ReviewUserInput);
