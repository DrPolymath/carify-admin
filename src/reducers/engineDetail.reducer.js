import { toast } from "react-toastify";

const engineDetailReducer = (state = {}, action) => {
    switch(action.type) {
        case "ADD_ENGINE_DETAIL": {
            toast.success("Added engine details");
            return state;
        }
        case "ADD_ENGINE_DETAIL_ERR": {
            toast.error("An error occured");
            return state;
        }
        case "UPDATE_ENGINE_DETAIL": {
            toast.info("Updated engine details");
            return state;
        }
        case "UPDATE_ENGINE_DETAIL_ERR": {
            toast.error("An error occured");
            return state;
        }
        case "DELETE_ENGINE_DETAIL": {
            toast.warn("Deleted engine details");
            return state;
        }
        case "DELETE_ENGINE_DETAIL_ERR": {
            toast.error("An error occured");
            return state;
        }
        default:
            return state;
    }
};

export default engineDetailReducer;