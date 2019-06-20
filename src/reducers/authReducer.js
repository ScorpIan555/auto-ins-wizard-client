import constants from '../constants';

const initialState = {
  isAuthenticated: false,
  isAuthenticating: true,
  isWelcome: true
  };

console.log('userReducer.initialState', initialState);

export default (state = initialState, action) => {
  console.log('userReducer.action!!!!', action);
  const newState = Object.assign({}, state);
  const payload = action.data;

  switch (action.type) {
    case constants.TOGGLE_IS_WELCOME_BOOLEAN:
      newState.boolean = payload;
      console.log('TEST SUCCESS!', newState);

      return newState;

    default:
      return newState;
  }
};
