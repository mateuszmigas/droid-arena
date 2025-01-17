import { Card } from "@/components/ui/card";
import { Link } from "react-router";

export const Home = () => {
  const games = [
    {
      title: "Hotseat",
      description: "Play with friends locally",
      path: "/hotseat/session",
      image: "/hotseat.png",
    },
    {
      title: "Play vs AI",
      description: "Play against the AI",
      path: "/local/game",
      image: "/player_vs_ai.png",
    },
    {
      title: "Create Room",
      description: "Create a room and play with friends",
      path: "/create/game",
      image: "/create_room.png",
    },
    {
      title: "Join Room",
      description: "Join a room and play with friends",
      path: "/join/lobby",
      image: "/join_room.png",
    },
  ];

  return (
    <div className="size-full flex flex-col items-center justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {games.map((game) => (
          <Link key={game.path} to={game.path}>
            <Card className="hover:bg-accent/10 transition-all hover:scale-105 w-80 relative group">
              <div className="aspect-square relative overflow-hidden rounded-lg">
                <img
                  src={game.image}
                  alt={game.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/70 to-transparent transition-opacity group-hover:opacity-80" />

                <div className="absolute inset-0 flex flex-col justify-center items-center text-center">
                  <div className="bg-black/50 backdrop-blur-sm rounded-lg p-4 w-full">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {game.title}
                    </h3>
                    <p className="text-gray-200">{game.description}</p>
                  </div>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

