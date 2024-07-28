import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface Props {
  children: ReactNode;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  title: string;
  linkHref: string;
  linkDescription: string;
}

export default function AuthFormLayout({ children, handleSubmit, title, linkHref, linkDescription }: Props) {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <img src="/logo.png" alt="logo" className="absolute z-10 w-11 left-2 bottom-5" />

        <div className="absolute inset-0 transform -skew-y-6 shadow-lg bg-gradient-to-r from-amber-300 to-amber-600 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-10">
          <div className="max-w-md mx-auto">
            <h1 className="z-20">{title}</h1>

            <form id="authForm" onSubmit={handleSubmit} className="py-8 space-y-4 leading-6 text-stone-700">
              {children}
              <div className="relative pt-2">
                <button type="submit" className="w-full px-2 py-1 text-white rounded bg-amber-500">
                  Submit
                </button>
              </div>
              {linkHref === "/register" ? (
                <div className="pt-2 text-sm text-center">
                  <a href="#">Forgot password?</a>
                </div>
              ) : null}
              <div className="pt-2 text-sm text-center">
                <Link to={linkHref}>{linkDescription}</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
