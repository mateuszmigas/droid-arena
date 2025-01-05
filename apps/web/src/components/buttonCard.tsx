export const Card = (props: {
  title: string;
  description: string;
  className?: string;
  disabled?: boolean;
}) => {
  return (
    <button
      type="button"
      className={`text-white p-4 rounded-lg border w-96 h-48 flex flex-col justify-between ${
        props.disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-500"
      } ${props.className}`}
      disabled={props.disabled}
    >
      <h2 className="text-2xl font-bold">{props.title}</h2>
      <p className="text-gray-600">{props.description}</p>
    </button>
  );
};

