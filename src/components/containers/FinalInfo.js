import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../../actions';
import { ButtonGroup, Dropdown, DropdownButton, Form, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import { LoaderButton } from '../presentation';

class FinalInfo extends Component {
    state = {
      ifLoading: false,
      haveInsurance: '',
      howLongHaveBeenEmployed: '',
      currentBodilyInjuryLimit: '',
      beenCancelled: '',
      currentNumberOfResidents: '',
      email: ''
    };

    // AutoTool container controls as parent fields in AutoToolColumns & AdditionalVehicleDetails presentation components
    handleChange = event => {
      console.log('event.target:::', event.target);
      console.log('event.target:::', event.target.value);
      // handle check/uncheck of the checkbox for whether user's vehicle is used in ridesharing (or not, default is false)
      if(event.target.name == "haveInsurance" ) {
          this.setState({
            haveInsurance: event.target.value
          });
          return;
      }
      // handle check/uncheck of the checkbox for whether user's had an accident or other claim
      if(event.target.name == "beenCancelled" ) {
          this.setState({
              beenCancelled: event.target.value
          });
          return;
      }
      // // handle check/uncheck of the checkbox for whether user's had tickets or violations
      // if(event.target.name == "" ) {
      //     this.setState({
      //         : event.target.value
      //     });
      //     return;
      // }
      // form input fields are components controlled by this container
      this.setState({
      [event.target.id]: event.target.value
      })
    }

    // Submit form data for fields controlled by AutoTool container (parent to AutoToolColumns & AdditionalVehicleDetails presentation components)
    handleSubmit = async event => {
      console.log('event:::', event)
      // prevent default submit event/action
      event.preventDefault();
      // trigger submit button's async-only state from initialization of async call until a value is returned
      this.setState({ isLoading: true });
      
      try {
          // destructure and assign from state object
          let { isLoading, howLongHaveBeenEmployed, currentBodilyInjuryLimit, currentNumberOfResidents, email } = this.state;
          // set form data
          let formData = { 
            isLoading, howLongHaveBeenEmployed, currentBodilyInjuryLimit, currentNumberOfResidents, email 
          };
          console.log('AutoTool.formData::::', formData);
          // async redux action call
          await this.props.submitFinalData(formData);
      } catch (error) {
          alert(error);
      }
      // with async redux action/call now complete, exit loader button's async-only state
      this.setState({ isLoading: false });
      // navigate to 
      this.props.history.push("/get-your-quote/final-info-review");
    }

    createDropdownMenu = nameOfDropdownMenu => {
      // destructure class methods
      let { handleChange } = this;
      // array of lengths of employment
      let howLongHaveBeenEmployedArray = [ 'Less than 1 year', '1 - 3 years', '3-5', 'More than 5', 'Prefer not to say/I\'m a hustler baby' ];
      // array of injury limits on insurance coverage
      let currentBodilyInjuryLimitArray = [ '$20,000/$40,000', '$50,000/$100,000', '$250,000/$500,000', '$500,000/$1,000,000' ];
      // array of number of residents
      let numberOfResidentsArray = [ 'One (you)', 'Two (licensed)', 'Three or more (licensed)', 'One licensed driver, more non' ];

      // initialize empty array to be used in array mapping
      let arrayOfMenuItemValues = [];
      // assign empty array's values based on nameOfDropdownMenu parameter
      if(nameOfDropdownMenu === 'howLongHaveBeenEmployed') {
          arrayOfMenuItemValues = howLongHaveBeenEmployedArray;
      }
      if(nameOfDropdownMenu === 'currentBodilyInjuryLimit') {
          arrayOfMenuItemValues = currentBodilyInjuryLimitArray;
      }
      if(nameOfDropdownMenu === 'currentNumberOfResidents') {
          arrayOfMenuItemValues = numberOfResidentsArray;
      }
      // if(nameOfDropdownMenu === 'employmentStatus') {
      //     arrayOfMenuItemValues = employmentStatusArray;
      // }
      // if(nameOfDropdownMenu === 'primaryResidence') {
      //     arrayOfMenuItemValues = primaryResidenceArray;
      // }
      // if(nameOfDropdownMenu === 'licenseStatus') {
      //     arrayOfMenuItemValues = licenseStatusArray;
      // }
      // if(nameOfDropdownMenu === 'yearsLicensed') {
      //     arrayOfMenuItemValues = yearsLicensedArray;
      // }


      // map over array of menu items to populate the dropdown menu indicated by the nameOfDropdownMenu parameter
      let dropdownMenu = arrayOfMenuItemValues.map((type, i) => {
          return <Dropdown.Item as="button" id={nameOfDropdownMenu} key={i} eventKey={i} value={type} onClick={handleChange}>{type}</Dropdown.Item>
      })
      // pass the array of <Dropdown.Item ... />'s to the render() function
      return dropdownMenu;
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
      // deconstruct class methods
      let { handleChange, handleSubmit, createDropdownMenu, validateForm } = this;
      // deconstruct state for value fields
      let { isLoading, howLongHaveBeenEmployed, currentBodilyInjuryLimit, currentNumberOfResidents, email } = this.state;

        return(
          <div className="card col-12 col-md-8 order-md-1">
            <h4>Auto Insurance History</h4>
            <ToggleButtonGroup className="m-4  align-items-center" type="radio" name="haveInsurance" id="haveInsurance" onClick={handleChange} >
              <label htmlFor="haveInsurance" className="col-3 mr-5">Do you currently have auto insurance?</label>
                    
                <ToggleButton className="ml-5 col-2" name="Yes" value="Yes" > Yes </ToggleButton>
                <ToggleButton className="ml-5 col-2" name="No" value="No" > No </ToggleButton>
                
            </ToggleButtonGroup>

            <ButtonGroup className="m-4" >
              <label htmlFor="howLongHaveBeenEmployed" className="col-3 mr-5">How long have you been employed (current company)?</label>
              <DropdownButton  className="ml-5 col-2 btn-block" id="howLongHaveBeenEmployed" title={howLongHaveBeenEmployed !== '' ? howLongHaveBeenEmployed : 'Pick One'} value={howLongHaveBeenEmployed}  >
              
                  {createDropdownMenu('howLongHaveBeenEmployed')}
              </DropdownButton>
            </ButtonGroup>

            <ButtonGroup className="m-4" >
              <label htmlFor="currentBodilyInjuryLimit" className="col-3 mr-5">What's your current bodily injury coverage limit?</label>
              <DropdownButton  className="ml-5 col-2 btn-block" id="currentBodilyInjuryLimit" title={currentBodilyInjuryLimit !== '' ? currentBodilyInjuryLimit : 'Pick One'} value={currentBodilyInjuryLimit}  >
              
                  {createDropdownMenu('currentBodilyInjuryLimit')}
              </DropdownButton>
            </ButtonGroup>

            <ToggleButtonGroup className="m-4  align-items-center" type="radio" name="beenCancelled" id="beenCancelled" onClick={handleChange} >
              <label htmlFor="beenCancelled" className="col-3 mr-5">Have you been cancelled for anything other than non-payment in the last 5 years?</label>
                    
                <ToggleButton className="ml-5 col-2" name="Yes" value="Yes" > Yes </ToggleButton>
                <ToggleButton className="ml-5 col-2" name="No" value="No" > No </ToggleButton>
                
            </ToggleButtonGroup>

            <hr />

            

            
              <Form.Group controlId="email" variant="large">
                <Form.Label>What's your email address?</Form.Label>
                <Form.Control
                  autoFocus
                  type="email"
                  value={email}
                  onChange={handleChange}
                />
             
              </Form.Group>

              <ButtonGroup className="m-4" >
                <label htmlFor="currentNumberOfResidents" className="col-3 mr-5">How many residents at your current location?</label>
                <DropdownButton  className="ml-5 col-2 btn-block" id="currentNumberOfResidents" title={currentNumberOfResidents !== '' ? currentNumberOfResidents : 'Pick One'} value={currentNumberOfResidents}  >
              
                  {createDropdownMenu('currentNumberOfResidents')}
              </DropdownButton>
            </ButtonGroup>

              <LoaderButton
                block
                className="btn-lg"
                disabled={!validateForm()}
                type="submit"
                isLoading={isLoading}
                text="Get My Quote!"
                loadingText="Getting Your Quote…"
                onClick={handleSubmit}
                />
            
          </div>


        );
    }
}

const stateToProps = state => {
    return {
  
    };
  };
  
  const dispatchToProps = dispatch => {
    return {
      submitFinalData: (formData) => dispatch(actions.actionSubmitFinalData(formData))
    };
  };

export default connect(stateToProps, dispatchToProps)(FinalInfo);