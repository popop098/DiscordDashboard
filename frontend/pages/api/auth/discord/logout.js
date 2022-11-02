import Cookies from "cookies";
export default async function handler(req, res) {
    res.setHeader('Cache-control', 'no-cache')
    const cookies = new Cookies(req, res);
    cookies.set('token', null,{
        maxAge:-1,
        path:'/'
    })
    return res.redirect("/callback/discord")
}
