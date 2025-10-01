// errorHandler.js
export const getErrorMessage = (error) => {
  if (!error) return "Something went wrong. Please try again.";

  // If API gives structured error { message: "..."}
  if (typeof error === "object") {
    if (error.message) return error.message;
    if (error.error) return error.error;
    if (error.response?.data?.message) return error.response.data.message;
  }

  // Handle common network issues
  const errorText = String(error).toLowerCase();
  if (errorText.includes("network")) {
    return "Network error. Please check your internet connection.";
  }
  if (errorText.includes("timeout")) {
    return "Request timed out. Try again later.";
  }
  if (errorText.includes("unauthorized")) {
    return "You are not authorized. Please log in again.";
  }
  if (errorText.includes("500")) {
    return "Server error. Please try again later.";
  }

  return "Unexpected error occurred. Please try again.";
};
