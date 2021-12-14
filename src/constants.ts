import dotenv from "dotenv";

dotenv.config();

export const { DB_HOST, PORT } = (() => {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const { DB_HOST, PORT = 4000 } = process.env;

  if (DB_HOST == null) {
    throw new Error("DB_HOST is undefined");
  }

  return { DB_HOST, PORT };
})();
