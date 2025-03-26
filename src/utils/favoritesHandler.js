import axios from "axios";

export async function favoritesHandlerPost(userId, coinId, coinImage) {
  try {
    const res = await axios.post("/api/favorites", {
      userId,
      coinId,
      coinImage,
    });
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

export async function updateUserPortfolio(portfolio, userId) {
  try {
    await fetch("/api/user/portfolio", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, portfolio }),
    });
  } catch (error) {
    console.error("Error updating portfolio in DB:", error);
  }
}
