import { createReducer } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { SiteApiServices } from "../actions/siteAction";

let initialState = {
  error: null,
  loading: false,
  siteDetail: null,
  siteListing: null,
};

export const getSiteDetailRequest = createAsyncThunk(
  "siteReducer/getSiteDetailRequest",
  async (payload, thunkApi) => {
    const response = await SiteApiServices.siteDetailRequest(payload, thunkApi);
    return response;
  }
);

export const getSiteListingRequest = createAsyncThunk(
  "siteReducer/getSiteListingRequest",
  async (payload, thunkApi) => {
    const response = await SiteApiServices.siteListingRequest(
      payload,
      thunkApi
    );
    return response;
  }
);

const siteReducer = createReducer(initialState, {
  [getSiteDetailRequest.pending]: (state) => {
    return {
      ...state,
      error: null,
      loading: true,
    };
  },
  [getSiteDetailRequest.fulfilled]: (state, action) => {
    return {
      ...state,
      error: null,
      loading: false,
      siteDetail: action.payload.data?.result?.siteDetail,
    };
  },
  [getSiteDetailRequest.rejected]: (state) => {
    return {
      ...state,
      error: null,
      loading: false,
    };
  },

  [getSiteListingRequest.pending]: (state) => {
    return {
      ...state,
      error: null,
      loading: true,
    };
  },
  [getSiteListingRequest.fulfilled]: (state, action) => {
    return {
      ...state,
      error: null,
      loading: false,
      siteListing: action.payload.data?.result?.data,
    };
  },
  [getSiteListingRequest.rejected]: (state) => {
    return {
      ...state,
      error: null,
      loading: false,
    };
  },
});

export default siteReducer;
