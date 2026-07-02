"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LockKeyhole, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
  ADMIN_CREDENTIALS,
  isAdminAuthenticated,
  loginAdmin,
} from "@/lib/admin-auth";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAdminAuthenticated()) {
      router.replace("/admin");
    }
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const success = loginAdmin(email.trim(), password);
    setLoading(false);

    if (success) {
      router.replace("/admin");
      return;
    }

    setError("Invalid email or password.");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-pink-50 via-white to-pink-50 px-4 dark:from-pink-950/20 dark:via-background dark:to-pink-950/20">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-3">
            <Image
              src="/images/logo.png"
              alt="DRHAWAVET"
              width={56}
              height={56}
              className="rounded-full"
            />
          </Link>
          <h1 className="mt-4 text-2xl font-bold">Admin Login</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Access the DRHAWAVET booking dashboard
          </p>
        </div>

        <Card className="overflow-hidden border-border/60 bg-white/80 shadow-xl backdrop-blur-md dark:bg-slate-900/80">
          <div className="h-1.5 bg-gradient-to-r from-pink-400 to-pink-300" />
          <CardContent className="p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@drhawavet.com"
                  required
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  required
                  className="rounded-xl"
                />
              </div>

              {error && (
                <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600 dark:bg-red-950/30 dark:text-red-300">
                  {error}
                </p>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="h-11 w-full rounded-full bg-gradient-to-r from-pink-400 to-pink-300 font-semibold hover:from-pink-500 hover:to-pink-400"
              >
                <LockKeyhole className="size-4" />
                {loading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            <div className="mt-6 rounded-2xl border border-pink-100 bg-pink-50/70 p-4 dark:border-pink-900 dark:bg-pink-950/30">
              <div className="mb-2 flex items-center gap-2 text-sm font-medium text-pink-600 dark:text-pink-300">
                <ShieldCheck className="size-4" />
                Demo credentials
              </div>
              <p className="text-sm text-muted-foreground">
                Email: {ADMIN_CREDENTIALS.email}
              </p>
              <p className="text-sm text-muted-foreground">
                Password: {ADMIN_CREDENTIALS.password}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
