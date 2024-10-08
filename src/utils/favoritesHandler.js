import axios from "axios";

export async function favoritesHandlerPost(userId, coinId) {
  try {
    const res = await axios.post("/api/favorites", { userId, coinId });
    return { success: true, data: res.data };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Failed to update favorites",
    };
  }
}

export async function favoritesHandlerDelete(userId, coinId) {
  try {
    const res = await axios.delete(
      `/api/favorites?userId=${userId}&coinId=${coinId}`
    );
    return { success: true, data: res.data };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Failed to update favorites",
    };
  }
}

export async function getUserFavorites(userId) {
  try {
    const res = await axios.get(`/api/favorites?userId=${userId}`);
    return { success: true, data: res.data };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Failed to retrieve user",
    };
  }
}

export async function getUser(userId) {
  try {
    const res = await axios.get(`/api/user?userId=${userId}`);
    return { success: true, data: res.data };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Failed to retrieve user",
    };
  }
}
