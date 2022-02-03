export const signIn = (credentials) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(() => {
        dispatch({ type: "LOGIN_SUCCESS" });
      })
      .catch((err) => {
        dispatch({ type: "LOGIN_ERROR", err });
      });
  };
};

export const signOut = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: "SIGNOUT_SUCCESS" });
      });
  };
};

export const signUp = (credentials, password) => {
  return (dispatch, getState, { getFirebase }) => {
    const firestore = getFirebase().firestore();
    const firebase = getFirebase();
    firebase
      .auth()
      .createUserWithEmailAndPassword(credentials.email, password)
      .then((userCredential) => {
        const uid = userCredential.user.uid;
        console.log(uid);
        firestore
          .collection("admin")
          .doc(uid)
          .set({
            ...credentials,
            authorised: false,
            superAdmin: false,
            disabled: false,
          });
        dispatch({ type: "REGISTER_SUCCESS" });
      })
      .catch((err) => {
        dispatch({ type: "REGISTER_ERROR", err });
      });
  };
};

export const passwordReset = (email) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        dispatch({ type: "PASSWORD_RESET_EMAIL_SEND_SUCCESS" });
      })
      .catch((err) => {
        dispatch({ type: "PASSWORD_RESET_EMAIL_SEND_ERROR", err });
      });
  };
};
