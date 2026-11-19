"use client";

import * as React from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type AuthInputProps = React.ComponentProps<typeof Input> & {
  label: string;
};

export function AuthInput({ label, id, className, ...props }: AuthInputProps) {
  return (
    <div>
      <Label htmlFor={id} className="sr-only">
        {label}
      </Label>
      <Input
        id={id}
        placeholder={label}
        className={cn(
          "h-14 rounded-2xl border-0 bg-slate-50 px-5 text-base font-medium shadow-none",
          "placeholder:font-medium placeholder:text-slate-400",
          "focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-0",
          className
        )}
        {...props}
      />
    </div>
  );
}

export function PasswordInput(props: AuthInputProps) {
  const [show, setShow] = React.useState(false);

  return (
    <div className="relative">
      <AuthInput {...props} type={show ? "text" : "password"} className="pr-14" />
      <button
        type="button"
        onClick={() => setShow((s) => !s)}
        aria-label={show ? "Hide password" : "Show password"}
        className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-slate-600"
      >
        {show ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
      </button>
    </div>
  );
}
