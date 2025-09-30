export function TasksCounter({type = "todo", count =0 } = props) {
    return (
        <div className="flex flex-col justify-center items-center">
            <div className={`p-6 border-solid 
                ${type ==="todo" && "border-red-500"} 
                ${type==="completed" && "border-green-500"} 
                ${type==="inProgress" && "border-orange-500"}
                border-4 rounded-full mb-4`}>
                <div className="min-w-10 min-h-10 text-white text-3xl text-center flex justify-center leading-10">
                    {count}
                </div>
            </div>
            {type === "todo" && <div className="text-white text-center">To Do</div>}
            {type === "completed" && <div className="text-white text-center">Completed</div>}
            {type === "inProgress" && <div className="text-white text-center">In Progress</div>}
        </div>
    );
}