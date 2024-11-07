import { createHmac } from "crypto";

export const createToken = (
  payload: object,
  secret: string,
  expiresIn: number
) => {
  const header = {
    alg: "HS256",
    typ: "JWT",
  };

  const base64UrlEncode = (obj: object) =>
    Buffer.from(JSON.stringify(obj)).toString("base64url");

  const tokenHeader = base64UrlEncode(header);
  const tokenPayload = base64UrlEncode({
    ...payload,
    exp: Math.floor(Date.now() / 1000) + expiresIn,
  });

  const signature = createHmac("sha256", secret)
    .update(`${tokenHeader}.${tokenPayload}`)
    .digest("base64url");

  return `${tokenHeader}.${tokenPayload}.${signature}`;
};

export const verifyToken = (token: string, secret: string) => {
  const [header, payload, signature] = token.split(".");
  const newSignature = createHmac("sha256", secret)
    .update(`${header}.${payload}`)
    .digest("base64url");

  if (newSignature !== signature) {
    throw new Error("Invalid signature");
  }

  return JSON.parse(Buffer.from(payload, "base64").toString());
};
