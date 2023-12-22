import { ConnectButton } from "@openformat/react";

export default function Nav() {
  return (
    <header>
      <ConnectButton />
      <img src="logo.png" id="logo" alt="Logo" />
      <span className="company-name">Hyper-Wordle</span>
      <h1>Let's Play Hyper-Wordle</h1>
      <p>Are you good enough to be in the top 5%?</p>
      <nav>
        <ul>
          <li>
            <a href="/game">➡ PLAY</a>
          </li>
          <li>
            <a href="/quests">Quests</a>
          </li>
          <li>
            <a href="/leaderboard">Leaderboard</a>
          </li>
          <li>
            <a href="/">Profile</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
