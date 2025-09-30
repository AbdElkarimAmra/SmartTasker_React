import { createContext } from "react";
import { useState } from "react";

/**
 * The TasksContext is a context that stores the tasks and a function to update them.
 * It is used to share the tasks between different components.
 *
 * The TasksContext is created with the createContext hook from React.
 * The createContext hook takes an object with the default values for the context.
 * In this case, the default values are an empty array for the tasks and a no-op function for the setTasks function.
 *
 * The TasksContextProvider is a component that wraps the context provider around the children components.
 * It is used to provide the tasks and the setTasks function to the children components.
 *
 * The TasksContextProvider uses the useState hook to store the tasks in the state.
 * The useState hook takes an initial value for the state, which is an empty array in this case.
 * The useState hook returns an array with the current value of the state and a function to update the state.
 * In this case, the function to update the state is the setTasks function.
 */
export const TasksContext = createContext({
    tasks: undefined, //initial value for tasks property is set to undefined
    setTasks: () => {}, //initial value for setTasks property is set to a no-op function
});


export const TasksContextProvider = (props) => {
    const [tasks, setTasks] = useState([]);

    return (
        <TasksContext.Provider value={{tasks: tasks, setTasks: setTasks}}>
            {props.children}
        </TasksContext.Provider>
    )
}