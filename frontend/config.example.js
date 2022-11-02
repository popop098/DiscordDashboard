const dev = process.env.NODE_ENV !== "production";

export const server = dev
  ? "http://localhost:3000"
  : "https://your_deployment.server.com";
export const configs = {
  botId: "",
  botSecret: "",
  botToken: "",
  jwtSecret: "",
  redirectUrl: "http://localhost:3000/api/auth/discord/callback",
  scope: "identify email guilds guilds.join",
};
