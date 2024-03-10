import { API_URL } from '../config';

//selectors
export const getAllAds = (state) => state.ads;
export const getAdById = (state, id) => state.ads.find((ad) => ad._id === id);

//actions
const createActionName = (actionName) => `app/ads/${actionName}`;
const LOAD_ADS = createActionName('LOAD_ADS');
const REMOVE_AD = createActionName('REMOVE_AD');

//action creators

export const loadAds = (payload) => ({ payload, type: LOAD_ADS });
export const removeAd = (payload) => ({ type: REMOVE_AD, payload });

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
    case REMOVE_AD:
      return statePart.filter((ad) => ad._id !== action.payload);
    default:
      return statePart;
  }
};

export default adsReducer;
