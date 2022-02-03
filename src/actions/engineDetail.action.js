export const addEngine = (carVariant, engines) => {
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
      .collection("engine")
      .add({
        ...engines,
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
            " engine details",
          timestamp: new Date(),
        });

        dispatch({
          type: "ADD_ENGINE_DETAIL",
          engines,
        });
      })
      .catch((err) => {
        dispatch({
          type: "ADD_ENGINE_DETAIL_ERR",
          err,
        });
      });
  };
};

export const updateEngine = (carVariant, engines) => {
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
      .collection("engine")
      .doc(engines.id)
      .set({
        ...engines,
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
            " engine details",
          timestamp: new Date(),
        });

        dispatch({
          type: "UPDATE_ENGINE_DETAIL",
          engines,
        });
      })
      .catch((err) => {
        dispatch({
          type: "UPDATE_ENGINE_DETAIL_ERR",
          err,
        });
      });
  };
};

export const deleteEngine = (carVariant, engines) => {
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
      .collection("engine")
      .doc(engines.id)
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
            " engine details",
          timestamp: new Date(),
        });

        dispatch({
          type: "DELETE_ENGINE_DETAIL",
          engines,
        });
      })
      .catch((err) => {
        dispatch({
          type: "DELETE_ENGINE_DETAIL_ERR",
          err,
        });
      });
  };
};

