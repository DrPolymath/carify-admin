import { toast } from "react-toastify";

const transmissionDetailReducer = (state = {}, action) => {
    switch(action.type) {
        case "ADD_TRANSMISSION_DETAIL": {
            toast.success("Added transmission details");
            return state;
        }
        case "ADD_TRANSMISSION_DETAIL_ERR": {
            toast.error("An error occured");
            return state;
        }
        case "UPDATE_TRANSMISSION_DETAIL": {
            toast.info("Updated transmission details");
            return state;
        }
        case "UPDATE_TRANSMISSION_DETAIL_ERR": {
            toast.error("An error occured");
            return state;
        }
        case "DELETE_TRANSMISSION_DETAIL": {
            toast.warn("Deleted transmission details");
            return state;
        }
        case "DELETE_TRANSMISSION_DETAIL_ERR": {
            toast.error("An error occured");
            return state;
        }
        default:
            return state;
    }
};

export default transmissionDetailReducer;