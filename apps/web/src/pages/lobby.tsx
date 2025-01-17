import { lobby } from "../api.ts";
import { useQuery } from "@tanstack/react-query";

export const Lobby = () => {
  const { data, isLoading, error } = useQuery({
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

