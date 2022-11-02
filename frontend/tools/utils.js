import cookie from "cookie";
import jsonwebtoken from "jsonwebtoken";
export function parseCookie(req) {
  if (!req) return {};
  return cookie.parse(req.headers.cookie || "");
}
export function signJwt(data, exp) {
  return jsonwebtoken.sign(data, process.env.JWT_SECRET, { expiresIn: exp });
}
export function verifyJwt(jwt) {
  try {
    return jsonwebtoken.verify(jwt, process.env.JWT_SECRET);
  } catch (e) {
    return null;
  }
}
export function decodeJwt(jwt) {
  return jsonwebtoken.decode(jwt);
}
export function getProfileImg(id, avatar) {
  if (avatar) {
    const useravatar_format =
      avatar && avatar.startsWith("a_") ? "gif" : "webp";
    return (
      avatar &&
      `/api/img?url=https://cdn.discordapp.com/avatars/${id}/${avatar}.${useravatar_format}`
    );
  } else {
    return "https://cdn.discordapp.com/embed/avatars/0.png";
  }
}
