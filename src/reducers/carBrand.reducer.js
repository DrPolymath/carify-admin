import { toast } from "react-toastify";

const carBrandReducer = (state = {}, action) => {
    switch(action.type) {
        case "ADD_CAR_BRAND": {
            toast.success("Added a car brand");
            return state;
        }
        case "ADD_CAR_BRAND_ERR": {
            toast.error("An error occured");
            return state;
        }
        case "UPDATE_CAR_BRAND": {
            toast.info("Updated a car brand");
            return state;
        }
        case "UPDATE_CAR_BRAND_ERR": {
            toast.error("An error occured");
            return state;
        }
        case "DELETE_CAR_BRAND": {
            toast.warn("Deleted a car brand");
            return state;
        }
        case "DELETE_CAR_BRAND_ERR": {
            toast.error("An error occured");
            return state;
        }
        default:
            return state;
    }
};

export default carBrandReducer;