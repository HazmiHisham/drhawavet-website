const SESSION_KEY = "drhawavet-admin-session";

export const ADMIN_CREDENTIALS = {
  email: "admin@drhawavet.com",
  password: "admin123",
};

export function isAdminAuthenticated() {
  if (typeof window === "undefined") return false;
  return window.sessionStorage.getItem(SESSION_KEY) === "true";
}

export function loginAdmin(email: string, password: string) {
  const valid =
    email === ADMIN_CREDENTIALS.email &&
    password === ADMIN_CREDENTIALS.password;

  if (valid) {
    window.sessionStorage.setItem(SESSION_KEY, "true");
  }

  return valid;
}

export function logoutAdmin() {
  window.sessionStorage.removeItem(SESSION_KEY);
}
