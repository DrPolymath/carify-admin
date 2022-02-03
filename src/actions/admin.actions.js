import { getAuth, deleteUser } from "firebase/auth";

export const updateAdmin = (admin) => {
  return (dispatch, getState, { getFirebase }) => {
    const firestore = getFirebase().firestore();
    firestore
      .collection("admin")
      .doc(admin.id)
      .set({
        ...admin,
      })
      .then(() => {
        dispatch({
          type: "UPDATE_ADMIN",
          admin,
        });
      })
      .catch((err) => {
        dispatch({
          type: "UPDATE_ADMIN_ERR",
          err,
        });
      });
  };
};

export const approveAdmin = (admin) => {
  return (dispatch, getState, { getFirebase }) => {
    console.log("masuk", admin);
    const firestore = getFirebase().firestore();
    firestore
      .collection("admin")
      .doc(admin.id)
      .set({
        ...admin,
        authorised: true,
      })
      .then(() => {
        dispatch({
          type: "APPROVE_ADMIN",
          admin,
        });
      })
      .catch((err) => {
        dispatch({
          type: "APPROVE_ADMIN_ERR",
          err,
        });
      });
  };
};

export const rejectAdmin = (admin) => {
  return (dispatch, getState, { getFirebase }) => {
    console.log("masuk", admin);
    const firestore = getFirebase().firestore();
    firestore
      .collection("admin")
      .doc(admin.id)
      .set({
        ...admin,
        authorised: false,
        disabled: true,
      })
      .then(() => {
        dispatch({
          type: "REJECT_ADMIN",
          admin,
        });
      })
      .catch((err) => {
        dispatch({
          type: "REJECT_ADMIN_ERR",
          err,
        });
      });
  };
};

export const disableAdmin = (admin) => {
  return (dispatch, getState, { getFirebase }) => {
    const firestore = getFirebase().firestore();
    firestore
      .collection("admin")
      .doc(admin.id)
      .set({
        ...admin,
        authorised: false,
        disabled: true,
        superAdmin: false,
      })
      .then(() => {
        dispatch({
          type: "DISABLE_ADMIN",
          admin,
        });
      })
      .catch((err) => {
        dispatch({
          type: "DISABLE_ADMIN_ERR",
          err,
        });
      });
  };
};

export const enableAdmin = (admin) => {
  return (dispatch, getState, { getFirebase }) => {
    const firestore = getFirebase().firestore();
    firestore
      .collection("admin")
      .doc(admin.id)
      .set({
        ...admin,
        authorised: true,
        disabled: false,
        superAdmin: false,
      })
      .then(() => {
        dispatch({
          type: "ENABLE_ADMIN",
          admin,
        });
      })
      .catch((err) => {
        dispatch({
          type: "ENABLE_ADMIN_ERR",
          err,
        });
      });
  };
};

export const deleteProfileAdmin = (profileInfo) => {
  return (dispatch, getState, { getFirebase }) => {
    const firestore = getFirebase().firestore();
    firestore
      .collection("admin")
      .doc(profileInfo.id)
      .delete()
      .then(() => {
        const auth = getAuth();
        const user = auth.currentUser;
        console.log(user)
        deleteUser(user);
        dispatch({
          type: "DELETE_ADMIN",
          profileInfo,
        });
      })
      .catch((err) => {
        dispatch({
          type: "DELETE_ADMIN_ERR",
          err,
        });
      });
  };
};
