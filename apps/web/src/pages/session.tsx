import { useEffect, useRef } from "react";
import { TanksGame } from "@droid-arena/tanks-game";

export const Session = (props: { sessionId: string }) => {
  const { sessionId } = props;
  console.log(sessionId);
  const gameHostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (gameHostRef.current) {
      const game = new TanksGame(gameHostRef.current, {
        enableSound: false,
        debug: true,
      });
      game.initialize();
      game.runGameLoop();
    }
  }, []);

  return <div className="size-full relative border" ref={gameHostRef} />;
};

