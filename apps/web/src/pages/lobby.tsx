import { useQuery } from "@tanstack/react-query";
import { lobby } from "../api.ts";

export const Lobby = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["rooms"],
    queryFn: () => lobby.rooms.get(),
  });

  return (
    <div>
      <h1>Lobby</h1>
      <p>{isLoading ? "Loading..." : data?.data}</p>
    </div>
  );
};
