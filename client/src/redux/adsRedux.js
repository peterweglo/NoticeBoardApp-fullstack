import { API_URL } from '../config';
import shortid from 'shortid';

//selectors
export const getAllAds = (state) => state.ads;
export const getAdById = (state, id) => state.ads.find((ad) => ad._id === id);

//actions
const createActionName = (actionName) => `app/ads/${actionName}`;
const LOAD_ADS = createActionName('LOAD_ADS');
const REMOVE_AD = createActionName('REMOVE_AD');
const ADD_AD = createActionName('ADD_AD');
const SEARCH_ADS = createActionName('SEARCH_ADS');

//action creators

export const loadAds = (payload) => ({ payload, type: LOAD_ADS });
export const removeAd = (payload) => ({ type: REMOVE_AD, payload });
export const addAd = (payload) => ({ type: ADD_AD, payload });
export const searchAd = (payload) => ({
  type: SEARCH_ADS,
  payload: { payload },
});

/* THUNKS */

export const loadAdsRequest = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${API_URL}/api/ads`);
      const data = await response.json();
      console.log(data);
      dispatch(loadAds(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const removeAdRequest = (id) => {
  return async (dispatch) => {
    try {
      const options = {
        method: 'DELETE',
        credentials: 'include',
      };
      const response = await fetch(`${API_URL}/api/ads/${id}`, options);
      dispatch(removeAd(id));
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
    case ADD_AD:
      return [...statePart, { ...action.payload, _id: shortid() }];
    case SEARCH_ADS:
      return statePart.filter((ad) => ad.title.includes(action.payload));
    default:
      return statePart;
  }
};

export default adsReducer;
