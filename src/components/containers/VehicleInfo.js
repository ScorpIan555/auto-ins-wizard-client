import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { AutoToolUtil } from '../../utils';
import { AutoToolColumns, AdditionalVehicleDetails } from '../presentation';
import actions from '../../actions';

class VehicleInfo extends Component {
  // Initialize arrays used in respective YEAR/MAKE/MODEL <select> elements
  state = {
    year: [],
    make: [],
    model: [],
    bodyType: '',
    primaryUse: '',
    ownOrLease: '',
    isRidesharingChecked: false,
    hasAdvancedDriver: '',
    isLoading: false
  };
  
  componentDidUpdate = prevProps => {
    console.log('prevProps:::', prevProps);
    console.log('this.state:::', this.state);
  }

  // AutoTool container controls as parent fields in AutoToolColumns & AdditionalVehicleDetails presentation components
  handleChange = event => {
    console.log('event.target:::', event.target);
    console.log('event.target:::', event.target.value);
    // handle check/uncheck of the checkbox for whether user's vehicle is used in ridesharing (or not, default is false)
    if(event.target.id == "isRidesharingChecked" ) {
        this.setState({
            isRidesharingChecked: !this.state.isRidesharingChecked
        });
        return;
    }
    // handle check/uncheck of the checkbox for whether user's vehicle is used in ridesharing (or not, default is false)
    if(event.target.name == "hasAdvancedDriver" ) {
        this.setState({
            hasAdvancedDriver: event.target.value
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
    console.log('event:::', event);
       // prevent default submit event/action
      event.preventDefault();
      // trigger submit button's async-only state from initialization of async call until a value is returned
      this.setState({ isLoading: true });
      
      try {
        // destructure and assign from state object
        let { year, make, model, bodyType, primaryUse, hasAdvancedDriver, isRidesharingChecked, ownOrLease, lengthOfVehicleOwnership } = this.state;
        // set form data
        let formData = {
          year, make, model, bodyType, primaryUse, hasAdvancedDriver, isRidesharingChecked, ownOrLease, lengthOfVehicleOwnership
        };
        console.log('AutoTool.formData::::', formData);
        // async redux action call
        await this.props.submitVehicleData(formData);

      } catch (error) {
        alert(error);
      }
      // with async redux action/call now complete, exit loader button's async-only state
      this.setState({ isLoading: false });
      // navigate to 
      this.props.history.push('/get-your-quote/vehicle-info-review');
  }

  createYearTable = () => {
    // initialize empty array
    let table = [];
    // initialize & assign first model year to populate table
    let i = 2020;
    // populate table with years between 2020 and 1980
    for(i = 2020; i > 1979; i--) {
       table.push(
        <option key={i} value={i} >{i}</option>
      )
      // finish iteration and insert a choice for pre-1980 auto years
      if(i === 1980) {
        table.push(
          <option key={i + 100} value="Pre-1980" >Pre-1980</option>
        )
      }
    }
    // pass value of table at each iteration into the render 
    return table;
  }

  createMakeTable = () => {
    // this function is called once vehicle model year has been selected 
    if(this.state.year.length > 0) {
      let table = [];
      let { year } = this.state;
      // create array of vehicle models for 2nd column based on user's selected model year
      table = AutoToolUtil.makeHelper(year);
      // map over the table array to create the array that will be returned & 
      //   rendered in the model column 
      let makeTable = table.map((make, i) => {
        // return option elements to be rendered in <AutoTool />'s columns
        return <option key={i} value={make} >{make}</option>
      })
      // pass array to render() function
      return makeTable;
    }
  }

  createModelTable = () => {
    // this function is called once vehicle make & model year have been selected 
    if(this.state.make.length > 0) {
      let table = [];
      let { year, make } = this.state;
      // create array of vehicle models for 3rd column based on user's selected make & model year
      table = AutoToolUtil.modelHelper(year, make);
      // map over the table array to create the values that will be returned & 
      //   rendered in the model column 
      let modelTable = table.map((model, i) => {
        // return option elements to be rendered in <AutoTool />'s columns
        return <option key={i} value={model} >{model}</option>
      })
      // pass array to render() function
      return modelTable;
    }
  }

  render() {
    // className strings for <AutoToolColumn />'s below
    let parentClassNameValue = 'form-group col'; 
    let childClassNameValue = 'form-control';
    // destructure and assign state objects to be passed into child prop objects  (<AutoToolColumns />)
    let { year, make, model } = this.state;
    // destructure and assign state objects to be passed into child prop objects (<Additional Vehicle Details />)
    let { bodyType, primaryUse, ownOrLease, lengthOfVehicleOwnership, isLoading, isRidesharingChecked } = this.state;
    // destructure and assign class methods to be passed into child props objects
    let { handleChange, createYearTable, createMakeTable, createModelTable, handleSubmit } = this;
    // pass props to additional vehicle details 
    let addlVehicleDetailsChildProps = { bodyType, primaryUse, ownOrLease, lengthOfVehicleOwnership, handleChange, handleSubmit };

    return (
      <div>
        <div className="col-12 d-flex flex-row card mb-2">

          <AutoToolColumns 
            lableName="MODEL YEAR"
            id="year"
            parentClassName={parentClassNameValue}
            childClassName={childClassNameValue}
            value={year}
            handleChange={handleChange}
            createTable={createYearTable()}
          />

          <AutoToolColumns 
            lableName="MAKE"
            id="make"
            parentClassName={parentClassNameValue}
            childClassName={childClassNameValue}
            value={make}
            handleChange={handleChange}
            createTable={createMakeTable()}
          />

          <AutoToolColumns 
            lableName="MODEL"
            id="model"
            parentClassName={parentClassNameValue}
            childClassName={childClassNameValue}
            value={model}
            handleChange={handleChange}
            createTable={createModelTable()}
          />

        </div>

        { // conditionally render additional vehicle details form below 
          (this.state.model.length > 0) ? <AdditionalVehicleDetails childProps={addlVehicleDetailsChildProps} /> : null
        }
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
    submitVehicleData: (formData) => dispatch(actions.actionSubmitVehicleData(formData))
  };
};

export default connect(stateToProps, dispatchToProps)(VehicleInfo);
