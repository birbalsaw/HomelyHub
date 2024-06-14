import axios from "axios";

import { propertyDetailsAction } from "./propertyDetails-Slice";

export const getPropertyDetails = (id) => async (dispatch) => {
  try {
    dispatch(propertyDetailsAction.getListRequest());

    const response = await axios(`/api/v1/rent/listing/${id}`);

    if (!response) {
      throw new Error("Could not fetch any Property Details");
    }

    const { data } = response.data;

    dispatch(propertyDetailsAction.getPropertyDetails(data));
  } catch (error) {
    dispatch(propertyDetailsAction.getErrors(error.response.data.error));
  }
};
