"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useSession } from "next-auth/react";


export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        if (res?.error) {
            alert("Invalid credentials");
        } else {
            // Redirect to dashboard after successful login
            window.location.href = "/dashboard";
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <Card className="p-8 rounded-2xl shadow-xl w-full max-w-sm text-center space-y-6">
                <h1 className="text-2xl font-semibold">Sign in to SmartTodo</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            required
                        />
                    </div>
                    <div>
                        <Input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            required
                        />
                    </div>
                    <Button type="submit" className="w-full">Sign in</Button>
                </form>
            </Card>
        </div>
    );
}