import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

import { useContext, useState, useEffect } from "react";
import { TasksContext } from "@/context/tasks.context";
import { exctractQueryString } from "@/lib/extractQueryString";
export function TasksPagination() {
  const [links, setLinks] = useState();
  const [meta, setMeta] = useState();
  const {tasks, setTasks} = useContext(TasksContext);

  const previousPage = links?.previous ? exctractQueryString(links.previous).toString() : "#";
  const nextPage = links?.next ? exctractQueryString(links.next).toString() : "#";
  const order = links?.next ? exctractQueryString(links.next).get("order") : "asc";
  
 useEffect(() => {
    if (tasks && tasks.pagination) {
      setLinks(tasks.pagination.links ?? null);
      setMeta(tasks.pagination.meta ?? null);
    }
  }, [tasks]);
  console.log("previious page",previousPage)
  console.log("next page",nextPage)
  console.log(meta);

  return (
    <Pagination>
      <PaginationContent className="text-white">
        <PaginationItem>
          <PaginationPrevious to={`tasks?${previousPage}`} />
        </PaginationItem>
        {meta && [...Array(meta.totalPages)].map((item, index) => (
          <PaginationItem key={`page${index + 1}`}>
            <PaginationLink to={`/tasks?page=${index + 1}&order=${order}&limit=${meta.itemsPerPage}`}
            isActive={index + 1 === meta.currentPage ? true : false}>
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        )) }
        <PaginationItem>
          <PaginationNext to={`tasks?${nextPage}`} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}