// src/pages/tasks.jsx
import { useContext, useEffect, useMemo, useState } from "react";
import { FilterBar } from "@/components/filterBar/filterBar.jsx";
import { Skeleton } from "@/components/ui/skeleton";
import { Task } from "@/components/task/task.jsx";
import { TaskSidebar } from "@/components/taskSidebar/taskSidebar.jsx";
import { TasksContext } from "@/context/tasks.context.jsx";
import { TasksCounter } from "@/components/tasksCounter/tasksCounter.jsx";
import { useFetchTasks } from "@/hooks/useFetchTasks.hook.js";
import { useSearchParams } from "react-router-dom";

// ✅ your hook (returns React Query result)
import { useDailyFocus } from "@/hooks/useDailyFocus.hook.js";
import { useCreateTask } from "@/hooks/useCreateTask.hook.js";


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
  const options = { weekday: "long", day: "numeric", month: "short", year: "numeric" };
  return today.toLocaleDateString("en-GB", options);
}

export default function Tasks() {
  const [searchParams] = useSearchParams();
  const queryLimit = searchParams.get("limit") ?? 5;
  const queryPage = searchParams.get("page") ?? 1;
  const queryOrder = searchParams.get("order") ?? "asc";

  const { tasks, setTasks } = useContext(TasksContext);
  const { data, isError, isSuccess, isPending, error } = useFetchTasks({
    order: queryOrder,
    limit: queryLimit,
    page: queryPage,
  });

  // 👇 use your hook as-is (auto-fetch on mount), and use refetch for the button
  const { data: focusData, isFetching: focusLoading, error: focusError, refetch: runDailyFocus } =
  useDailyFocus({});

const { mutate: createTask, isPending: createTaskLoading, error: createTaskError } = useCreateTask();

  // this is for getting the task bback from the backend create task endpoint. This is the JSON repsonse from the backend
  var taskDescription = "";

  // Local toggle so "Clear" hides the panel without touching the cache
  const [showFocus, setShowFocus] = useState(false);

  useEffect(() => {
    if (data) {
      setTasks(data);
      console.log("tasks were fetched successfully", data);
    }
  }, [data, setTasks]);

  // quick lookup for titles by id (to show nice names in the focus panel)
  const list = data?.data || [];
  const byId = useMemo(() => new Map(list.map(t => [String(t._id), t])), [list]);

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

            {/* Toolbar for Daily Focus */}
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm opacity-80">
                {isPending ? "Loading tasks…" : isError ? "Failed to load tasks" : ""}
              </div>
              <div className="flex gap-2">
                <button
                  className="px-3 py-2 rounded border"
                  disabled={focusLoading || isPending || !data}
                  onClick={async () => {
                    setShowFocus(true);
                    await runDailyFocus(); // triggers POST /AI/focus again
                  }}
                  title="Pick the 3 most impactful tasks for today"
                >
                  {focusLoading ? "Finding focus…" : "✨ Daily Focus"}
                </button>
                {showFocus && (
                  <button className="px-3 py-2 rounded border" onClick={() => setShowFocus(false)}>
                    Clear
                  </button>
                )}
              </div>
            </div>


            {/* Toolbar for Daily Focus */}
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm opacity-80">
          <input
  className="px-3 py-2 rounded border"
  type="text"
  placeholder="create task"
  onKeyDown={(e) => {
  if (e.key === "Enter") {
    const task = e.target.value.trim();

    if (!task) return;

    createTask({
      description: task,
    });

    e.target.value = "";
  }
}} 
/>
              </div>
            </div>

            {/* Focus panel */}
            {showFocus && focusData && (
              <div className="border rounded-md p-4 mb-6 bg-white/5">
                <h2 className="font-semibold mb-2 text-white">Today’s Focus</h2>
                <ol className="list-decimal ml-5 space-y-1 text-white">
                  {(focusData.picks || []).map((p) => {
                    const t = byId.get(String(p.taskId));
                    const title = t?.title || p.taskId;
                    return (
                      <li key={p.taskId}>
                        <span className="font-medium ">{title}</span>{" "}— {p.reason}
                      </li>
                    );
                  })}
                </ol>

                {focusData.microPlan && (
                  <>
                    <div className="mt-3 text-sm font-semibold text-white">First step plan:</div>
                    <ul className="list-disc ml-5 text-sm text-white">
                      {(focusData.microPlan.steps || []).map((s, i) => (
                        <li key={i}>{s}</li>
                      ))}
                    </ul>
                  </>
                )}

                {focusError && (
                  <div className="mt-3 text-red-300 text-sm">
                    Failed to get focus: {String(focusError.message || focusError)}
                  </div>
                )}
              </div>
            )}

            {data && <FilterBar />}

            {!data &&
              [...Array(Number(queryLimit))].map((_, index) => (
                <DisplaySkeleton key={`${index}skel`} />
              ))}

            {data && data.data &&
              data.data.map((task) => (
                <Task
                  key={task._id}
                  dueDate={task.dueDate ? new Date(task.dueDate) : null}
                  description={task.description}
                  status={task.status}
                  priority={task.priority}
                  title={task.title}
                  id={task._id}
                />
              ))}
          </div>
        </div>
      </section>
      <TaskSidebar />
    </section>
  );
}
