import { useContext, useEffect, useState } from "react";

import { FilterBar } from "@/components/filterBar/filterBar.jsx";
import { Skeleton } from "@/components/ui/skeleton";
import { Task } from "@/components/task/task.jsx";
import { TaskSidebar } from "@/components/taskSidebar/taskSidebar.jsx";
import { TasksContext } from "@/context/tasks.context.jsx";
import { TasksCounter } from "@/components/tasksCounter/tasksCounter.jsx";
import { useFetchTasks } from "@/hooks/useFetchTasks.hook.js";
import { useSearchParams } from "react-router-dom";

function DisplaySkeleton() {
  return (
    <div className="flex items-center space-x-4 mb-12">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[500px]" />
        <Skeleton className="h-4 w-[400px]" />
      </div>
    </div>
  );
}


function todaysDate() {
  const today = new Date();

  // Define options for toLocaleDateString()
  const options = {
    weekday: "long", // full name of the day
    day: "numeric", // numeric day
    month: "short", // abbreviated month
    year: "numeric", // numeric year
  };

  // Format the date
  const formattedDate = today.toLocaleDateString("en-GB", options);
  return formattedDate;
}

export default function Tasks() {
  const [searchParams, setSearchParams] = useSearchParams();
  /* We are now able to grab the query params on this page */
  let queryLimit = searchParams.get("limit") ?? 5;
  let queryPage = searchParams.get("page") ?? 1;
  let queryOrder = searchParams.get("order") ?? "asc";

  const { tasks, setTasks } = useContext(TasksContext);

  const { data, isError, isSuccess, isPending, error } = useFetchTasks({
    order: queryOrder,
    limit: queryLimit,
    page: queryPage,
  });

  useEffect(() => {
    if (data) {
      setTasks(data);
    }
  }, [data]);

  return (
    <section className="flex flex-row w-full p-4 gap-8">
      <section className="flex basis-2/3 justify-center ">
        <div className="flex flex-col w-4/5 p-4 items-center">
          <h1 className="text-white font-bold text-2xl mb-8 w-full">
            {`Tasks On, ${todaysDate()}`}
          </h1>
          <div className="w-11/12 flex flex-col">
            <div className="flex justify-between mb-16">
              <TasksCounter
                count={tasks.pagination ? tasks.pagination.meta.countTodoTasks : 0}
                type="todo"
              />
              <TasksCounter
                count={tasks.pagination ? tasks.pagination.meta.countInProgressTasks : 0}
                type="inProgress"
              />
              <TasksCounter
                count={tasks.pagination ? tasks.pagination.meta.countCompletedTasks : 0}
                type="completed"
              />
            </div>

            {data && <FilterBar />}

            {!data &&
              [...Array(queryLimit)].map((entry, index) => (
                <DisplaySkeleton key={`${index}skel`} />
              ))}
            
            {data && data.data &&
              data.data.filter(task => task.status !== "completed").map((task) => (
                <Task
                  key={task["_id"]}
                  dueDate={new Date(task.dueDate)}
                  description={task.description}
                  status={task.status}
                  priority={task.priority}
                  title={task.title}
                  id={task["_id"]}
                />
              ))}
          </div>
        </div>
      </section>
      <TaskSidebar />
    </section>
  );
}