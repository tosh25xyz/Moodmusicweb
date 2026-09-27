"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/lib/api";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const res = await api.post("/api/auth/login", form);
      localStorage.setItem("token", res.data.token);
      router.push("/mood");
    } catch (err: any) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || "Login failed. Check your credentials.");
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Log in</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" value={form.email} onChange={handleChange} required />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" value={form.password} onChange={handleChange} required />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit" className="mt-2">Log In</Button>
            <p className="text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link href="/auth/signup" className="underline">Sign up</Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}