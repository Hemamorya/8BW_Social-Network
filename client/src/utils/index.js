import axios from "axios";
import { SetPosts } from "../redux/postSlice";
// Replace with your actual Redux action import

const API_URL = "http://localhost:8800";

export const API = axios.create({
  baseURL: API_URL,
  responseType: "json",
});

export const apiRequest = async ({ url, token, data, method }) => {
  try {
    const result = await API({
      url,
      method: method || "GET",
      data: data,
      headers: {
        "content-type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    return result?.data;
  } catch (error) {
    const err = error.response.data;
    console.log(err);
    return {
      status: err.success,
      message: err.message,
    };
  }
};

export const handleFileUpload = async (uploadFile) => {
  // Create a new FormData object
  const formData = new FormData();
  formData.append("file", uploadFile);
  formData.append("upload_preset", "hemamorya");

  try {
    // Make a POST request to Cloudinary API
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_Id}/image/upload`,
      formData
    );

    // Return the secure URL of the uploaded file
    return response.data.secure_url;
  } catch (error) {
    // Log and handle errors
    console.error('Error uploading file to Cloudinary:', error);
    // You might want to throw the error again or handle it differently based on your application's requirements
  }
};

export const fetchPosts = async (token, dispatch, uri, data) => {
  try {
    const res = await apiRequest({
      url: uri|| "/posts",
      token: token,
      method: "POST",
      data: data || {},
    });
    dispatch(SetPosts(res?.data));
    return;
  } catch (error) {
    console.log(error);
  }
};

export const likePost = async ({ uri, token }) => {
  try {
    const res = await apiRequest({
      url: uri,
      token: token,
      method: "POST",
    });
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = async (id, token) => {
  try {
    const res = await apiRequest({
      url: "/posts/" + id,
      token: token,
      method: "DELETE",
    });
  } catch (error) {
    console.log(error);
  }
};

export const getUserInfo = async ({  id, token }) => {
  try {
    const uri = id === undefined ? "/users/get-user" : "/users/get_user/" + id;
    const res = await apiRequest({
      url: uri,
      token: token,
      method: "POST",
    });
    if (res?.message === "Authentication failed") {
      localStorage.removeItem("user");
      window.alert("User session expired. Login again");
      window.location.replace("/login");
    }

    return res?.user;
    
  } catch (error) {
    console.log(error);
  }
};

export const sendFriendRequest = async (token, id) => {
  try {
    const res = await apiRequest({
      url: "/users/friend-request",
      token: token,
      method: "POST",
      data: { requestTo: id },
    });
    // You might want to return something based on the response, like res.data
    return res.data;
  } catch (error) {
    console.log(error);
    // Handle the error as needed
  }
};


export const viewUserProfile = async (token, id) => {
  try {
    const res = await apiRequest({
      url: "/users/profile-view",
      token: token,
      method: "POST",
      data: { id },
    });
    
    return;
  } catch (error) {
    console.log(error);
  }
};
