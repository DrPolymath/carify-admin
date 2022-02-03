import { storage } from "../config/fbConfig";

export const addCarBrand = (carBrand) => {
  return (dispatch, getState, { getFirebase }) => {
    const firestore = getFirebase().firestore();
    const profile = getState().firebase.profile;
    firestore
      .collection("carBrand")
      .add({
        carBrandName: carBrand.carBrandName,
        url: carBrand.url,
      })
      .then(() => {
        firestore.collection("activityLog").add({
          username: profile.username,
          email: profile.email,
          activity: "Add",
          description: "Add " + carBrand.carBrandName + " into car brand",
          timestamp: new Date(),
        });

        dispatch({
          type: "ADD_CAR_BRAND",
          carBrand,
        });
      })
      .catch((err) => {
        dispatch({
          type: "ADD_CAR_BRAND_ERR",
          err,
        });
      });
  };
};

export const updateCarBrand = (carBrand, url) => {
  return (dispatch, getState, { getFirebase }) => {
    const firestore = getFirebase().firestore();
    const profile = getState().firebase.profile;
    firestore
      .collection("carBrand")
      .doc(carBrand.id)
      .set(
        {
          ...carBrand,
          carBrandName: carBrand.carBrandName,
          url: url,
        },
        { merge: true }
      )
      .then(() => {
        firestore.collection("activityLog").add({
          username: profile.username,
          email: profile.email,
          activity: "Update",
          description: "Update " + carBrand.carBrandName,
          timestamp: new Date(),
        });

        dispatch({
          type: "UPDATE_CAR_BRAND",
          carBrand,
        });
      })
      .catch((err) => {
        dispatch({
          type: "UPDATE_CAR_BRAND_ERR",
          err,
        });
      });
  };
};

export const deleteCarBrand = (carBrand) => {
  return (dispatch, getState, { getFirebase }) => {
    const firestore = getFirebase().firestore();
    const profile = getState().firebase.profile;
    firestore
      .collection("carBrand")
      .doc(carBrand.id)
      .delete()
      .then(() => {
        var fileRef = storage.refFromURL(carBrand.url);

        // console.log("File in database before delete exists : "
        //         + fileRef.exists())

        // Delete the file using the delete() method
        fileRef
          .delete()
          .then(function () {
            firestore.collection("activityLog").add({
              username: profile.username,
              email: profile.email,
              activity: "Delete",
              description:
                "Delete " + carBrand.carBrandName + " from car brand",
              timestamp: new Date(),
            });

            dispatch({
              type: "DELETE_CAR_BRAND",
            });
          })
          .catch(function (error) {
            console.log(error);
          });
      })
      .catch((err) => {
        dispatch({
          type: "DELETE_CAR_BRAND_ERR",
          err,
        });
      });
  };
};
