import React, { Component } from 'react';


class WelcomeInfo extends Component {
  render() {
    return (
      <div>
        <div className="navbar-container" />
        <div className="main-container">
          <section className="space-sm">
            <div className="container">
              <div className="row mb-4">
                <div className="col text-center">
                  <a href="#">
                    <img alt="Image" src="assets/img/logo-gray.svg" />
                  </a>
                </div>
              </div>
            </div>
            <nav aria-label="breadcrumb" role="navigation">
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-12 col-lg-10">
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item">
                        <a href="index.html">Home</a>
                      </li>
                      <li className="breadcrumb-item">
                        <a href="pages-app.html">App Pages</a>
                      </li>

                      <li
                        className="breadcrumb-item active"
                        aria-current="page"
                      >
                        Wizard Onboarding
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            </nav>
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-12 col-lg-10">
                  <div className="card card-lg">
                    <div className="card-body">
                      <form className="wizard">
                        <ul className="nav nav-tabs text-center row justify-content-center">
                          <li className="col-3 col-md-2">
                            <a
                              href="#first"
                              className="step-circle step-circle-sm"
                            >
                              1
                            </a>
                          </li>
                          <li className="col-3 col-md-2">
                            <a
                              href="#second"
                              className="step-circle step-circle-sm"
                            >
                              2
                            </a>
                          </li>
                          <li className="col-3 col-md-2">
                            <a
                              href="#third"
                              className="step-circle step-circle-sm"
                            >
                              3
                            </a>
                          </li>
                          <li className="col-3 col-md-2">
                            <a
                              href="#fourth"
                              className="step-circle step-circle-sm"
                            >
                              4
                            </a>
                          </li>
                        </ul>
                        <div className="tab-content">
                          <div id="first">
                            <div className="row justify-content-around align-items-center">
                              <div className="col-8 col-md-6 col-lg-4 mb-4">
                                <img
                                  alt="Image"
                                  src="assets/img/graphic-man-box.svg"
                                  className="w-100"
                                />
                              </div>

                              <div className="col-12 col-md-6 col-lg-5 mb-4">
                                <div>
                                  <h6 className="title-decorative mb-2">
                                    Step 1.
                                  </h6>
                                  <h4 className="mb-2">Enter some text</h4>
                                  <p>
                                    This is especially important so make it
                                    memorable
                                  </p>
                                  <div className="form-group">
                                    <input
                                      type="text"
                                      placeholder="Eg: 'Pumpernickel'"
                                      name="name"
                                      className="form-control form-control-lg"
                                    />
                                  </div>
                                </div>
                                <button
                                  className="btn btn-success sw-btn-next"
                                  type="button"
                                >
                                  Next Step
                                </button>
                              </div>
                            </div>
                          </div>
                          <div id="second">
                            <div className="row justify-content-around align-items-center">
                              <div className="col-8 col-md-6 col-lg-4 mb-4">
                                <img
                                  alt="Image"
                                  src="assets/img/graphic-woman-writing.svg"
                                  className="w-100"
                                />
                              </div>

                              <div className="col-12 col-md-6 col-lg-5 mb-4">
                                <div>
                                  <h6 className="title-decorative mb-2">
                                    Step 2.
                                  </h6>
                                  <h4>Flick some switches</h4>
                                  <div>
                                    <div className="custom-control custom-switch">
                                      <input
                                        type="checkbox"
                                        className="custom-control-input"
                                        id="box-1"
                                      />
                                      <label
                                        className="custom-control-label"
                                        htmlFor="box-1"
                                      >
                                        Photography
                                      </label>
                                    </div>
                                  </div>
                                  <div>
                                    <div className="custom-control custom-switch">
                                      <input
                                        type="checkbox"
                                        className="custom-control-input"
                                        id="box-2"
                                      />
                                      <label
                                        className="custom-control-label"
                                        htmlFor="box-2"
                                      >
                                        Graphic Design
                                      </label>
                                    </div>
                                  </div>
                                  <div>
                                    <div className="custom-control custom-switch">
                                      <input
                                        type="checkbox"
                                        className="custom-control-input"
                                        id="box-3"
                                      />
                                      <label
                                        className="custom-control-label"
                                        htmlFor="box-3"
                                      >
                                        Website Design
                                      </label>
                                    </div>
                                  </div>
                                </div>
                                <button
                                  className="btn btn-success sw-btn-next mt-4"
                                  type="button"
                                >
                                  Next Step
                                </button>
                              </div>
                            </div>
                          </div>
                          <div id="third">
                            <div className="row justify-content-around align-items-center">
                              <div className="col-8 col-md-6 col-lg-4 mb-4">
                                <img
                                  alt="Image"
                                  src="assets/img/graphic-woman-writing-2.svg"
                                  className="w-100"
                                />
                              </div>

                              <div className="col-12 col-md-6 col-lg-5 mb-4">
                                <div>
                                  <h6 className="title-decorative mb-2">
                                    Step 3.
                                  </h6>
                                  <h4>Select an option</h4>
                                  <div>
                                    <div className="custom-control custom-radio">
                                      <input
                                        type="radio"
                                        className="custom-control-input"
                                        value="notify-daily"
                                        name="notify-frequency"
                                        id="notify-daily"
                                      />
                                      <label
                                        className="custom-control-label"
                                        htmlFor="notify-daily"
                                      >
                                        Daily
                                      </label>
                                    </div>
                                  </div>
                                  <div>
                                    <div className="custom-control custom-radio">
                                      <input
                                        type="radio"
                                        className="custom-control-input"
                                        value="notify-weekly"
                                        name="notify-frequency"
                                        checked
                                        id="notify-weekly"
                                      />
                                      <label
                                        className="custom-control-label"
                                        htmlFor="notify-weekly"
                                      >
                                        Weekly
                                      </label>
                                    </div>
                                  </div>
                                  <div>
                                    <div className="custom-control custom-radio">
                                      <input
                                        type="checkbox"
                                        className="custom-control-input"
                                        id="box-1"
                                      />
                                      <input
                                        type="radio"
                                        className="custom-control-input"
                                        value="notify-monthly"
                                        name="notify-frequency"
                                        id="notify-monthly"
                                      />
                                      <label
                                        className="custom-control-label"
                                        htmlFor="notify-monthly"
                                      >
                                        Monthly
                                      </label>
                                    </div>
                                  </div>
                                </div>
                                <button
                                  className="btn btn-success sw-btn-next mt-4"
                                  type="button"
                                >
                                  Next Step
                                </button>
                              </div>
                            </div>
                          </div>
                          <div id="fourth">
                            <div className="row justify-content-around align-items-center">
                              <div className="col-8 col-md-6 col-lg-5 mb-4">
                                <img
                                  alt="Image"
                                  src="assets/img/graphic-man-computer.svg"
                                  className="w-100"
                                />
                              </div>

                              <div className="col-12 col-md-6 col-lg-5 mb-4">
                                <div>
                                  <h6 className="title-decorative mb-2">
                                    Step 4.
                                  </h6>
                                  <h4 className="mb-2">You're all set</h4>
                                  <p>
                                    Well done, you've completed the process,
                                    just hit the button below to change the
                                    world.
                                  </p>
                                </div>
                                <button
                                  className="btn btn-success btn-lg mt-4"
                                  type="submit"
                                >
                                  Create Greatness
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="text-center">
                    <span className="text-small">
                      Already down with the basics? <a href="#">Skip this</a>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default WelcomeInfo;
