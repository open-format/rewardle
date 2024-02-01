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
      <table className="min-w-full divide-y divide-gray-300" aria-live="polite">
        <thead>
          <tr role="row">
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
            <tr key={index}>
              <td className="leaderboard-position">{index + 1}</td>
              <td className="leaderboard-user">{item.user}</td>
              <td className="leaderboard-xp">{item.xp_rewarded}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
