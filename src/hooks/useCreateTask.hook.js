import {useMutation} from "@tanstack/react-query";
import Cookies from "js-cookie";

// This function is a wrapper around the fetch function that will be used to make a POST request to the /tasks endpoint
// It will add the Authorization header with the token from the cookies
const createTask = async (task) => {
  const token = Cookies.get("token");
  const response = await fetch(`${import.meta.env.VITE_API_URL}tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    // We need to convert the task object to a JSON string and add it to the request body
    // The fetch function will automatically set the Content-Type header to application/json
    // so the server knows how to parse the request body
    body: JSON.stringify(task),
  });

  // If the response is not ok, throw an error
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  // Return the response as JSON
  return await response.json();
}

// This function will return a useMutation hook that can be used to make the POST request
// The useMutation hook will handle the mutation and will update the cache accordingly
export function useCreateTask() {
  return useMutation({
    mutationFn: createTask,
    onSuccess: (response) => {
      // If the request is successful, set the token in the cookies
      console.log("task was created successfully",response);
      
    },
    onError: (error) => {
      console.log("error creating task",error);
    }
  });
}

