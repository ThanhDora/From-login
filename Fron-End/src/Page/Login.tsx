import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import api from "@/Utils/axios";
import { setAuth } from "@/Utils/auth";

const formSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters.",
    }),
});

const Login = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setError(null);
        setSuccess(null);
        setLoading(true);
        try {
            const { data } = await api.post("/api/auth/login", values);
            if (data.success && data.data) {
                setAuth(data.data);
                setSuccess("Login successful. Redirecting...");
                setTimeout(() => navigate("/profile"), 1500);
            } else {
                setError(data.message ?? "Login failed");
            }
        } catch (err: unknown) {
            const msg =
                err && typeof err === "object" && "response" in err
                    ? (err as { response?: { data?: { message?: string } } }).response?.data
                        ?.message
                    : null;
            setError(msg ?? "Invalid credentials");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="w-full max-w-sm">
            <Form {...form}>
                <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="space-y-2 text-center">
                        <h1 className="font-bold text-2xl">Welcome back</h1>
                        <p className="text-muted-foreground text-sm">
                            Enter your credentials to access your account
                        </p>
                    </div>
                    {error && (
                        <Alert variant="destructive">
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}
                    {success && (
                        <Alert variant="success">
                            <AlertTitle>Success</AlertTitle>
                            <AlertDescription>{success}</AlertDescription>
                        </Alert>
                    )}
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        className="bg-background"
                                        placeholder="you@example.com"
                                        type="email"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex items-center justify-between">
                                    <FormLabel>Password</FormLabel>
                                    <a className="text-muted-foreground text-sm hover:underline" href="#">
                                        Forgot password?
                                    </a>
                                </div>
                                <FormControl>
                                    <Input
                                        className="bg-background"
                                        placeholder="Enter your password"
                                        type="password"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button className="w-full" type="submit" disabled={loading}>
                        {loading ? "Signing in..." : "Sign In"}
                    </Button>
                    <p className="text-center text-muted-foreground text-sm">
                        Don&apos;t have an account?{" "}
                        <Link className="hover:underline" to="/signup">
                            Sign up
                        </Link>
                    </p>
                </form>
            </Form>
        </div>
    );
};

export default Login;
