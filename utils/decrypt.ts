import crypto from "crypto";

const algorithm = "aes-128-cbc";
const decipher = crypto.createDecipheriv(
  algorithm,
  process.env.ENCRYPTION_KEY,
  process.env.ENCRYPTION_IV,
);

export default function decrypt(encrypted: string) {
  let decrypted = decipher.update(encrypted, "base64", "utf8");

  decrypted += decipher.final("utf8");

  return JSON.parse(decrypted);
}
