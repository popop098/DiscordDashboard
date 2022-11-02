import { Navbar, Button, Dropdown, Avatar } from "flowbite-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { decodeJwt, getProfileImg } from "../tools/utils";
import { DiscordEnpoints } from "../tools/Constance";
export default function Nav(token) {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const logged = user?.id && user.version === 1;
  useEffect(() => {
    try {
      const decodingJwt = decodeJwt(
        token.token || localStorage.getItem("userToken")
      );

      async function getUser() {
        try {
          const fetchApi = await fetch(DiscordEnpoints.Me, {
            headers: {
              Authorization: `Bearer ${decodingJwt.access_token}`,
              "Content-Type": "application/json",
            },
            method: "GET",
          });
          if (!fetchApi.ok) return;
          const fetchResp = await fetchApi.json();
          const UserData = {
            id: fetchResp.id,
            username: fetchResp.username,
            tag: fetchResp.discriminator,
            avatar: getProfileImg(fetchResp.id, fetchResp.avatar),
            version: 1,
          };
          localStorage.setItem("userCache", JSON.stringify(UserData));
          setUser(UserData);
        } catch {
          setUser(null);
        }
      }

      getUser();
    } catch (e) {
      setUser(null);
    }
  }, [token]);
  return (
    <Navbar fluid={true} rounded={true}>
      <Navbar.Brand href="/">
        <img
          src="https://flowbite.com/docs/images/logo.svg"
          className="mr-3 h-6 sm:h-9"
          alt="Flowbite Logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Flowbite
        </span>
      </Navbar.Brand>
      <Navbar.Collapse>
        <Navbar.Link href="/navbars" active={true}>
          Home
        </Navbar.Link>
        <Navbar.Link href="/navbars">About</Navbar.Link>
        <Navbar.Link href="/navbars">Services</Navbar.Link>
        <Navbar.Link href="/navbars">Pricing</Navbar.Link>
        <Navbar.Link href="/navbars">Contact</Navbar.Link>
      </Navbar.Collapse>
      <div className="flex md:order-2">
        {logged ? (
          <Dropdown
            arrowIcon={false}
            inline={true}
            label={
              <Avatar alt="User settings" img={user.avatar} rounded={true} />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">{user.username}</span>
              <span className="block truncate text-sm font-medium">
                {user.id}
              </span>
            </Dropdown.Header>
            <Dropdown.Item onClick={() => router.push("/dashboard")}>
              Dashboard
            </Dropdown.Item>
            <Dropdown.Item>Settings</Dropdown.Item>
            <Dropdown.Item>Earnings</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item
              onClick={() => router.push("/api/auth/discord/logout")}
            >
              <p className="text-red-500">Logout</p>
            </Dropdown.Item>
          </Dropdown>
        ) : (
          <Button onClick={() => router.push("/api/auth/discord")}>
            Login
          </Button>
        )}
        <Navbar.Toggle />
      </div>
    </Navbar>
  );
}
