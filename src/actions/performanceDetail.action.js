export const addPerformance = (carVariant, performances) => {
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
      .collection("performance")
      .add({
        ...performances,
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
            " performance details",
          timestamp: new Date(),
        });

        dispatch({
          type: "ADD_PERFORMANCE_DETAIL",
          performances,
        });
      })
      .catch((err) => {
        dispatch({
          type: "ADD_PERFORMANCE_DETAIL_ERR",
          err,
        });
      });
  };
};

export const updatePerformance = (carVariant, performance) => {
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
      .collection("performance")
      .doc(performance.id)
      .set({
        ...performance,
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
            " performance details",
          timestamp: new Date(),
        });

        dispatch({
          type: "UPDATE_PERFORMANCE_DETAIL",
          performance,
        });
      })
      .catch((err) => {
        dispatch({
          type: "UPDATE_PERFORMANCE_DETAIL_ERR",
          err,
        });
      });
  };
};

export const deletePerformance = (carVariant, performance) => {
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
      .collection("performance")
      .doc(performance.id)
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
            " performance details",
          timestamp: new Date(),
        });

        dispatch({
          type: "DELETE_PERFORMANCE_DETAIL",
          performance,
        });
      })
      .catch((err) => {
        dispatch({
          type: "DELETE_PERFORMANCE_DETAIL_ERR",
          err,
        });
      });
  };
};
