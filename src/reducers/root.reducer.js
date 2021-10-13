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

const rootReducer = combineReducers({
    auth: authReducer,
    profile: profileReducer,
    admin: adminReducer,
    carBrand: carBrandReducer,
    carType: carTypeReducer,
    priceRange: priceRangeReducer,
    carModel: carModelReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
});

export default rootReducer