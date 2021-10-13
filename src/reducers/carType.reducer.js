import { toast } from "react-toastify";

const carTypeReducer = (state = {}, action) => {
    switch(action.type) {
        case "ADD_CAR_TYPE": {
            toast.success("Added a car type");
            return state;
        }
        case "ADD_CAR_TYPE_ERR": {
            toast.error("An error occured");
            return state;
        }
        case "UPDATE_CAR_TYPE": {
            toast.info("Updated a car type");
            return state;
        }
        case "UPDATE_CAR_TYPE_ERR": {
            toast.error("An error occured");
            return state;
        }
        case "DELETE_CAR_TYPE": {
            toast.warn("Deleted a car type");
            return state;
        }
        case "DELETE_CAR_TYPE_ERR": {
            toast.error("An error occured");
            return state;
        }
        default:
            return state;
    }
};

export default carTypeReducer;