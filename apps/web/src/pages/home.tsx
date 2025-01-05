import { Card } from "../components/buttonCard";
import { Link } from "react-router";

export const Home = () => {
  return (
    <div className="size-full grid place-items-center">
      <div className="grid grid-cols-2 gap-4">
        <Link to="/hotseat/session">
          <Card title="Hotseat" description="Play with friends locally" />
        </Link>
        <Link to="/local/game">
          <Card title="Play vs AI" description="Play against the AI" />
        </Link>
        <Link to="/create/game">
          <Card
            title="Create Room"
            description="Create a room and play with friends"
          />
        </Link>
        <Link to="/join/lobby">
          <Card
            title="Join Room"
            description="Join a room and play with friends"
          />
        </Link>
      </div>
    </div>
  );
};

