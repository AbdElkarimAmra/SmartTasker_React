import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";

/**
 * Fetches tasks from the backend API.
 *
 * @param {{queryKey: string[]}} {queryKey} - The queryKey is an array of strings
 * where the first element is the cache key and the second element is the object
 * with the query parameters.
 * @returns {Promise<object>} - The response as a JSON object with the tasks.
 */
const fetchTasks = async ({ queryKey }) => {
  const [_key, { order = "asc", limit = 5, page = 1 }] = queryKey;
  const token = Cookies.get("token");

  const url = new URL(`${import.meta.env.VITE_API_URL}tasks`);
  url.searchParams.append("order", order);
  url.searchParams.append("limit", limit);
  url.searchParams.append("page", page);

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

/**
 * Hook that fetches tasks from the API using react-query.
 *
 * @param {object} [params] - An object with the following properties:
 *   - order: string - The order in which tasks should be sorted. Defaults to "asc".
 *   - limit: number - The number of tasks to fetch per page. Defaults to 5.
 *   - page: number - The page number to fetch. Defaults to 1.
 *
 * @returns {object} - The result of the useQuery hook.
 *   - data: object - The tasks fetched from the API.
 *   - error: object - An error object if something went wrong.
 *   - isLoading: boolean - A boolean indicating if the data is being loaded.
 *   - isFetching: boolean - A boolean indicating if the data is being fetched.
 *   - refetch: function - A function to refetch the data.
 */
export function useFetchTasks(params = {}) {
    return useQuery({
        queryKey: ["fetchTasks", params],
        queryFn: fetchTasks,
        onSuccess: (response) => {
            console.log("tasks were fetched successfully", response);
        },
        onError: (error) => {
            console.log("error fetching tasks", error);
        }
    });
}