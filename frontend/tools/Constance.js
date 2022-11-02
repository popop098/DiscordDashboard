export const BASE_URLs = {
  api: "https://discord.com/api",
  invite: "https://discord.gg",
  cdn: "https://cdn.discordapp.com",
};
export const DiscordEnpoints = {
  Token: BASE_URLs.api + "/oauth2/token",
  Me: BASE_URLs.api + "/v9/users/@me",
  Guilds: BASE_URLs.api + "/v9/users/@me/guilds",
  InviteApplication: (id, perms, scope, redirect = "", guild_id = "") =>
    `${BASE_URLs.api}/oauth2/authorize?client_id=${
      id ? id.split(" ")[0] : "CLIENT_ID"
    }&permissions=${Object.keys(perms)
      .filter((el) => perms[el])
      .map((el) => Number(el))
      .reduce((prev, curr) => prev + curr, 0)}&scope=${
      scope ? encodeURI(scope) : "bot"
    }${redirect ? `&redirect_uri=${encodeURIComponent(redirect)}` : ""}${
      guild_id ? `&guild_id=${guild_id}` : ""
    }`,
  ServerInvite: (code) => `${BASE_URLs.invite}/${code}`,
};
