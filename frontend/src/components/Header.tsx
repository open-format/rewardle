import { useLogin, useLogout, usePrivy } from "@privy-io/react-auth";
import { APP_NAME, TOKEN_NAME } from "constants/global";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useProfileStore } from "stores";
import { useGameStore } from "stores/game";
import apiClient from "utils/apiClient";
import handleRewards from "utils/handleRewards";
import { Button, IconButton } from "./Button";
import Link from "./Link";
import { BarChartIcon, HelpIcon, PaywallIcon } from "./icons";

export default function Header() {
  const { user, ready } = usePrivy();
  const { profileData, resetProfileData, updateProfileData } =
    useProfileStore();
  const { state: gameState, actions: gameActions } = useGameStore();

  const { login } = useLogin({
    onComplete: async (user, isNewUser, wasAlreadyAuthenticated) => {
      if (user?.wallet?.address && isNewUser) {
        await apiClient
          .post("/account/fund", {
            address: user.wallet.address,
          })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      }
      updateProfileData();
      if (user?.wallet?.address && !wasAlreadyAuthenticated) {
        await handleRewards(user?.wallet?.address, "login", updateProfileData);
      }
    },
  });
  const router = useRouter();

  const { logout } = useLogout({
    onSuccess() {
      resetProfileData();
      router.push("/");
      toast.success("You have been logged out");
      console.log("Logout complete!");
    },
  });

  return (
    <header className="grid w-full grid-rows-1 items-center bg-opacity-50 lg:grid-cols-3">
      <nav className="my-3 space-x-2 px-2 text-center lg:text-left">
        <Link href="/">Play</Link>
        <Link href="/leaderboard">Leaderboard</Link>
        {profileData && <Link href="/profile">Profile</Link>}
        <Link href="/quests">Quests</Link>
      </nav>
      <div className="row-start-1 justify-self-center lg:row-auto">
        <Link href="/">
          <h1>{APP_NAME}</h1>
        </Link>
      </div>
      <div className="flex flex-col items-center space-x-2 space-y-2 lg:flex-row lg:space-y-0 lg:justify-self-end">
        <div className="flex space-x-2">
          {profileData?.xp_balance && (
            <span className="whitespace-nowrap">
              <strong>{profileData?.xp_balance} XP</strong>
            </span>
          )}
          {profileData?.reward_token_balance && (
            <span className="whitespace-nowrap">
              <strong>
                {" "}
                {profileData?.reward_token_balance} ${TOKEN_NAME}{" "}
              </strong>
            </span>
          )}
        </div>
        <div className="fixed right-2 top-2 flex flex-col items-center space-y-2 lg:relative lg:right-0 lg:top-0 lg:flex-row  lg:space-x-2 lg:space-y-0">
          {gameState.status !== "new" && (
            <IconButton onClick={() => gameActions.openModal("paywall")}>
              <PaywallIcon />
            </IconButton>
          )}
          <IconButton onClick={() => gameActions.openModal("help")}>
            <HelpIcon />
          </IconButton>
          <IconButton onClick={() => gameActions.openModal("stats")}>
            <BarChartIcon />
          </IconButton>
        </div>
        <div className="items-center lg:relative lg:flex lg:p-2">
          {!ready ? (
            <div
              className="pointer-events-none inline-block h-4 w-4 animate-spin rounded-full border-[3px] border-current border-t-transparent text-white"
              role="status"
              aria-label="loading"
            >
              <span className="sr-only">Loading...</span>
            </div>
          ) : user?.wallet?.address ? (
            <Button onClick={logout}>Logout</Button>
          ) : (
            <Button onClick={login}>Login/signup</Button>
          )}
        </div>
      </div>
    </header>
  );
}
