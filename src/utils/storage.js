const TOKEN_KEY = "drive_owner_token";

console.log("Storage Loaded");

export function setToken(token) {
  console.log("Saving Token:", token);

  localStorage.setItem(TOKEN_KEY, token);
}

export function getToken() {
  const token = localStorage.getItem(TOKEN_KEY);

  console.log("Getting Token:", token);

  return token;
}

export function removeToken() {
  console.log("Removing Token");

  localStorage.removeItem(TOKEN_KEY);
}
