export const createPriceRange = (priceRange) => {
    return (dispatch, getState, { getFirebase }) => {
        const firestore = getFirebase().firestore();
        const profile = getState().firebase.profile;
        firestore
            .collection('priceRange')
            .add({
                ...priceRange,
            })
            .then(() => {

                firestore
                    .collection('activityLog')
                    .add({
                        username: profile.username,
                        email: profile.email,
                        activity: 'Add',
                        description: 'Add ( RM ' + priceRange.minPrice + ' < price < RM ' + priceRange.maxPrice + ' ) into price range',
                        timestamp: new Date()
                    })

                dispatch({
                    type: 'CREATE_PRICE_RANGE',
                    priceRange
                });
            })
            .catch((err) => {
                dispatch({
                    type: 'CREATE_PRICE_RANGE_ERR',
                    err
                });
            });
    };
};

export const updatePriceRange = (priceRange) => {
    return (dispatch, getState, { getFirebase }) => {
        const firestore = getFirebase().firestore();
        const profile = getState().firebase.profile;
        firestore
            .collection('priceRange')
            .doc(priceRange.id)
            .set(
                {
                    ...priceRange,
                    maxPrice: priceRange.maxPrice,
                    minPrice: priceRange.minPrice
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
                        description: 'Update price range ( RM ' + priceRange.minPrice + ' < price < RM ' + priceRange.maxPrice + ' )',
                        timestamp: new Date()
                    })

                dispatch({
                    type: 'UPDATE_PRICE_RANGE',
                    priceRange
                });
            })
            .catch((err) => {
                dispatch({
                    type: 'UPDATE_PRICE_RANGE_ERR',
                    err
                });
            });
    };
};

export const deletePriceRange = (priceRange) => {
    return (dispatch, getState, { getFirebase }) => {
        const firestore = getFirebase().firestore();
        const profile = getState().firebase.profile;
        firestore
            .collection('priceRange')
            .doc(priceRange.id)
            .delete()
            .then(() => {

                firestore
                    .collection('activityLog')
                    .add({
                        username: profile.username,
                        email: profile.email,
                        activity: 'Delete',
                        description: 'Delete ( RM ' + priceRange.minPrice + ' < price < RM ' + priceRange.maxPrice + ' ) from price range',
                        timestamp: new Date()
                    })

                dispatch({
                    type: 'REMOVE_PRICE_RANGE'
                });
            })
            .catch((err) => {
                dispatch({
                    type: 'REMOVE_PRICE_RANGE_ERR',
                    err
                });
            });
    };
};