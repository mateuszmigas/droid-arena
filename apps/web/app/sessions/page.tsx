"use client";

import { tanksGame } from "@droid-arena/tanks";
import { useEffect } from "react";

export default function Page() {
  useEffect(() => {
    tanksGame();
  }, []);

  return <div>Sessions</div>;
}

