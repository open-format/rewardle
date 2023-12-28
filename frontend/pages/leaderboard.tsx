import { LeaderboardEntry } from "@/@types";
import Leaderboard from "@/components/Leaderboard";
import apiClient from "@/utils/apiClient";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";

export default function LeaderboardPage() {
  const startOfWeek = dayjs().startOf("week");
  const endOfWeek = startOfWeek.endOf("week");

  const { data: leaderboardData, isLoading } = useQuery({
    queryKey: ["leaderboard"],
    queryFn: fetchLeaderboard,
  });

  async function fetchLeaderboard(): Promise<LeaderboardEntry[]> {
    return await apiClient
      .get("/leaderboard")
      .then((res) => res.data.data)
      .catch((err) => console.log({ err }));
  }

  return (
    <section>
      <h2>Leaderboard</h2>
      <h3>
        Positions for this week ({startOfWeek.format("DD/MM")} -{" "}
        {endOfWeek.format("DD/MM")})
      </h3>
      <Leaderboard data={leaderboardData} isLoading={isLoading} />
    </section>
  );
}
