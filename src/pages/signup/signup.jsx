import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
 
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { SignupSchema } from "@/schema/signup.schema";

import { useSignup } from "@/hooks/useSignup.hook";
import { useEffect } from "react";
import { use } from "react";
import { is } from "date-fns/locale";
import {Toaster} from "@/components/ui/toaster"
import { useToast } from "@/hooks/use-toast";



function LoginRedirect(){
  return (
    <Button variant="secondary" asChild>
    <Link to="/"> Login here </Link>
    </Button>
  );
}


export default function Signup() {
  const {mutate, isPending, isError, isSuccess } = useSignup();
  const {toast} = useToast();

  const form = useForm({
    resolver: zodResolver(SignupSchema),
  })

  function onSubmit (values) {
    mutate(values);
    form.reset();
  }

  useEffect(() => { // this function is triggered when isSuccessful variable changes. if the array was empty, it would run on every render
    if (isSuccess) {
      //load toast
      toast({
        title: "User Created Successfully",
        description: "You can now login and start creating tasks",
        action: <LoginRedirect />
      })
      form.reset();
    }
    
  },[isSuccess])

  useEffect(() => { // this function is triggered when isError variable change(if an error occurs). if the array was empty, it would run on every render
    if (isError) {
      //load toast for succesful signup
      toast({
        title: "Uh no! Something went wrong",
        description: "possibly the user already exists",
        variant: "destructive",
      })
      form.reset();
    }
    
  },[isError])
  return (
    <section className="flex flex-row max-w-screen-xl min-h-screen w-full justify-center items-center">
      <div className="w-4/12">
        <Card>
          <CardHeader>
            <CardTitle>Signup</CardTitle>
            <CardDescription>
              Create a new account to start creating tasks
            </CardDescription>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent>
            <FormField
              control = {form.control}
              name = "firstName" //this should match the anme in the schema
              render = {({field})=>(
                <FormItem>
                  <FormControl className="mb-4">
                    <Input type="text" placeholder="First Name" {...field} value={field.value ?? ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control = {form.control}
              name = "lastName"
              render = {({field})=>(
                <FormItem>
                  <FormControl className="mb-4">
                    <Input type="text" placeholder="Last Name" {...field} value={field.value ?? ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control = {form.control}
              name = "email"
              render = {({field})=>(
                <FormItem>
                  <FormControl className="mb-4">
                    <Input type="text" placeholder="Email" {...field} value={field.value ?? ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}  
            />
            <FormField
              control = {form.control}
              name = "password"
              render = {({field})=>(
                <FormItem>
                  <FormControl className="mb-4">
                    <Input type="password" placeholder="Password" {...field} value={field.value ?? ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex flex-row justify-between">
            <p className="basis-1/2">
              Already have an account?{" "}
              <Link className="text-blue-500 hover:text-blue-700" to="/">
                Login Here
              </Link>
            </p>
            <Button type="submit">Signup</Button>
          </CardFooter>
          </form>
          </Form>
        </Card>
      </div>
      <Toaster />
    </section>
  );
}
