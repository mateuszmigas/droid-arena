import { Link } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Trophy, Users, Gamepad2, Crown, Bell } from "lucide-react";
import { Button } from "./ui/button";

const getNavigationLinks = () => [
  {
    to: "/",
    label: "Home",
    icon: <Gamepad2 className="w-4 h-4" />,
  },
  {
    to: "/leaderboard",
    label: "Leaderboard",
    icon: <Trophy className="w-4 h-4" />,
  },
  {
    to: "/tournaments",
    label: "Tournaments",
    icon: <Crown className="w-4 h-4" />,
  },
  {
    to: "/players",
    label: "Players",
    icon: <Users className="w-4 h-4" />,
  },
];

export const AppHeader = () => {
  return (
    <nav className="flex items-center justify-between h-16 px-4">
      <div className="flex items-center gap-2">
        {getNavigationLinks().map((link) => (
          <Link
            key={link.label}
            to={link.to}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
          >
            {link.icon}
            {link.label}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center">
            2
          </span>
        </Button>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </nav>
  );
};

