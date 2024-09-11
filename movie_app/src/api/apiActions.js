import axios  from "axios";
import { fetchDataError, fetchDataRequest, fetchDataSuccess, fetchGenresSuccess, fetchMovieListSuccess} from "./apiSlice";
import { createAsyncThunk } from '@reduxjs/toolkit';

const api_url = process.env.REACT_APP_API_URL;
const api_key = process.env.REACT_APP_IMDB_API_KEY;
const headers = {
    'accept': 'application/json',
    'Authorization': `Bearer ${api_key}` 
};
export const fetchData = createAsyncThunk(
    'api/fetchData',
    async ({url, params = {language: 'en'}, type = 'get'}, {dispatch}) => {
        dispatch(fetchDataRequest());
        // console.log('api hitted : ',`${api_url}${url}`);
        const options = {
            method: type,
            params: params,
            url: `${api_url}${url}`,
            headers: headers
        }
        try{
            const response = await axios.request(options);
            dispatch(fetchDataSuccess(response.data));
            // console.log('response : ',response.data);
            if(response.data?.genres){
                dispatch(fetchGenresSuccess(response.data));
            }else if(response.data?.results){
                dispatch(fetchMovieListSuccess(response.data));
            }
        }catch (error) {
            dispatch(fetchDataError(error.message));
        }
    }
)