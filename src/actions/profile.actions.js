export const updateProfile = (profile) => {
    return (dispatch, getState, { getFirebase }) => {
        const firestore = getFirebase().firestore();
        firestore
            .collection('admin')
            .doc(profile.id)
            .set(
                {
                    ...profile,
                    username: profile.username,
                    firstname: profile.firstname,
                    lastname: profile.lastname,
                    email: profile.email,
                    phoneNumber: profile.phoneNumber,
                    gender: profile.gender
                },
                { merge: true }
            )
            .then(() => {
                dispatch({
                    type: 'UPDATE_PROFILE',
                    profile
                });
            })
            .catch((err) => {
                dispatch({
                    type: 'UPDATE_PROFILE_ERR',
                    err
                });
            });
    };
};