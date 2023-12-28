import { useWallet } from "@openformat/react";

interface WelcomeProps {
  handleRewards: () => void;
  isLoading: boolean;
}

export default function Welcome({
  handleRewards,
  isLoading,
}: WelcomeProps) {
  const { address } = useWallet();
  return (
    <section id="welcome" className="welcome">
      <div className="welcome__welcome">
        <h2 className="welcome__title">Play</h2>
        <div className="welcome__description">
          <p>
            Welcome to GetStarted! The components in this template
            encompass all the essentials developers require to craft
            engaging applications using OPENFORMAT's game framework.
          </p>
          <p>
            Whether you're connecting an existing wallet or opting to
            continue with a Guest wallet, you're all set to begin.
          </p>
          <p>
            Our architecture is modular, with each functionality
            encapsulated in separate components. This page serves as
            your starting point to craft your application or game
            logic.
          </p>
          <p>
            To integrate your actions and missions, refer to the Token
            System Usage Guide in the README.
          </p>
        </div>
      </div>

      <ul className="welcome__list">
        <li className="welcome__item">
          <h3 className="welcome__item-title">
            Trigger your first Action
          </h3>
          <p className="welcome__item-description">
            Trigger the test action to see it in your App Dashboard,
            Profile and Leaderboard.
          </p>
          {address && (
            <button onClick={handleRewards} disabled={isLoading}>
              {isLoading ? "Loading..." : "Trigger Test Action"}
            </button>
          )}
        </li>
      </ul>
    </section>
  );
}
