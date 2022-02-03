export const addTransmission = (carVariant, transmissions) => {
  return (dispatch, getState, { getFirebase }) => {
    const firestore = getFirebase().firestore();
    const profile = getState().firebase.profile;
    firestore
      .collection("carBrand")
      .doc(carVariant.cbId)
      .collection("carModel")
      .doc(carVariant.cmId)
      .collection("carVariant")
      .doc(carVariant.id)
      .collection("transmission")
      .add({
        ...transmissions,
        vId: carVariant.id,
      })
      .then(() => {
        firestore.collection("activityLog").add({
          username: profile.username,
          email: profile.email,
          activity: "Add",
          description:
            "Add " +
            carVariant.carBrandName +
            " " +
            carVariant.carModelName +
            " " +
            carVariant.carVariantName +
            " transmission details",
          timestamp: new Date(),
        });

        dispatch({
          type: "ADD_TRANSMISSION_DETAIL",
          transmissions,
        });
      })
      .catch((err) => {
        dispatch({
          type: "ADD_TRANSMISSION_DETAIL_ERR",
          err,
        });
      });
  };
};

export const updateTransmission = (carVariant, transmission) => {
  return (dispatch, getState, { getFirebase }) => {
    const firestore = getFirebase().firestore();
    const profile = getState().firebase.profile;
    firestore
      .collection("carBrand")
      .doc(carVariant.cbId)
      .collection("carModel")
      .doc(carVariant.cmId)
      .collection("carVariant")
      .doc(carVariant.id)
      .collection("transmission")
      .doc(transmission.id)
      .set({
        ...transmission,
      })
      .then(() => {
        firestore.collection("activityLog").add({
          username: profile.username,
          email: profile.email,
          activity: "Update",
          description:
            "Update " +
            carVariant.carBrandName +
            " " +
            carVariant.carModelName +
            " " +
            carVariant.carVariantName +
            " transmission details",
          timestamp: new Date(),
        });

        dispatch({
          type: "UPDATE_TRANSMISSION_DETAIL",
          transmission,
        });
      })
      .catch((err) => {
        dispatch({
          type: "UPDATE_TRANSMISSION_DETAIL_ERR",
          err,
        });
      });
  };
};

export const deleteTransmission = (carVariant, transmission) => {
  return (dispatch, getState, { getFirebase }) => {
    const firestore = getFirebase().firestore();
    const profile = getState().firebase.profile;
    firestore
      .collection("carBrand")
      .doc(carVariant.cbId)
      .collection("carModel")
      .doc(carVariant.cmId)
      .collection("carVariant")
      .doc(carVariant.id)
      .collection("transmission")
      .doc(transmission.id)
      .delete()
      .then(() => {
        firestore.collection("activityLog").add({
          username: profile.username,
          email: profile.email,
          activity: "Delete",
          description:
            "Delete " +
            carVariant.carBrandName +
            " " +
            carVariant.carModelName +
            " " +
            carVariant.carVariantName +
            " transmission details",
          timestamp: new Date(),
        });

        dispatch({
          type: "DELETE_TRANSMISSION_DETAIL",
          transmission,
        });
      })
      .catch((err) => {
        dispatch({
          type: "DELETE_TRANSMISSION_DETAIL_ERR",
          err,
        });
      });
  };
};
