import { Link } from "react-router-dom";

interface NoDataProps {
  title: string;
  message: string;
  additionalMessage?: string;
}

export function NoData({ title, message, additionalMessage }: NoDataProps) {
  return (
    <div className="flex flex-col items-center justify-center mt-8 text-center">
      <h2 className="mb-4 text-xl font-semibold text-marine">{title}</h2>
      <p className="text-marine">{message}</p>
      {additionalMessage && <p className="mb-4 text-marine">{additionalMessage}</p>}
      <Link to="/form" className="my-4 text-blue-500 hover:text-blue-700">
        Go to Employee Form Page
      </Link>
    </div>
  );
}
