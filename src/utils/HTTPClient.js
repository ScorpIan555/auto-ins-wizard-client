import { Auth, API } from 'aws-amplify';

const postUser = user => {
  console.log('HTTPCLIENT.postUser -- log :::', user['username']);
  console.log('HTTPCLIENT.postUser -- log :::', user['password']);

  let username = user['username'];
  let password = user['password'];

  //   let us = user['username'];
  //   let pw = user['password'];

  //   console.log('username:::', us);
  //   console.log('password:::', pw);

  Auth.signUp({
    username,
    password
  })
    .then(data => {
      console.log('RETURNED COGNITO DATA!', data);
      return data;
    })
    .catch(err => console.log('ERR:::', err));
};

export default {
  postUser,
  postUserAsync: (pkg) => {
      console.log('postUser', postUser);
    return dispatch => postUser(pkg)
        .then(response => {
          console.log('response:::', response);
          if (pkg.actionType != null) {
            dispatch({
              type: pkg.actionType,
              data: response
            });
          }
          return response;
        })
        .catch(err => {
          console.log('postUserAsync.err:::', err);
          throw err;
        });
  }
};
