import { toast } from "react-toastify";

const carPhotoReducer =(state={}, action) => {
    switch(action.type) {
        case "ADD_PHOTO": {
            toast.success("Added car photos");
            return state;
        }
        case "ADD_PHOTO_ERR": {
            toast.error("An error occured");
            return state;
        }
        // case "UPDATE_PHOTO": {
        //     toast.info("Updated a car variant");
        //     return state;
        // }
        // case "UPDATE_PHOTO_ERR": {
        //     toast.error("An error occured");
        //     return state;
        // }
        case "DELETE_PHOTO": {
            toast.warn("Deleted car photo");
            return state;
        }
        case "DELETE_PHOTO_ERR": {
            toast.error("An error occured");
            return state;
        }
        default:
            return state;
    }
}

export default carPhotoReducer;