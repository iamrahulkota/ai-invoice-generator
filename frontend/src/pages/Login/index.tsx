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
import { load_user_data, login_user, set_isAuthenticated } from "@/redux/Action/actions";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginValues = z.infer<typeof loginSchema>;

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });


  const getUserDetails = async (userId: string) => {
    try {
      await load_user_data(dispatch, userId);
      navigate("/dashboard", { replace: true });
    }
    catch (e: any) {

    }
  }

  const onSubmit = async (data: LoginValues) => {
    setIsSubmitting(true);
    try {
      const response = await login_user(data);
      if (response?.meta?.status && response?.data?.token) {
        localStorage.setItem('token', response.data.token);
        set_isAuthenticated(dispatch, true);
        const decodedToken: any = jwtDecode(response.data.token);
        const user_data = {
          ...decodedToken,
        };
        dispatch({type: 'USER', payload: user_data});
      } else {
        toast.error("Invalid response from server");
      }
    } catch (err: unknown) {
      const message = err && typeof err === "object" && "response" in err
        ? (err as { response?: { data?: { message?: string } } }).response?.data?.message
        : null;
      toast.error(message ?? "Login failed. Please check your credentials.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="grid divide-y divide-dashed divide-border lg:grid-cols-2 lg:divide-x lg:divide-y-0">
      <div className="flex flex-col gap-2 px-6 py-10 md:py-14">
        <h4 className="max-w-xl text-left font-regular text-3xl tracking-tighter md:text-5xl">
          Login to your account
        </h4>
        <p className="max-w-xl text-left text-lg text-muted-foreground leading-relaxed tracking-tight lg:max-w-lg">
          Don&apos;t have an account?{" "}
          <Link className="underline" to="/signup">
            Sign up
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
                      autoComplete="current-password"
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
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </section>
  );
}
