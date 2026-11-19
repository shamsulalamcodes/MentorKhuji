import Link from "next/link";
import { LogoMark } from "../logo-mark";

export function AuthCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="w-full max-w-[460px] rounded-3xl bg-white px-6 py-10 shadow-xl shadow-indigo-100/60 ring-1 ring-black/5 sm:px-10">
      <div className="flex flex-col items-center">
        <Link href="/" aria-label="MentorLagbe home">
          <LogoMark className="size-14" />
        </Link>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900">
          {title}
        </h1>
      </div>
      <div className="mt-8">{children}</div>
    </div>
  );
}
