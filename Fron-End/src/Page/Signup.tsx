import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import api from "@/Utils/axios";

const formSchema = z.object({
    fullName: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
    password: z
        .string()
        .min(8, {
            message: "Password must be at least 8 characters.",
        })
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[0-9]/, "Password must contain at least one number"),
    terms: z.boolean().refine((val) => val === true, {
        message: "You must accept the terms and conditions.",
    }),
});

const Signup = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullName: "",
            email: "",
            password: "",
            terms: false,
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setError(null);
        setSuccess(null);
        setLoading(true);
        try {
            const { data } = await api.post("/api/auth/register", {
                fullName: values.fullName,
                email: values.email,
                password: values.password,
            });
            if (data.success) {
                setSuccess("Account created successfully. Redirecting to login...");
                setTimeout(() => navigate("/login"), 1500);
            } else {
                setError(data.message ?? "Registration failed");
            }
        } catch (err: unknown) {
            const msg =
                err && typeof err === "object" && "response" in err
                    ? (err as { response?: { data?: { message?: string } } }).response?.data
                        ?.message
                    : null;
            setError(msg ?? "Registration failed");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="w-full max-w-sm">
            <Form {...form}>
                <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="space-y-2 text-center">
                        <h1 className="font-bold text-2xl">Create an account</h1>
                        <p className="text-muted-foreground text-sm">
                            Sign up to get started with our platform
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
                        name="fullName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Full Name</FormLabel>
                                <FormControl>
                                    <Input className="bg-background" placeholder="John Doe" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
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
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input
                                        className="bg-background"
                                        placeholder="Create a strong password"
                                        type="password"
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription className="text-xs">
                                    Must contain uppercase, lowercase, and number
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="terms"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl>
                                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                    <FormLabel className="font-normal text-sm">
                                        I agree to the{" "}
                                        <a className="hover:underline" href="/terms">
                                            terms and conditions
                                        </a>
                                    </FormLabel>
                                    <FormMessage />
                                </div>
                            </FormItem>
                        )}
                    />
                    <Button className="w-full" type="submit" disabled={loading}>
                        {loading ? "Creating account..." : "Create Account"}
                    </Button>
                    <p className="text-center text-muted-foreground text-sm">
                        Already have an account?{" "}
                        <Link className="hover:underline" to="/login">
                            Sign in
                        </Link>
                    </p>
                </form>
            </Form>
        </div>
    );
};

export default Signup;
