import { DiscordEnpoints } from "../../../../tools/Constance";
import { signJwt } from "../../../../tools/utils";
import Cookies from "cookies";
export default async function handler(req, res) {
  const code = req.query.code;
  const params = new URLSearchParams({
    client_id: process.env.BOT_ID,
    code,
    client_secret: process.env.BOT_SECRET,
    redirect_uri: "http://localhost:3000/api/auth/discord/callback",
    grant_type: "authorization_code",
  });
  const token = await (
    await fetch(DiscordEnpoints.Token, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params,
    })
  ).json();
  const user = await (
    await fetch(DiscordEnpoints.Me, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token.access_token}`,
      },
    })
  ).json();
  const userData = {
    id: user.id,
    access_token: token.access_token,
    expires_in: token.expires_in,
    refresh_token: token.refresh_token,
    email: user.email,
    username: user.username,
    discriminator: user.discriminator,
    verified: user.verified,
  };
  const signedJwt = signJwt(userData, "30d");
  const cookies = new Cookies(req, res);
  const Expi = new Date(new Date().getTime() + userData.expires_in * 1000);
  cookies.set("token", signedJwt, {
    httpOnly: false,
    sameSite: "lax",
    path: "/",
    expires: Expi,
  });
  res.redirect("/callback/discord");
}
