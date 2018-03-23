import axios from 'axios';
import { fetchProducts } from './products';

export const FETCH_CATEGORIES_REQUESTED = 'categories/FETCH_CATEGORIES_REQUESTED';
export const FETCH_CATEGORIES_ERROR = 'categories/FETCH_CATEGORIES_ERROR';
export const FETCH_CATEGORIES_DONE = 'categories/FETCH_CATEGORIES_DONE';

export const fetchCategories = () => {
    return dispatch => {
        dispatch({
        type: FETCH_CATEGORIES_REQUESTED,
    });

    return axios.get('/categories.json')
    .then((res) => {
            dispatch({
                type: FETCH_CATEGORIES_DONE,
                categories: res.data,
            });
        })
        .catch((err) => {
            dispatch({
                type: FETCH_CATEGORIES_ERROR,
            });
        })
    }
}

export const fetchCategoriesAndProducts = () => {
    return (dispatch, getState) => {
        return dispatch(fetchCategories()).then(() => {
            const fetchedSeletedCategory = getState().categories.categories[0].id;
        return dispatch(fetchProducts(fetchedSeletedCategory));
        })
    }
}