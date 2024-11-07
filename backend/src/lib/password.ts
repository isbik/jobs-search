import argon2 from "argon2";

export const hashPassword = (password: string) =>
  argon2.hash(password, {
    type: argon2.argon2id,
  });

export const verifyPassword = (password: string, hash: string) =>
  argon2.verify(hash, password);
