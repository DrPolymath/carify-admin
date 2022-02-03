import { toast } from "react-toastify";

const performanceDetailReducer = (state = {}, action) => {
    switch(action.type) {
        case "ADD_PERFORMANCE_DETAIL": {
            toast.success("Added performance details");
            return state;
        }
        case "ADD_PERFORMANCE_DETAIL_ERR": {
            toast.error("An error occured");
            return state;
        }
        case "UPDATE_PERFORMANCE_DETAIL": {
            toast.info("Updated performance details");
            return state;
        }
        case "UPDATE_PERFORMANCE_DETAIL_ERR": {
            toast.error("An error occured");
            return state;
        }
        case "DELETE_PERFORMANCE_DETAIL": {
            toast.warn("Deleted performance details");
            return state;
        }
        case "DELETE_PERFORMANCE_DETAIL_ERR": {
            toast.error("An error occured");
            return state;
        }
        default:
            return state;
    }
};

export default performanceDetailReducer;