import { storage } from "../config/fbConfig";

export const addCarModel = (carModel, carBrandName) => {
    return (dispatch, getState, { getFirebase }) => {
        const firestore = getFirebase().firestore();
        const profile = getState().firebase.profile;
        firestore
            .collection('carBrand')
            .doc(carModel.cbId)
            .collection('carModel')
            .add({
                ...carModel
            })
            .then(() => {

                firestore
                    .collection('activityLog')
                    .add({
                        username: profile.username,
                        email: profile.email,
                        activity: 'Add',
                        description: 'Add ' + carModel.carModelName + ' into '+ carBrandName + ' ' + ' model',
                        timestamp: new Date()
                    })

                dispatch({
                    type: 'ADD_CAR_MODEL',
                    carModel
                });
            })
            .catch((err) => {
                dispatch({
                    type: 'ADD_CAR_MODEL_ERR',
                    err
                });
            });
    };
};

export const updateCarModel = (carModel, carType, url) => {
    return (dispatch, getState, { getFirebase }) => {
        console.log(carModel, carType, url)
        const firestore = getFirebase().firestore();
        const profile = getState().firebase.profile;
        firestore
            .collection('carBrand')
            .doc(carModel.cbId)
            .collection('carModel')
            .doc(carModel.id)
            .set(
                {
                    ...carModel,
                    carModelName: carModel.carModelName,
                    btId: carType,
                    url: url
                },
                { merge: true }
            )
            .then(() => {

                firestore
                    .collection('activityLog')
                    .add({
                        username: profile.username,
                        email: profile.email,
                        activity: 'Update',
                        description: 'Update ' + carModel.carBrandName + ' ' + carModel.carModelName,
                        timestamp: new Date()
                    })

                dispatch({
                    type: 'UPDATE_CAR_MODEL',
                    carModel
                });
            })
            .catch((err) => {
                dispatch({
                    type: 'UPDATE_CAR_MODEL_ERR',
                    err
                });
            });
    };
};

export const deleteCarModel = (carModel) => {
    return (dispatch, getState, { getFirebase }) => {
        const firestore = getFirebase().firestore();
        const profile = getState().firebase.profile;
        firestore
            .collection('carBrand')
            .doc(carModel.cbId)
            .collection('carModel')
            .doc(carModel.id)
            .delete()
            .then(() => {

                var fileRef = storage.refFromURL(carModel.url);
  
                // console.log("File in database before delete exists : " 
                //         + fileRef.exists())
                
                // Delete the file using the delete() method 
                fileRef.delete().then(function () {
                
                    firestore
                    .collection('activityLog')
                    .add({
                        username: profile.username,
                        email: profile.email,
                        activity: 'Delete',
                        description: 'Delete ' + carModel.carModelName + ' from ' + carModel.carBrandName + ' car model',
                        timestamp: new Date()
                    })

                    dispatch({
                        type: 'DELETE_CAR_MODEL'
                    });

                }).catch(function (error) {
                    console.log(error)
                });

                
            })
            .catch((err) => {
                dispatch({
                    type: 'DELETE_CAR_MODEL_ERR',
                    err
                });
            });
    };
};