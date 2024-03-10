import { API_URL } from '../config';

//selectors
export const getAllAds = (state) => state.ads;

//actions
const createActionName = (actionName) => `app/ads/${actionName}`;
const LOAD_ADS = createActionName('LOAD_ADS');

//action creators

export const loadAds = (payload) => ({ payload, type: LOAD_ADS });

/* THUNKS */

export const loadAdsRequest = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${API_URL}/ads`);
      const data = await response.json();
      console.log(data);
      dispatch(loadAds(data));
    } catch (error) {
      console.log(error);
    }
  };
};

const adsReducer = (statePart = [], action) => {
  switch (action.type) {
    case LOAD_ADS:
      return [...action.payload];
    default:
      return statePart;
  }
};

export default adsReducer;
