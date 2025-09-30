import { useState, useContext, useEffect } from "react"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


import { TasksContext } from "@/context/tasks.context"
import { exctractQueryString } from "@/lib/extractQueryString";
import { useNavigate } from "react-router-dom";



export function OrderSelect(){
    
    const {tasks, setTasks} = useContext(TasksContext);
    const [currentOrder, setOrder] = useState();
    
    const order = tasks?.pagination?.links?.next ? exctractQueryString(tasks.pagination.links.next).get("order") : undefined;
    
    const [query, setQuery] = useState();
    const navigate = useNavigate();

   useEffect(() => {
    if (tasks?.pagination?.links?.current) {
        let currentPage = exctractQueryString(tasks.pagination.links.current); 
        let query = currentPage ? `/tasks?page=${currentPage.get("page")}&limit=${currentPage.get("limit")}` : undefined;
        setQuery(query);
    }
  }, [tasks]);


    useEffect(() => {

        if (currentOrder && query) {
            navigate(`${query}&order=${currentOrder}`);  
        }

         if (currentOrder && !query) {
            navigate(`/tasks?order=${currentOrder}`);  
        }
    }, [currentOrder]);


    return(
        <Select
        value={currentOrder ?? order}
        onValueChange={(value) => setOrder(value)}>
            <SelectTrigger className="w-[140px] text-white">
                <SelectValue placeholder="Select Order"/>
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="asc">Asc</SelectItem>
                <SelectItem value="dsc">Dsc</SelectItem>
            </SelectContent>
        </Select>
    )
}