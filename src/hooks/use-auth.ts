export function useAuth() {
  const email = localStorage.getItem("emailStorage");
  const token = localStorage.getItem("tokenStorage");
  const refreshToken = localStorage.getItem("refreshTokenStorage");
  const id = localStorage.getItem("idStorage");

  return {
    isAuth: !!email,
    email,
    token,
    refreshToken,
    id,
  };
}

export function removeItemTokenStorage() {
  localStorage.removeItem("emailStorage");
  localStorage.removeItem("tokenStorage");
  localStorage.removeItem("refreshTokenStorage");
  localStorage.removeItem("idStorage");
}
