import { toast } from "react-toastify";

const profileReducer = (state = {}, action) => {
    switch(action.type) {
        case 'UPDATE_PROFILE': {
            toast.info("Profile updated");
            return state;
        }
        case 'UPDATE_PROFILE_ERROR': {
            toast.error("An error occured");
            return state;
        }
        default:
            return state;
    }
};

export default profileReducer;