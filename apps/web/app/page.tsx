import { tanksGame } from "@droid-arena/tanks";
import { volleyGame } from "@droid-arena/volley";

export default function Home() {
  tanksGame();
  volleyGame();
  return <div className="size-full bg-blue-500">Select game</div>;
}

