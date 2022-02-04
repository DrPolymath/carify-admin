import authReducer from "./auth.reducer";
import profileReducer from "./profile.reducer";
import adminReducer from "./admin.reducer";
import priceRangeReducer from "./priceRange.reducer";
import carBrandReducer from "./carBrand.reducer";
import carTypeReducer from "./carType.reducer";
import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";
import carModelReducer from "./carModel.reducer";
import carVariantReducer from "./carVariant.reducer";
import carPhotoReducer from "./carPhoto.reducer";
import engineDetailReducer from "./engineDetail.reducer";
import performanceDetailReducer from "./performanceDetail.reducer";
import transmissionDetailReducer from "./transmissionDetail.reducer";
import userReducer from "./user.reducer";

const rootReducer = combineReducers({
    auth: authReducer,
    profile: profileReducer,
    admin: adminReducer,
    carBrand: carBrandReducer,
    carType: carTypeReducer,
    priceRange: priceRangeReducer,
    carModel: carModelReducer,
    carVariant: carVariantReducer,
    photo: carPhotoReducer,
    engine: engineDetailReducer,
    performance: performanceDetailReducer,
    user: userReducer,
    transmission: transmissionDetailReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
});

export default rootReducer