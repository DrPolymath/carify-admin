import { toast } from "react-toastify";

const carModelReducer =(state={}, action) => {
    switch(action.type) {
        case "ADD_CAR_MODEL": {
            toast.success("Added a car model");
            return state;
        }
        case "ADD_CAR_MODEL_ERR": {
            toast.error("An error occured");
            return state;
        }
        case "UPDATE_CAR_MODEL": {
            toast.info("Updated a car model");
            return state;
        }
        case "UPDATE_CAR_MODEL_ERR": {
            toast.error("An error occured");
            return state;
        }
        case "DELETE_CAR_MODEL": {
            toast.warn("Deleted a car model");
            return state;
        }
        case "DELETE_CAR_MODEL_ERR": {
            toast.error("An error occured");
            return state;
        }
        default:
            return state;
    }
}

export default carModelReducer;