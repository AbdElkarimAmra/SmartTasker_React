import {Card} from "@/components/ui/card";
import styles from "./taskSidebar.module.css";
import { UserProfile } from "../userProfile/userProfile";
import { CreateTaskForm } from "../createTaskForm/createTaskForm.jsx";
import { Logout } from "../logout/logout";
import { TasksContext } from "@/context/tasks.context";
import {useContext} from "react";
import Cookies from "js-cookie";
export function TaskSidebar() {
  const {tasks, setTasks} = useContext(TasksContext); 
  const user = Cookies.get("user");
  const parsedUserCookie = JSON.parse(user);
    return (
        <section className={`fixed right-4 top-4 ${styles.sidebarHeight}`}>
            <Card className="flex flex-col h-full w-full p-6 justify-between">
                <UserProfile firstName= {parsedUserCookie? parsedUserCookie.firstName : "Anonymous"} />

                <CreateTaskForm />
                
                <Logout />
            </Card>
        </section>
    );
}