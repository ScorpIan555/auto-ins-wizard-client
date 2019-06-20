import React, { Component } from "react";
import { connect } from 'react-redux';
import actions from '../../actions';
import { Dropdown, DropdownButton, ButtonGroup, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import { LoaderButton } from '../presentation';

class DriverInfo extends Component {
    state = {
        isLoading: false,
        gender: '',
        maritalStatus: '',
        educationLevel: '',
        employmentStatus: '',
        primaryResidence: '',
        haveMoved: '',
        licenseStatus: '',
        yearsLicensed: '',
        accidentsClaimsOrOtherDamage: '',
        ticketsOrViolations: ''
    };

    // AutoTool container controls as parent fields in AutoToolColumns & AdditionalVehicleDetails presentation components
    handleChange = event => {
        console.log('event.target:::', event.target);
        console.log('event.target:::', event.target.value);
        // handle check/uncheck of the checkbox for whether user's vehicle is used in ridesharing (or not, default is false)
        if(event.target.name == "haveMoved" ) {
            this.setState({
                haveMoved: event.target.value
            });
            return;
        }
        // handle check/uncheck of the checkbox for whether user's had an accident or other claim
        if(event.target.name == "accidentsClaimsOrOtherDamage" ) {
            this.setState({
                accidentsClaimsOrOtherDamage: event.target.value
            });
            return;
        }
        // handle check/uncheck of the checkbox for whether user's had tickets or violations
        if(event.target.name == "ticketsOrViolations" ) {
            this.setState({
                ticketsOrViolations: event.target.value
            });
            return;
        }
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
            let { gender, maritalStatus, educationLevel, employmentStatus, haveMoved, licenseStatus, primaryResidence, yearsLicensed, accidentsClaimsOrOtherDamage, ticketsOrViolations } = this.state;
            // set form data
            let formData = {
                gender, maritalStatus, educationLevel, employmentStatus, haveMoved, licenseStatus, primaryResidence, yearsLicensed, accidentsClaimsOrOtherDamage, ticketsOrViolations
            };
            console.log('AutoTool.formData::::', formData);
            // async redux action call
            await this.props.submitDriverData(formData);

        } catch (error) {
            alert(error);
        }
        // with async redux action/call now complete, exit loader button's async-only state
        this.setState({ isLoading: false });
        // navigate to 
        this.props.history.push("/get-your-quote/driver-info-review");
    }

    createDropdownMenu = nameOfDropdownMenu => {
        // destructure class methods
        let { handleChange } = this;
        // array of genders
        let genderArray = [ 'Male', 'Female', 'Non-binary', 'Other', 'Prefer not to identify' ];
        // array of martial statuses
        let maritalStatusArray = [ 'Single', 'Married', 'Separated', 'Divorced', 'Other/Not Listed', 'Other Unspecified State of Resentfulness'];
        // array of highest level of education attained
        let educationLevelArray = [ 'No high school diploma or GED', 'High School Diploma or GED', 'Vocational Training/Associate\'s Degree/Military Training', 'Currently in College', 'College Degree', 'Post-Graduate Degree', 'The education system is corrupt/YouTube Conspiracy Theories' ];
        // array of employment statuses
        let employmentStatusArray = [ 'Employed', 'Homemaker (full-time)', 'Retired', 'Student (full-time)', 'Not Working/Other' ];
        // array of primary residence options
        let primaryResidenceArray = [ 'Own Home', 'Own Condo', 'Own Mobile/Manufactured Home', 'Rent', 'Other' ];
        // array of license statuses
        let licenseStatusArray = [ 'Valid', 'Permit', 'Suspended', 'Permanently Revoked', 'Expired', 'Commercial', 'Other' ];
        // array of years licensed options
        let yearsLicensedArray = ['3 or more', 'More than 1 but less than 3', 'Less than 1'];

        // initialize empty array to be used in array mapping
        let arrayOfMenuItemValues = [];
        // assign empty array's values based on nameOfDropdownMenu parameter
        if(nameOfDropdownMenu === 'gender') {
            arrayOfMenuItemValues = genderArray;
        }
        if(nameOfDropdownMenu === 'maritalStatus') {
            arrayOfMenuItemValues = maritalStatusArray;
        }
        if(nameOfDropdownMenu === 'educationLevel') {
            arrayOfMenuItemValues = educationLevelArray;
        }
        if(nameOfDropdownMenu === 'employmentStatus') {
            arrayOfMenuItemValues = employmentStatusArray;
        }
        if(nameOfDropdownMenu === 'primaryResidence') {
            arrayOfMenuItemValues = primaryResidenceArray;
        }
        if(nameOfDropdownMenu === 'licenseStatus') {
            arrayOfMenuItemValues = licenseStatusArray;
        }
        if(nameOfDropdownMenu === 'yearsLicensed') {
            arrayOfMenuItemValues = yearsLicensedArray;
        }

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
        let { isLoading, gender, maritalStatus, educationLevel, employmentStatus, licenseStatus, primaryResidence, yearsLicensed, accidentsClaimsOrOtherDamage, ticketsOrViolations } = this.state;
        
        return(
            <div className="col-12 d-flex flex-row card mb-2">
                <div className="card col-12 col-md-8 order-md-1">
                
                <ButtonGroup className="m-4" >
                    <label htmlFor="gender" className="col-3 mr-5">Gender</label>
                    <DropdownButton  className="ml-5 col-2 btn-block" id="gender" title={gender !== '' ? gender : 'Gender'} value={gender}  >
                       {createDropdownMenu('gender')}
                    </DropdownButton>
                </ButtonGroup>

                <ButtonGroup className="m-4" >
                    <label htmlFor="maritalStatus" className="col-3 mr-5">Marital Status</label>
                    <DropdownButton  className="ml-5 col-2 btn-block" id="maritalStatus" title={maritalStatus !== '' ? maritalStatus : 'Marital Status'} value={maritalStatus}  >
                       {createDropdownMenu('maritalStatus')}
                    </DropdownButton>
                </ButtonGroup>

                <ButtonGroup className="m-4" >
                    <label htmlFor="educationLevel" className="col-3 mr-5">Highest level of education completed?</label>
                    <DropdownButton  className="ml-5 col-2 btn-block" id="educationLevel" title={educationLevel !== '' ? educationLevel : 'Education Level'} value={educationLevel}  >
                       {createDropdownMenu('educationLevel')}
                    </DropdownButton>
                </ButtonGroup>

                <ButtonGroup className="m-4" >
                    <label htmlFor="employmentStatus" className="col-3 mr-5">Employment Status</label>
                    <DropdownButton  className="ml-5 col-2 btn-block" id="employmentStatus" title={employmentStatus !== '' ? employmentStatus : 'Employment Status'} value={employmentStatus}  >
                       {createDropdownMenu('employmentStatus')}
                    </DropdownButton>
                </ButtonGroup>

                <hr />

                <h3>Residency</h3>
                <ButtonGroup className="m-4" >
                    <label htmlFor="primaryResidence" className="col-3 mr-5">Primary Residence</label>
                    <DropdownButton  className="ml-5 col-2 btn-block" id="primaryResidence" title={primaryResidence !== '' ? primaryResidence : 'Primary Residence'} value={primaryResidence}  >
                       {createDropdownMenu('primaryResidence')}
                    </DropdownButton>
                </ButtonGroup>


                <ToggleButtonGroup className="m-4  align-items-center" type="radio" name="haveMoved" id="haveMoved" onClick={handleChange} >
                    <label htmlFor="haveMoved" className="col-3 mr-5">Moved in the last 2 months?</label>
                    
                    <ToggleButton className="ml-5 col-2" name="Yes" value="Yes" > Yes </ToggleButton>
                    <ToggleButton className="ml-5 col-2" name="No" value="No" > No </ToggleButton>
                
                </ToggleButtonGroup>

                
                <hr />

                <h3>Driving History</h3>
                <ButtonGroup className="m-4" >
                    <label htmlFor="licenseStatus" className="col-3 mr-5">US License Status</label>
                    <DropdownButton  className="ml-5 col-2 btn-block" id="licenseStatus" title={licenseStatus !== '' ? licenseStatus : 'License Status'} value={licenseStatus}  >
                       {createDropdownMenu('licenseStatus')}
                    </DropdownButton>
                </ButtonGroup>

                <ButtonGroup className="m-4" >
                    <label htmlFor="yearsLicensed" className="col-3 mr-5">Years Licensed</label>
                    <DropdownButton  className="ml-5 col-2 btn-block" id="yearsLicensed" title={yearsLicensed !== '' ? yearsLicensed : 'Years Licensed'} value={yearsLicensed}  >
                       {createDropdownMenu('yearsLicensed')}
                    </DropdownButton>
                </ButtonGroup>



                <h4>In the last 5 years, since -- insert date here -- have you had any (regardless of fault)</h4>
                <ToggleButtonGroup className="m-4  align-items-center" type="radio" name="accidentsClaimsOrOtherDamage" id="accidentsClaimsOrOtherDamage" onClick={handleChange} >
                    <label htmlFor="accidentsClaimsOrOtherDamage" className="col-3 mr-5"> Accidents, claims, or other damages to a vehicle?></label>
                    
                    <ToggleButton className="ml-5 col-2" name="Yes" value="Yes" > Yes </ToggleButton>
                    <ToggleButton className="ml-5 col-2" name="No" value="No" > No </ToggleButton>
                
                </ToggleButtonGroup>

                <ToggleButtonGroup className="m-4  align-items-center" type="radio" name="ticketsOrViolations" id="ticketsOrViolations" onClick={handleChange} >
                    <label htmlFor="ticketsOrViolations" className="col-3 mr-5">Tickets or Violations?</label>
                    
                    <ToggleButton className="ml-5 col-2" name="Yes" value="Yes" > Yes </ToggleButton>
                    <ToggleButton className="ml-5 col-2" name="No" value="No" > No </ToggleButton>
                
                </ToggleButtonGroup>

                <div >
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
      submitDriverData: (formData) => dispatch(actions.actionSubmitDriverData(formData))
    };
  };
  

export default connect(stateToProps, dispatchToProps)(DriverInfo);