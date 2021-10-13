import { toast } from "react-toastify";

const priceRangeReducer = (state = {}, action) => {
    switch(action.type) {
        case "CREATE_PRICE_RANGE": {
            toast.success("Added a price range");
            return state;
        }
        case "CREATE_PRICE_RANGE_ERR": {
            toast.error("An error occured");
            return state;
        }
        case "UPDATE_PRICE_RANGE": {
            toast.info("Updated a price range");
            return state;
        }
        case "UPDATE_PRICE_RANGE_ERR": {
            toast.error("An error occured");
            return state;
        }
        case "REMOVE_PRICE_RANGE": {
            toast.warn("Removed a price range");
            return state;
        }
        case "REMOVE_PRICE_RANGE_ERR": {
            toast.error("An error occured");
            return state;
        }
        default:
            return state;
    }
};

export default priceRangeReducer;