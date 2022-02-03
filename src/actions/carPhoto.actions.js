import { storage } from "../config/fbConfig";

export const addPhoto = (carVariant, photos) => {
  return (dispatch, getState, { getFirebase }) => {
    const firestore = getFirebase().firestore();
    const profile = getState().firebase.profile;
    firestore
      .collection("carBrand")
      .doc(carVariant.cbId)
      .collection("carModel")
      .doc(carVariant.cmId)
      .collection("photos")
      .add({
        ...photos,
      })
      .then(() => {
        firestore.collection("activityLog").add({
          username: profile.username,
          email: profile.email,
          activity: "Add",
          description:
            "Add photo to " +
            carVariant.carBrandName +
            " " +
            carVariant.carModelName,
          timestamp: new Date(),
        });

        dispatch({
          type: "ADD_PHOTO",
          photos,
        });
      })
      .catch((err) => {
        dispatch({
          type: "ADD_PHOTO_ERR",
          err,
        });
      });
  };
};

export const deleteCarPhoto = (carVariant, photo ) => {
  return (dispatch, getState, { getFirebase }) => {
    console.log(carVariant)
    console.log(photo.id)
    console.log(photo[0].id)
    console.log(photo[0].carPhoto)
    const firestore = getFirebase().firestore();
    const profile = getState().firebase.profile;
    firestore
      .collection("carBrand")
      .doc(carVariant.cbId)
      .collection("carModel")
      .doc(carVariant.cmId)
      .collection("photos")
      .doc(photo[0].id)
      .delete()
      .then(() => {
        var fileRef = storage.refFromURL(photo[0].carPhoto);
        fileRef
          .delete()

          .then(function () {
            firestore.collection("activityLog").add({
              username: profile.username,
              email: profile.email,
              activity: "Delete",
              description:
                "Delete a photo from" +
                carVariant.carBrandName +
                carVariant.carModelName +
                " car model",
              timestamp: new Date(),
            });

            dispatch({
              type: "DELETE_PHOTO",
            });
          })
          .catch(function (error) {
            console.log(error);
          });
      })
      .catch((err) => {
        dispatch({
          type: "DELETE_PHOTO_ERR",
          err,
        });
      });
  };
};
