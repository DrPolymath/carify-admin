import { toast } from "react-toastify";

const carVariantReducer =(state={}, action) => {
    switch(action.type) {
        case "ADD_CAR_VARIANT": {
            toast.success("Added a car variant");
            return state;
        }
        case "ADD_CAR_VARIANT_ERR": {
            toast.error("An error occured");
            return state;
        }
        case "UPDATE_CAR_VARIANT": {
            toast.info("Updated a car variant");
            return state;
        }
        case "UPDATE_CAR_VARIANT_ERR": {
            toast.error("An error occured");
            return state;
        }
        case "UPDATE_CAR_VARIANT_COLOR": {
            toast.info("Updated car variant color");
            return state;
        }
        case "UPDATE_CAR_VARIANT_COLOR_ERR": {
            toast.error("An error occured");
            return state;
        }
        case "DELETE_CAR_VARIANT": {
            toast.warn("Deleted a car variant");
            return state;
        }
        case "DELETE_CAR_VARIANT_ERR": {
            toast.error("An error occured");
            return state;
        }
        default:
            return state;
    }
}

export default carVariantReducer;