import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useUpdateTask } from "@/hooks/useUpdateTask.hook"
import { useState, useEffect } from "react"
import { useQueryClient } from "@tanstack/react-query"

export function Task(props) {
  const {mutate, isSuccess, isError} = useUpdateTask();
  const [progress, setProgress] = useState(false);
  const queryClient = useQueryClient();
  const {
    id,
    title = "this is the defailt title",
    description = "this is the default description",
    status = "todo",
    priority = "normal",
    dueDate = new Date("2025-09-05T00:30:43+00:00"),
  } = props;

  let formattedDate = dueDate.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });


  useEffect(() => {
    if(status === "inProgress") {
      setProgress(true);
    }
  }, [status])

  function handleCompleteTask() {
    mutate({_id: id, status: "completed"});
    queryClient.invalidateQueries({
    queryKey: ["fetchTasks"],
    refetchType: "all",
    });    
  }

  function handleProgressChange(value) {
    setProgress(value);
    mutate({_id: id, status: value ? "inProgress" : "todo"});
    queryClient.invalidateQueries({
    queryKey: ["fetchTasks"],
    refetchType: "all",
    });    
  }


  return (
    <Card className="w-full mb-8">
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle className="basis-2/3">{title}</CardTitle>
        <div>
          <Badge className="mr-2" variant="outline">{formattedDate}</Badge>
          <Badge 
          className={`
          ${priority==="normal"&&"bg-green-500"} 
          ${priority==="high"&&"bg-red-500"} 
          ${priority==="low"&&"bg-orange-500"}`} 

          variant="outline">
            {priority==="normal"&&"Normal"} 
            {priority==="high"&&"High"} 
            {priority==="low"&&"Low"}
            </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription>
          {description}
        </CardDescription>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="button" className="w-full" onClick={handleCompleteTask}>
          Completed
        </Button>
      </CardFooter>
      <div className="flex flex-row"> 
        <Switch 
        checked = {progress}
        onCheckedChange = {(value) => {handleProgressChange(value)}}
        id="in-progress" />
        <Label className="ml-2 mt-1">In Progress</Label>
      </div>
    </Card>
  )
}
