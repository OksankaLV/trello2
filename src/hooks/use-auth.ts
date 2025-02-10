export function useAuth() {
  const token = localStorage.getItem("token") || "";
  const refreshToken = localStorage.getItem("refreshToken");

  return {
    token,
    refreshToken,
  };
}

export function removeItemTokenStorage() {
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
}

export function setTokenToLocalStorage(data: {
  data: { token: string; refreshToken: string };
}): void {
  localStorage.setItem("token", data.data?.token);
  localStorage.setItem("refreshToken", data.data?.refreshToken);
}
