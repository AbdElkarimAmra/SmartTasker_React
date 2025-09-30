import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { LoginSchema } from "@/schema/login.schema.js";
import { Toaster } from "@/components/ui/toaster";
import { useForm } from "react-hook-form";
import { useLogin } from "@/hooks/useLogin.hook.js";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";

export default function Login() {
  const { mutate, isLoading, isError, isSuccess } = useLogin();
  const navigate = useNavigate();
  const [login, setLogin] = useState(false);
  const { toast } = useToast();

  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  /** Function to handle what will happen when the form is submitted */
  function onSubmit(values) {
    mutate(values);
    form.reset();
  }

  useEffect(() => {
    if (isSuccess) {
      setLogin(true);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (login) {
      navigate("/tasks");
    }
  }, [login]);

  /* Use Effect for error */
  useEffect(() => {
    /* Setup code */
    if (isError) {
      toast({
        title: "Uh Ho! Your request failed",
        description: "Please check your login credentials",
        variant: "destructive",
      });
    }
  }, [isError]);

  return (
    <section className="flex flex-row max-w-screen-xl min-h-screen w-full justify-center items-center">
      <div className="w-4/12">
        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>Login and Create Tasks</CardDescription>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormControl>
                        <Input placeholder="Email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter className="flex flex-row justify-between">
                <p className="basis-1/2">
                  Don't have an account?{" "}
                  <Link
                    className="text-blue-500 hover:text-blue-700"
                    to="/signup"
                  >
                    Signup Here
                  </Link>
                </p>
                <Button type="submit">Login</Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </div>
      <Toaster />
    </section>
  );
}