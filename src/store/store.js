import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { getFirebase } from 'react-redux-firebase'
import { reduxFirestore, getFirestore } from "redux-firestore";
import { firebase } from '../config/fbConfig';
import rootReducer from "../reducers/root.reducer";


const rfConfig = {};

const store = createStore(rootReducer, 
  compose(
    applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
    reduxFirestore(firebase, rfConfig)
  )
);

export default store;