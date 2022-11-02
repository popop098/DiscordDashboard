import Link from "next/link";
import { parseCookie } from "../../tools/utils";
import { useEffect } from "react";

const DiscordCallback = ({ token }) => {
  useEffect(() => {
    async function setting(token) {
      if (token) {
        localStorage.setItem("userToken", token);
      } else {
        localStorage.removeItem("userToken");
        localStorage.removeItem("userCache");
      }
      window.location.replace("/");
    }
    setting(token);
  }, []);
  return (
    <>
      <div className="flex h-screen">
        <div className="m-auto text-center">
          <div className="spinner m-auto" />
          <h2 className="text-2xl text-white font-bold">
            리다이렉트중입니다. 잠시만 기다려주세요.
          </h2>
          <p className="text-white text-lg">
            혹시 리다이렉트가 되지않나요?{" "}
            <Link href="/" passHref>
              여기
            </Link>
            를 클릭해 직접 이동하세요.
          </p>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = async (ctx) => {
  const parsed = parseCookie(ctx.req);
  return {
    props: {
      token: parsed.token || null,
    },
  };
};

export default DiscordCallback;
