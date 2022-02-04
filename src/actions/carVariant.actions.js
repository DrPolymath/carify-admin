export const addCarVariant = (carVariant, cbId) => {
  return (dispatch, getState, { getFirebase }) => {
    const firestore = getFirebase().firestore();
    const profile = getState().firebase.profile;
    firestore
      .collection("carBrand")
      .doc(cbId)
      .collection("carModel")
      .doc(carVariant.cmId)
      .collection("carVariant")
      .add({
        carVariantName: carVariant.carVariantName,
        cmId: carVariant.cmId,
        prId: carVariant.prId,
        price: carVariant.price,
        priceRange: carVariant.priceRange,
        maleClick: 0,
        femaleClick: 0,
        totalClick: 0,
      })
      .then(function (docRef) {
        let temp = Object.entries(carVariant.colorList).map((key) => ({
          ...key[1],
          id: key[0],
        }));
        temp.map((color) => {
          firestore
            .collection("carBrand")
            .doc(cbId)
            .collection("carModel")
            .doc(carVariant.cmId)
            .collection("carVariant")
            .doc(docRef.id)
            .collection("colors")
            .add({
              colorName: color.colorName,
              colorCode: color.colorCode,
              vId: docRef.id,
            });
        });
      })
      .then(() => {
        firestore.collection("activityLog").add({
          username: profile.username,
          email: profile.email,
          activity: "Add",
          description:
            "Add " +
            carVariant.carVariantName +
            " variant into " +
            carVariant.carBrandName +
            " " +
            carVariant.carModelName,
          timestamp: new Date(),
        });

        dispatch({
          type: "ADD_CAR_VARIANT",
          carVariant,
        });
      })
      .catch((err) => {
        dispatch({
          type: "ADD_CAR_VARIANT_ERR",
          err,
        });
      });
  };
};

export const updateCarVariantColor = (colorList, carVariant) => {
  return (dispatch, getState, { getFirebase }) => {
    const firestore = getFirebase().firestore();
    colorList.map((color) => {
      firestore
        .collection("carBrand")
        .doc(carVariant.cbId)
        .collection("carModel")
        .doc(carVariant.cmId)
        .collection("carVariant")
        .doc(carVariant.id)
        .collection("colors")
        .doc(color.id)
        .set(
          {
            colorName: color.colorName,
            colorCode: color.colorCode,
          },
          { merge: true }
        )
        .then(() => {
          dispatch({
            type: "UPDATE_CAR_VARIANT_COLOR",
            carVariant,
          });
        })
        .catch((err) => {
          dispatch({
            type: "UPDATE_CAR_VARIANT_COLOR_ERR",
            err,
          });
        });
    });
  };
};

export const updateCarVariant = (carVariant) => {
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
      .set(
        {
          carVariantName: carVariant.carVariantName,
          cmId: carVariant.cmId,
          prId: carVariant.prId,
          price: carVariant.price,
          priceRange: carVariant.priceRange,
        },
        { merge: true }
      )
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
            carVariant.carVariantName,
          timestamp: new Date(),
        });
        dispatch({
          type: "UPDATE_CAR_VARIANT",
        });
      })
      .catch(function (error) {
        console.log(error);
      })
      .catch((err) => {
        dispatch({
          type: "UPDATE_CAR_VARIANT_ERR",
          err,
        });
      });
  };
};

export const deleteCarVariant = (carVariant) => {
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
            " from car variant",
          timestamp: new Date(),
        });
        dispatch({
          type: "DELETE_CAR_VARIANT",
        });
      })
      .catch(function (error) {
        console.log(error);
      })
      .catch((err) => {
        dispatch({
          type: "DELETE_CAR_VARIANT_ERR",
          err,
        });
      });
  };
};
