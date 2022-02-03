import { toast } from "react-toastify";

const initState = {}

const adminReducer = (state = initState, action) => {
    switch(action.type) {
        case "UPDATE_ADMIN": {
            toast.success("Updated an admin detail");
            return state;
        }
        case "UPDATE_ADMIN_ERR": {
            toast.error("An error occured");
            return state;
        }
        case "DELETE_ADMIN": {
            toast.warn("Deleted an admin");
            return state;
        }
        case "DELETE_ADMIN_ERR": {
            toast.error("An error occured");
            return state;
        }
        case "DISABLE_ADMIN": {
            toast.warn("Disabled an admin account");
            return state;
        }
        case "DISABLE_ADMIN_ERR": {
            toast.error("An error occured");
            return state;
        }
        case "ENABLE_ADMIN": {
            toast.success("Enabled an admin account");
            return state;
        }
        case "ENABLE_ADMIN_ERR": {
            toast.error("An error occured");
            return state;
        }
        case "APPROVE_ADMIN": {
            toast.success("Approved an admin");
            return state;
        }
        case "APPROVE_ADMIN_ERR": {
            toast.error("An error occured");
            return state;
        }
        case "REJECT_ADMIN": {
            toast.warn("Rejected an admin request");
            return state;
        }
        case "REJECT_ADMIN_ERR": {
            toast.error("An error occured");
            return state;
        }
        default:
            return state;
    }
}

export default adminReducer