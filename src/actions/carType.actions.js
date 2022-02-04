import { storage } from "../config/fbConfig";

export const addCarType = (carType) => {
  return (dispatch, getState, { getFirebase }) => {
    const firestore = getFirebase().firestore();
    const profile = getState().firebase.profile;
    firestore
      .collection("carType")
      .add({
        carTypeName: carType.carTypeName,
        url: carType.url,
      })
      .then(() => {
        firestore.collection("activityLog").add({
          username: profile.username,
          email: profile.email,
          activity: "Add",
          description: "Add " + carType.carTypeName + " into car type",
          timestamp: new Date(),
        });

        dispatch({
          type: "ADD_CAR_TYPE",
          carType,
        });
      })
      .catch((err) => {
        dispatch({
          type: "ADD_CAR_TYPE_ERR",
          err,
        });
      });
  };
};

export const updateCarType = (carType, url) => {
  return (dispatch, getState, { getFirebase }) => {
    const firestore = getFirebase().firestore();
    const profile = getState().firebase.profile;
    if (url === "") {
        firestore
        .collection("carType")
        .doc(carType.id)
        .set(
          {
            carTypeName: carType.carTypeName,
          },
          { merge: true }
        )
        .then(() => {
          firestore.collection("activityLog").add({
            username: profile.username,
            email: profile.email,
            activity: "Update",
            description: "Update a car type",
            timestamp: new Date(),
          });

          dispatch({
            type: "UPDATE_CAR_TYPE",
            carType,
          });
        })
        .catch((err) => {
          dispatch({
            type: "UPDATE_CAR_TYPE_ERR",
            err,
          });
        });
    } else {
      firestore
        .collection("carType")
        .doc(carType.id)
        .set(
          {
            carTypeName: carType.carTypeName,
            url: url,
          },
          { merge: true }
        )
        .then(() => {
          firestore.collection("activityLog").add({
            username: profile.username,
            email: profile.email,
            activity: "Update",
            description: "Update a car type",
            timestamp: new Date(),
          });

          dispatch({
            type: "UPDATE_CAR_TYPE",
            carType,
          });
        })
        .catch((err) => {
          dispatch({
            type: "UPDATE_CAR_TYPE_ERR",
            err,
          });
        });
    }
  };
};

export const deleteCarType = (carType) => {
  return (dispatch, getState, { getFirebase }) => {
    const firestore = getFirebase().firestore();
    const profile = getState().firebase.profile;
    const logDeleteCarType = (firestore, carType, profile) => {
      firestore.collection("activityLog").add({
        username: profile.username,
        email: profile.email,
        activity: "Delete",
        description: "Delete " + carType.carTypeName + " from car type",
        timestamp: new Date(),
      });

      dispatch({
        type: "DELETE_CAR_TYPE",
      });
    };
    firestore
      .collection("carType")
      .doc(carType.id)
      .delete()
      .then(() => {
        if (carType.url) {
          var fileRef = storage.refFromURL(carType.url);
          fileRef
            .delete()
            .then(function () {
              logDeleteCarType(firestore, carType, profile);
            })
            .catch(function (error) {
              console.log(error);
            });
        } else {
          logDeleteCarType(firestore, carType, profile);
        }
      })
      .catch((err) => {
        dispatch({
          type: "DELETE_CAR_TYPE_ERR",
          err,
        });
      });
  };
};
