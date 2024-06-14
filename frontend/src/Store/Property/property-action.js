import axios from "axios";
import { propertyAction } from "./property-slice";

// Action creator to fetch properties
export const getAllProperties = () => async (dispatch, getState) => {
    try {
        dispatch(propertyAction.getRequest());

        const { searchParams } = getState().properties;

        const response = await axios.get('/api/v1/rent/listing', {
            params: { ...searchParams },
        });

        if (!response) {
            throw new Error("Could not fetch any properties");
        }

        const { data } = response;
        dispatch(propertyAction.getProperties(data));
    } catch (error) {
        dispatch(propertyAction.getErrors(error.message));
    }
};

export default propertyAction; // Export the default export
