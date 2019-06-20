import { hot } from 'react-hot-loader/root';
import React, { Component, Fragment } from "react";
import Routes from "./Routes"
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { Nav } from './components/presentation';
import actions from './actions';
import style from '../public/scss/theme.scss';
import { Auth } from 'aws-amplify';

class App extends Component {
  constructor(props) {
  super(props);

  this.state = {
    isAuthenticated: false,
    isAuthenticating: true,
    heroImage: this.props.heroImage
    };
  }

  async componentDidMount() {
    console.log('<App /> did mount, show me the props:::', this.props);
    console.log('<App /> did mount, show me the props:::', this.state);
    console.log('componentDidMount.location.pathname', this.props.location);
    // if(this.props.location.pathname === '/get-quote-form') {
    //   return this.props.changeHeroImage('heroForm');
    // } 

    try {
      await Auth.currentSession();
      await this.props.getCurrentUser();
      this.userHasAuthenticated(true);
    }
    catch(e) {
      if (e !== 'No current user') {
        alert(e);
      }
    }

    this.setState({ isAuthenticating: false });
  }

  componentDidUpdate = prevProps => {
    console.log('App.prevProps', prevProps);
    console.log('App.this.props', this.props);

    if(this.props.heroImage != this.state.heroImage) {
      this.setState({
        heroImage: this.props.heroImage
      });
    }
  }


  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  }

  handleLogout = async event => {
    // await Auth.signOut();
    await this.props.signOutUser();

    this.userHasAuthenticated(false);

    this.props.history.push("/login");
  }


  render() {
    // props for route rendering
    const childProps = {
      userHasAuthenticated: this.userHasAuthenticated,
      isAuthenticated: this.state.isAuthenticated,
    };
    // props for nav rendering
    const navProps = {
      handleLogout: this.handleLogout,
      isAuthenticated: this.state.isAuthenticated
    };

    // let hero = {} || null;
    // const heroImage = this.props.heroImage;
    // this.chooseHero(heroImage, hero);
    

    // console.log('styleProps:::', heroImage);
    // console.log('style.heroImage:::', style[heroImage]);
    // console.log('hero', hero);
      console.log('style object::::', style);

    // if(this.state.heroImage === 'heroWelcome') {
      return (

        // render should occur after async authentication calls return values
        !this.state.isAuthenticating && 
        // render hero image on welcome page
        // <div className={style.heroWelcome}>

        <div>
          <Routes childProps={childProps} />
        </div>
          
          // <Nav navProps={navProps} />
          
        //   {/* <div className="main-container"> */}
        //     <Routes childProps={childProps} />
        //   {/* </div> */}
        // // </div>
      );
    // } 

    // if(this.state.heroImage === 'heroForm') {
    //   return (
    //     // render should occur after async authentication calls return values
    //     !this.state.isAuthenticating && 
    //     // render hero image on welcome page
    //     <div className={style.heroForm}>
          
    //       <Nav navProps={navProps} />
          
    //       <div className="main-container">
    //         <Routes childProps={childProps} />
    //       </div>
    //     </div>
    //   );
    // }
  }
}

const stateToProps = (state) => {
  return {
    genericState: state,
    user: state.user,
    zipCode: state.unauthenticatedSessionData.zipCode,
    heroImage: state.nav.heroImage,
    isAuthenticated: state.nav.isAuthenticated,
    isAuthenticating: state.nav.isAuthenticating
  }
}

const dispatchToProps = (dispatch) => {
  return {
    getCurrentUser: () => dispatch(actions.actionGetCurrentUser()),
    signOutUser: () => dispatch(actions.actionSignOutUser()),
    changeHeroImage: (heroImage) => dispatch(actions.actionChangeHeroImage(heroImage))
  }
}

export default hot(withRouter(connect(stateToProps, dispatchToProps)(App)));
