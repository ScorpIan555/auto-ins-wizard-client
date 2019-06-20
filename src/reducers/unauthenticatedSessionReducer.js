import constants from '../constants';

const initialState = [];

console.log('userReducer.initialState', initialState);

export default (state = initialState, action) => {
  const newState = Object.assign({}, state);
  const payload = action.data;

  switch (action.type) {
    case constants.SUBMIT_USER_WELCOME_DATA:
      newState.zipCode = payload;
      console.log('TEST SUCCESS!', newState);

      return newState;

    case constants.SUBMIT_ADDRESS_FORM_DATA:
      newState.addressFormData = payload;
      let { addressFormData } = newState;
      console.log('ADDRESS FORM DATA :::', addressFormData);

      return newState;

    case constants.SUBMIT_VEHICLE_FORM_DATA:
      newState.vehicleFormData = payload;
      let { vehicleFormData } = newState;
      console.log('VEHICLE FORM DATA:::', vehicleFormData);

      return newState;

    case constants.SUBMIT_DRIVER_FORM_DATA:
      newState.driverFormData = payload;
      let { driverFormData } = newState;
      console.log('VEHICLE FORM DATA:::', driverFormData);

      return newState;

    default:
      return newState;
  }
};
