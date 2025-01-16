export function isImageUrl(url) {
  return `${url}`?.match(/\.(jpeg|jpg|gif|png|avif|webp)/) != null;
}

export function isVideoUrl(url) {
  return `${url}`?.match(/\.(mp4|webm|ogg|mov)$/i) != null;
}

export const isMobileView = () => {
  return window.innerWidth <= 768;
};

export const getServiceURL = () => {
  const IS_LOCALHOST = window.location.hostname.includes("localhost");
  const SERVICE_URL = IS_LOCALHOST
    ? "https://flyoapi.afras.in/v1"
    : "https://flyoapi.afras.in/v1";

  return SERVICE_URL;
};

export const calculateDaysAgo = (createdAt) => {
  if (!createdAt) return 0; // Handle cases where createdAt is undefined or null
  const createdDate = new Date(createdAt); // Parse the createdAt date
  const currentDate = new Date(); // Get the current date
  const differenceInTime = currentDate - createdDate; // Difference in milliseconds
  const differenceInDays = Math.floor(differenceInTime / (1000 * 60 * 60 * 24)); // Convert to days
  return differenceInDays;
};
