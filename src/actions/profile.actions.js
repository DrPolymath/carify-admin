export const updateProfile = (profile, role, url) => {
  var isSuperAdmin;
  if (role === "Super Admin") {
    isSuperAdmin = true;
  } else if (role === "Admin") {
    isSuperAdmin = false;
  }
  return (dispatch, getState, { getFirebase }) => {
    const firestore = getFirebase().firestore();
    firestore
      .collection("admin")
      .doc(profile.id)
      .set(
        {
          ...profile,
          username: profile.username,
          firstname: profile.firstname,
          lastname: profile.lastname,
          email: profile.email,
          phoneNumber: profile.phoneNumber,
          gender: profile.gender,
          superAdmin: isSuperAdmin,
          url: url,
        },
        { merge: true }
      )
      .then(() => {
        dispatch({
          type: "UPDATE_PROFILE",
          profile,
        });
      })
      .catch((err) => {
        dispatch({
          type: "UPDATE_PROFILE_ERR",
          err,
        });
      });
  };
};
