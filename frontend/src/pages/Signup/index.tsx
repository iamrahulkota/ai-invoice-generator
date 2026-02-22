import { Link, useNavigate } from "react-router";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { axiosInstance } from "@/config/axiosConfig";

const signupSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().min(1, "Email is required").email("Enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignupValues = z.infer<typeof signupSchema>;

export default function Signup() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: SignupValues) => {
    setIsSubmitting(true);
    try {
      await axiosInstance.post("/auth/signup", {
        name: data.name,
        email: data.email,
        password: data.password,
      });
      toast.success("Account created. You can sign in now.");
      navigate("/login", { replace: true });
    } catch (err: unknown) {
      const message =
        err &&
        typeof err === "object" &&
        "response" in err
          ? (err as { response?: { data?: { message?: string } } }).response?.data?.message
          : null;
      toast.error(message ?? "Sign up failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="grid divide-y divide-dashed divide-border lg:grid-cols-2 lg:divide-x lg:divide-y-0">
      <div className="flex flex-col gap-2 px-6 py-10 md:py-14">
        <h4 className="max-w-xl text-left font-regular text-3xl tracking-tighter md:text-5xl">
          Sign up for an account
        </h4>
        <p className="max-w-xl text-left text-lg text-muted-foreground leading-relaxed tracking-tight lg:max-w-lg">
          Already have an account?{" "}
          <Link className="underline" to="/login">
            Login
          </Link>
        </p>
      </div>

      <div className="flex w-full items-center px-6 py-10 md:py-14">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full max-w-md space-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Your name"
                      autoComplete="name"
                      {...field}
                    />
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
                      type="email"
                      placeholder="you@example.com"
                      autoComplete="email"
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
                      type="password"
                      placeholder="••••••••"
                      autoComplete="new-password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      autoComplete="new-password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                "Create account"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </section>
  );
}
