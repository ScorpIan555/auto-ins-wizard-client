import React from 'react';
import { InputFormGroup, LoaderButton } from '.';
import style from '../../../public/scss/theme.scss';

export default childProps => {
  console.log('FormStepProps:::', childProps);

  let {
    // childProp properties
    isLoading,
    firstName,
    lastName,
    addressOne,
    city,
    stateOrCommonwealth,
    zipCode,
    birthday,
    // childProp methods
    handleChange,
    handleSubmit,
    validateForm
  } = childProps;

  if (childProps.location.pathname === '/get-your-quote/basic-info') {
    return (
      <div className="card col-12 col-md-8 order-md-1">
        <form className="row form-row needs-validation" onSubmit={handleSubmit}>
          <div className={`col-12 ${style.customFormHeader}`}>
            <h3 className="">Name & Birthdate</h3>
          </div>
          <div className="col-6">
            <InputFormGroup
              labelText="First Name: "
              type="text"
              name="firstName"
              id="firstName"
              value={firstName}
              onChange={handleChange}
            />
          </div>

          <div className="col-6">
            <InputFormGroup
              labelText="Last Name: "
              type="text"
              name="lastName"
              id="lastName"
              value={lastName}
              onChange={handleChange}
            />
          </div>

          <div className="col-6">
            <InputFormGroup
              labelText="Birthday: "
              type="date"
              name="birthday"
              id="birthday"
              value={birthday}
              onChange={handleChange}
            />
          </div>

          <div className={`col-12 ${style.customFormHeader}`}>
            <h3 className="custom-form-header">Mailing Address</h3>
          </div>

          <div className="col-12">
            <InputFormGroup
              labelText="Street Address: "
              type="text"
              name="addressOne"
              id="addressOne"
              value={addressOne}
              onChange={handleChange}
            />
          </div>

          <div className="col-7">
            <InputFormGroup
              labelText="City: "
              type="text"
              name="city"
              id="city"
              value={city}
              onChange={handleChange}
            />
          </div>

          <div className="col-2">
            <InputFormGroup
              labelText="State: "
              type="text"
              name="stateOrCommonwealth"
              id="stateOrCommonwealth"
              value={stateOrCommonwealth}
              onChange={handleChange}
            />
          </div>

          <div className="col-3">
            <InputFormGroup
              labelText="Zipcode: "
              type="number"
              name="zipCode"
              id="zipCode"
              value={zipCode}
              onChange={handleChange}
            />
          </div>

          <div className="col-12">
            <div className="form-group">
              <LoaderButton
                block
                className="btn-lg btn-secondary"
                type="submit"
                text="Save Changes"
                loadingText="Saving Your Changes..."
                disabled={!validateForm()}
                isLoading={isLoading}
                onClick={handleSubmit}
              >
                Save changes
              </LoaderButton>
            </div>
          </div>
        </form>
      </div>
    );
  }

  // if (childProps.location.pathname === '/get-your-quote/mailing-address') {
  //   return (
  //     <div className="card col-12 col-md-8 order-md-1">
  //       <form className="row form-row needs-validation">
  //         <div className="col-12">
  //           <InputFormGroup
  //             labelText="Street Address: "
  //             type="text"
  //             name="addressOne"
  //             id="addressOne"
  //             required
  //             value={addressOne}
  //             onChange={handleChange}
  //           />
  //         </div>

  //         <div className="col-7">
  //           <InputFormGroup
  //             labelText="City: "
  //             type="text"
  //             name="city"
  //             id="city"
  //             required
  //             value={city}
  //             onChange={handleChange}
  //           />
  //         </div>

  //         <div className="col-2">
  //           <InputFormGroup
  //             labelText="State: "
  //             type="text"
  //             name="stateOrCommonwealth"
  //             id="stateOrCommonwealth"
  //             required
  //             value={stateOrCommonwealth}
  //             onChange={handleChange}
  //           />
  //         </div>

  //         <div className="col-3">
  //           <InputFormGroup
  //             labelText="Zipcode: "
  //             type="number"
  //             name="zipCode"
  //             id="zipCode"
  //             required
  //             value={zipCode}
  //             onChange={handleChange}
  //           />
  //         </div>
  //       </form>
  //     </div>
  //   );
  // }

  return null;
};
