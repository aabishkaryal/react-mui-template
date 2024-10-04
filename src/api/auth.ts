import { apiRequest } from "@utils/apiRequest";

type loginParams = {
  email: string;
  password: string;
  abortSignal?: AbortSignal;
};

type AuthResponse = {
  token: string;
};

export async function loginApi({ email, password, abortSignal }: loginParams) {
  const resp = await apiRequest<AuthResponse>({
    path: "login",
    abortSignal: abortSignal,
    body: {
      email: email,
      password: password,
    },
  });
  if (resp.error) {
    throw new Error(resp.error);
  }
  if (!resp.data) {
    throw new Error("No data in response");
  }
  const { token } = resp.data;
  return token;
}

type registerParams = {
  name: string;
  email: string;
  password: string;
  abortSignal?: AbortSignal;
};

export async function registerApi({
  name,
  email,
  password,
  abortSignal,
}: registerParams) {
  const resp = await apiRequest<AuthResponse>({
    path: "register",
    abortSignal: abortSignal,
    body: {
      name: name,
      email: email,
      password: password,
    },
  });
  if (resp.error) {
    throw new Error(resp.error);
  }
  if (!resp.data) {
    throw new Error("No data in response");
  }
  const { token } = resp.data;
  return token;
}

type verifyParams = {
  token: string;
  abortSignal?: AbortSignal;
};

export async function verifyTokenApi({ token, abortSignal }: verifyParams) {
  const resp = await apiRequest<void>({
    path: "verify-token",
    token: token,
    abortSignal: abortSignal,
  });
  if (resp.error) {
    throw new Error(resp.error);
  }
  if (resp.status !== 200) {
    throw new Error("Invalid token");
  }
  return true;
}

