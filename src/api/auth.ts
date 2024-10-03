import { apiRequest } from "@utils/apiRequest";

type params = {
  email: string;
  password: string;
  abortSignal?: AbortSignal;
};

type LoginResp = {
  token: string;
};

export default async function loginApi({
  email,
  password,
  abortSignal,
}: params) {
  const resp = await apiRequest<LoginResp>({
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
