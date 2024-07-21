import { Link, useRouteError } from "react-router-dom";

type IRouteError = {
  statusText?: string;
  message?: string;
};

export default function NotFoundPage() {
  const error = useRouteError() as IRouteError;

  if (!error) return null;

  return (
    <section className="flex items-center justify-center w-screen h-screen bg-midnight">
      <div className="max-w-screen-xl px-4 py-8 mx-auto lg:py-16 lg:px-6">
        <div className="max-w-screen-sm mx-auto text-center">
          <h1 className="mb-4 font-extrabold tracking-tight text-7xl lg:text-9xl text-oranje">404</h1>
          <p className="mb-4 text-3xl tracking-tight text-oranje md:text-4xl">Something's missing.</p>
          <p className="mb-4 text-lg font-light text-ash">
            Sorry, we can't find that page. You'll find lots to explore on the home page.
          </p>
          <Link
            to="/"
            className="inline-flex text-midnight bg-oranje hover:font-semibold rounded hover:no-underline text-sm px-5 py-2.5 text-center my-4"
          >
            Back to Homepage
          </Link>
        </div>
      </div>
    </section>
  );
}
