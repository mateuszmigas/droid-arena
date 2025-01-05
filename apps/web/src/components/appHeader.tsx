import { Link } from "react-router";

export const AppHeader = () => {
  return (
    <div className="bg-black border h-16">
      <nav>
        <Link to="/">Home</Link>
      </nav>
    </div>
  );
};

