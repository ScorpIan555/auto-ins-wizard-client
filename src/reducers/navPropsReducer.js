import constants from '../constants';

const initialState = {
  isAuthenticated: false,
  isAuthenticating: true,
  heroImage: 'heroWelcome'
};

console.log('userReducer.initialState', initialState);

export default (state = initialState, action) => {
  const newState = Object.assign({}, state);
  const payload = action.data;

  switch (action.type) {
    case constants.CHANGE_HERO_IMAGE:
      newState.heroImage = payload;
      console.log('TEST SUCCESS!', newState);

      return newState;

    default:
      return newState;
  }
};
