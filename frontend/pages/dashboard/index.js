import { DiscordEnpoints } from "../../tools/Constance";
import { parseCookie, decodeJwt } from "../../tools/utils";
import { server } from "../../config";
import {
  Card,
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Title,
} from "@tremor/react";
import Image from "next/image";
export default function Dashboard({ userguild }) {
  return (
    <div className="px-10 bg-gray-600">
      <div className="p-5">
        <Card>
          <Title>List of Guilds</Title>
          <div
            className="px-3 py-2 w-fit rounded-md bg-yellow-200/50"
            style={{
              borderLeftWidth: "4px",
              borderLeftColor: "rgb(202 138 4)",
            }}
          >
            <h4 className="text-xl font-bold text-yellow-600">정렬기준</h4>
            <p className="text-sm text-black">
              정렬기준은 봇이 접속한 길드를 우선적으로 정렬합니다.
            </p>
          </div>
          <Table marginTop="mt-5">
            <TableHead>
              <TableRow>
                <TableHeaderCell>Guild Name</TableHeaderCell>
                <TableHeaderCell>Action</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userguild.data
                .sort(function (a, b) {
                  return b.join - a.join;
                })
                .map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Image
                        src={item.icon}
                        width={50}
                        height={50}
                        className="rounded-full"
                        loading="lazy"
                      />
                      {item.name}
                    </TableCell>
                    <TableCell>
                      {item.join ? (
                        <button
                          type="button"
                          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 
                    focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 
                    dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        >
                          Manage
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none 
                              bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 
                              focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 
                              dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                        >
                          Invite
                        </button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  const parsed = parseCookie(ctx.req);
  if (!parsed.token) {
    return {
      redirect: {
        destination: "/api/auth/discord",
        permanent: false,
      },
    };
  }
  const decodingJwt = decodeJwt(parsed.token);
  const fetchData = await fetch(`${server}/api/dashboard/@me/guilds`, {
    headers: {
      Authorization: `${decodingJwt.access_token}`,
    },
  });
  const data = await fetchData?.json();
  return {
    props: {
      userguild: data,
    },
  };
};
