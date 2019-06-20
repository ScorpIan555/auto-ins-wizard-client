import React, {Component} from 'react';
import style from '../../../public/scss/theme.scss';


class StatusBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      barProgress: '25%'
    };
  };

  componentDidMount = () => {
    let loc = this.props.historyLocation;
    console.log('loc::::', loc);
    this.barProgress(loc)
  }

  componentDidUpdate = (prevProps) => {
    console.log('prevProps:::', prevProps);
    let loc = this.props.historyLocation;
    if(loc != prevProps.historyLocation) {
      this.barProgress(loc)
    }
    console.log('loc::::', loc);    
  }

  barProgress = (loc) => {
    let whichStep = {};
    // Step 1
    // At initial rendering of the user input workflow
    if(loc === '/get-your-quote/basic-info') {
      whichStep = '25%'
      this.setState({
        barProgress: whichStep
      });
      return 
    }
    // Step 2
    // At user input of vehicle info via auto tool component
    if(loc === '/get-your-quote/vehicle-info') {
      whichStep = '50%'
      this.setState({
        barProgress: whichStep
      });
      return 
    }
    // Step 3
    // Driver info
    if(loc === '/get-your-quote/driver-info') {
      whichStep = '75%'
      this.setState({
        barProgress: whichStep
      });
      return 
    }
    // Step 4
    // Final info
    if(loc === '/get-your-quote/final-info') {
      whichStep = '100%'
      this.setState({
        barProgress: whichStep
      });
      return 
    }
  }

  render() {
    return (
      <div className="col">
        <section className="bg-white space-sm flush-with-above">
          <div className="container">
            <div className="row mb-3">
              <div className="col">
                <div className="progress">
                  <div
                    className="progress-bar bg-success opacity-50"
                    style={{"width" : `${this.state.barProgress}`}}
                    role="progressbar"
                    aria-valuenow="15"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  />
                  <div
                    className={`progress-bar bg-success ${
                      style.customFormHeader
                    }`}
                    role="progressbar"
                    aria-valuenow="30"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  />
                </div>
              </div>
            </div>
  
            <div className="row text-center">
              <div className="col opacity-50">
                <span>Basic Info</span>
                <br />
                <small className="text-muted">
                  <i className="icon-check mr-1" />
                  We just need some basic info to get started
                </small>
              </div>
  
              <div className="col">
                <span>Vehicle Info</span>
                <br />
                <small className="text-muted">
                  <i className="icon-calendar mr-1" />
                  Could you tell us something about your vehicle?
                </small>
              </div>
  
              <div className="col">
                <span>Personal Info</span>
                <br />
                <small className="text-muted">
                  <i className="icon-calendar mr-1" />
                  Could we get some details about the driver?
                </small>
              </div>
  
              <div className="col">
                <span>Let's wrap it up!</span>
                <br />
                <small className="text-muted">
                  <i className="icon-calendar mr-1" />
                  Get your quote!!!!
                </small>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

}

export default StatusBar;
