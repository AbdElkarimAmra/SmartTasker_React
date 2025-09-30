import { TasksPagination } from "../tasksPagination/tasksPagination";
import { OrderSelect } from "../orderSelect/orderSelect";

export function FilterBar() {
    return (  
        <>
            <nav className="flex flex-row justify-between mb-8">
                <TasksPagination />
                <OrderSelect />
            </nav>
        </>
);
}