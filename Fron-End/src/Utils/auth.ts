const AUTH_KEY = "user";

export function getAuth(): {
  id: string;
  email: string;
  fullName: string;
} | null {
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    return raw
      ? (JSON.parse(raw) as { id: string; email: string; fullName: string })
      : null;
  } catch {
    return null;
  }
}

export function setAuth(user: {
  id: string;
  email: string;
  fullName: string;
}): void {
  localStorage.setItem(AUTH_KEY, JSON.stringify(user));
}

export function clearAuth(): void {
  localStorage.removeItem(AUTH_KEY);
}
