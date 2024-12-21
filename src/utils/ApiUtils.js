import { get, post, put, del } from './ApiWrapper';

// Function to fetch data
export const fetchData = async (endpoint, config = {}) => {
  try {
    const data = await get(endpoint, config);
    return data;
  } catch (error) {
    throw error;
  }
};

// Function to post data
export const postData = async (endpoint, data, config = {}) => {
  try {
    const responseData = await post(endpoint, data, config);
    return responseData;
    console.log(responseData);
  } catch (error) {
    throw error;
  }
};

// Function to update data
export const updateData = async (endpoint, data, config = {}) => {
  try {
    const responseData = await put(endpoint, data, config);
    return responseData;
  } catch (error) {
    console.error('Failed to update data:', error);
    throw error;
  }
};

// Function to delete data
export const deleteData = async (endpoint, config = {}) => {
  try {
    const responseData = await del(endpoint, config);
    return responseData;
  } catch (error) {
    console.error('Failed to delete data:', error);
    throw error;
  }
};
