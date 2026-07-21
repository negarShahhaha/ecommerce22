const API_URL = process.env.NEXT_PUBLIC_DJANGO_API_URL || "http://127.0.0.1:8000";

export async function registerUser(email: string, username: string, password: string, confirmPassword: string) {
  const res = await fetch(`${API_URL}/accounts/register/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      username,
      password,
      confirm_password: confirmPassword,
    }),
  });

  const data = await res.json();
  if (!res.ok) {
    return { success: false, errors: data };
  }
  return { success: true, message: data.message };
}

export async function verifyOtp(email: string, code: string) {
  const res = await fetch(`${API_URL}/accounts/register/verify/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, code: Number(code) }),
  });

  const data = await res.json();
  if (!res.ok) {
    return { success: false, errors: data };
  }
  return { success: true, user: data };
}

export async function loginUser(username: string, password: string) {
  const res = await fetch(`${API_URL}/accounts/login/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();
  if (!res.ok) {
    return { success: false, errors: data };
  }
  return { success: true, ...data }; // { user_id, token, email }
}

