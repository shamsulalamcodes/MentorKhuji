"use client";

import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { Button } from "@/components/ui/button";

type SocialButtonsProps = {
  /** "Sign up" or "Log in" - used in the button labels */
  verb: string;
  onGoogle?: () => void;
  disabled?: boolean;
};

const socialClass =
  "relative h-14 w-full rounded-full bg-slate-50 text-base font-semibold text-slate-900 shadow-none hover:bg-slate-100";

export function SocialButtons({
  verb,
  onGoogle,
  disabled,
}: SocialButtonsProps) {
  return (
    <div className="space-y-3">
      <Button
        type="button"
        variant="secondary"
        disabled={disabled}
        onClick={onGoogle}
        className={socialClass}
      >
        <FcGoogle className="absolute left-6 size-6" />
        {verb} with Google
      </Button>
    </div>
  );
}
