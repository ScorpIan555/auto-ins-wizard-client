import React, { Component } from 'react';
import { Dropdown, DropdownButton, InputGroup, ButtonGroup, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import { LoaderButton } from '.';

class AdditionalVehicleDetails extends Component {
    // initialize arrays used in respective form elements
    state = {};

    createDropdownMenu = nameOfDropdownMenu => {
        // array of vehicle body types
        let bodyTypeArray = [ '2 Door Coupe', '4 Door Sedan', '2 Door SUV', '4 Door SUV', 'Other/Not Listed'];
        // array of possible primary uses for customer's vehicle
        let primaryUseArray = ['Personal (to/from work, pleasure, errands)', 'Business (sales calls, business errands, driving clients)', 'Commercial (pizza delivery, snow plows, couriers, taxi)', 'Farming (agriculture, ranching)' ];
        // array of possible primary uses for customer's vehicle
        let ownOrLeaseArray = ['Finance', 'Own', 'Lease'];
        // array of length of vehicle ownership
        let lengthOfVehicleOwnershipArray = ['Less than 1 month', '1 month to 1 year', 'More than 1 year'];
        // deconstruct handleChange
        let { handleChange, handleSubmit } = this.props.childProps;

        // initialize empty array to be used in array mapping
        let arrayOfMenuItemValues = [];
        // assign empty array's values based on nameOfDropdownMenu parameter
        if(nameOfDropdownMenu === 'bodyType') {
            arrayOfMenuItemValues = bodyTypeArray;
        }
        if(nameOfDropdownMenu === 'primaryUse') {
            arrayOfMenuItemValues = primaryUseArray;
        }
        if(nameOfDropdownMenu === 'ownOrLease') {
            arrayOfMenuItemValues = ownOrLeaseArray;
        }
        if(nameOfDropdownMenu === 'lengthOfVehicleOwnership') {
            arrayOfMenuItemValues = lengthOfVehicleOwnershipArray;
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
        let { createDropdownMenu, validateForm } = this;
        // deconstruct state for value fields
        let { bodyType, primaryUse, ownOrLease, lengthOfVehicleOwnership, handleChange, handleSubmit, isLoading } = this.props.childProps;


        return (
            <div className="card justify-items-right" style={{"height": "700px"}}>
                
                <ButtonGroup className="m-4">
                    <label htmlFor="bodyType" className="col-3 mr-5">Body Type</label>
                    <div className="ml-5 col-2">
                        <DropdownButton className="btn-block" id="bodyType" title={bodyType !== '' ? bodyType : 'Body Type?'} value={bodyType} style={{"width": "45px"}} >
                            {createDropdownMenu('bodyType')}
                        </DropdownButton>
                    </div>
                   
                </ButtonGroup>

                <ButtonGroup className="m-4" >
                    <label htmlFor="primaryUse" className="col-3 mr-5">Primary Use</label>
                    <DropdownButton  className="ml-5 col-2 btn-block" id="primaryUse" title={primaryUse !== '' ? primaryUse : 'Primary Use?'} value={primaryUse}  >
                       {createDropdownMenu('primaryUse')}
                    </DropdownButton>
                </ButtonGroup>

                <InputGroup className="m-4">
                    <label htmlFor="isRidesharingChecked" className="col-3 mr-5">Is this vehicle also used for Ridsharing? </label>    
                    <div className="ml-5">
                        <InputGroup.Checkbox className="pl-5" aria-label="checkbox" id="isRidesharingChecked" onChange={handleChange} />
                    </div>
                </InputGroup>

                <ButtonGroup className="m-4">
                    <label htmlFor="ownOrLease" className="col-3 mr-5">Own or Lease?</label>
                    <DropdownButton  className="ml-5 col-2" id="ownOrLease" title={ownOrLease !== '' ? ownOrLease : 'Own or Lease?'} value={this.state.ownOrLease} >
                       {createDropdownMenu('ownOrLease')}
                    </DropdownButton>
                </ButtonGroup>

                <ButtonGroup className="m-4">
                    <label htmlFor="ownOrLease" className="col-3 mr-5">How long have you owned this vehicle?</label>
                    <DropdownButton  className="ml-5 col-2" id="lengthOfVehicleOwnership" title={lengthOfVehicleOwnership !== undefined ? lengthOfVehicleOwnership : 'Length of Ownership'} value={lengthOfVehicleOwnership} >
                       {createDropdownMenu('lengthOfVehicleOwnership')}
                    </DropdownButton>
                </ButtonGroup>

                {/* <DropdownButton className="m-4" title={lengthOfVehicleOwnership !== undefined ? lengthOfVehicleOwnership : 'Own or Lease?'} >
                    <Dropdown.Item as="button" className="ml-5 col-2" id="lengthOfVehicleOwnership" value={lengthOfVehicleOwnership}>
                        {createDropdownMenu('ownOrLeaseArray')}
                    </Dropdown.Item>
                </DropdownButton>
                 */}
                <ToggleButtonGroup className="m-4  align-items-center" type="radio" name="hasAdvancedDriver" id="hasAdvancedDriver" onClick={handleChange} >
                    <label htmlFor="hasAdvancedDriver" className="col-3 mr-5">Is your vehicle equipped with an automatic emergency braking (AEB) system?</label>
                    
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
        );
    }
}

export default AdditionalVehicleDetails;