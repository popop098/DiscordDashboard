import { configs } from "../../../../config";
export default async function handler(req, res) {
  return res.redirect(
    301,
    `https://discord.com/oauth2/authorize?client_id=${configs.botId}&scope=${configs.scope}&permissions=0&response_type=code&redirect_uri=${configs.redirectUrl}&prompt=none`
  );
}
