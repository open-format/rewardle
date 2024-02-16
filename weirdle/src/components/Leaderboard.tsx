import { useWallet } from "@openformat/react";
import clsx from "clsx";
import { LeaderboardEntry } from "../@types";

interface LeaderboardProps {
  data: LeaderboardEntry[] | undefined;
  isLoading: boolean;
}

export default function Leaderboard({ data, isLoading }: LeaderboardProps) {
  if (isLoading)
    return (
      <div aria-live="assertive" aria-busy="true">
        Loading...
      </div>
    );

  return (
    <section>
      <table className="divide-y divide-gray-300" aria-live="polite">
        <thead>
          <tr role="row" className="text-left">
            <th scope="col" role="columnheader">
              Rank
            </th>
            <th scope="col" role="columnheader">
              User
            </th>
            <th scope="col" role="columnheader" aria-sort="descending">
              XP Rewarded
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item, index) => (
            <TableItem key={index} item={item} index={index} />
          ))}
        </tbody>
      </table>
    </section>
  );
}

function TableItem({ item, index }: { item: LeaderboardEntry; index: number }) {
  const { address } = useWallet();
  const currentUser = Boolean(address?.toLowerCase() === item.user_address);

  return (
    <tr
      className={clsx(
        { "bg-primary font-bold text-black": currentUser },
        "my-5 border-b border-b-primary"
      )}
      key={index}
    >
      <td>{index + 1}</td>
      <td>{item.user}</td>
      <td>{item.xp_rewarded}</td>
    </tr>
  );
}
