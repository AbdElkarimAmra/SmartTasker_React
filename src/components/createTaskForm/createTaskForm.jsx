import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import { CreateTaskSchema } from "@/schema/createTaskSchema";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
/* Datepicker imports */
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateTask } from "@/hooks/useCreateTask.hook";
import { useEffect } from "react";
import { Toaster } from "../ui/toaster";
import{ useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";

export  function CreateTaskForm() {
  const [date, setDate] = useState();
  const { mutate, isError, isSuccess, isPending } = useCreateTask();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(CreateTaskSchema),
  });

  /** Function to handle what will happen when the form is submitted */
  /**
   * This function will be called when the form is submitted.
   * It takes the values from the form and sends a mutation request to the server
   * with the createTask hook. The dueDate is converted to an ISO string, which
   * is the format the server expects.
   */
  function onSubmit(values) {
    // Convert the dueDate to an ISO string, which is the format the server expects
    let dueDate = values.dueDate.toISOString();

    // Send a mutation request to the server with the createTask hook
    mutate({ ...values, dueDate });

    // Reset the form to its initial state
    form.reset();
    queryClient.invalidateQueries({
      queryKey: ["fetchTasks"],
      refetchType: "all",
    });
  }

  useEffect(() => {
    if (isSuccess) {
      //load toast
      toast({
        title: "Task Created Successfully",
        description: "Your task has been created",
      })
    }
  },[isSuccess])

    useEffect(() => {
    if (isError) {
      toast({
        title: "Oh no! Your request failed",
        description: "Please check your login credentials and try again",
        variant: "destructive",
      })
    }
  },[isError])
  
  return (
    <div>
      <h2 className="text-xl mb-4">Create a new task</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="py-2">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Task Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-row justify-between py-2">
            <div className="w-full mr-2">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="todo">Todo</SelectItem>
                          <SelectItem value="inProgress">
                            In Progress
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full ml-2">
              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Priority" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="normal">Normal</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="py-2">
            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-4" />
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a due date</span>
                          )}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < new Date() || date < new Date("2024-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="py-2">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea placeholder="Task Description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="py-2 flex justify-end">
            <Button>Create Task</Button>
          </div>
        </form>
      </Form>
      < Toaster />
    </div>
  );
}