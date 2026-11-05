import { useMutation, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";

const createTask = async ({ description }) => {
  const token = Cookies.get("token");

  const response = await fetch(`${import.meta.env.VITE_API_URL}AI/aiCreateTask`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ description }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.error || "Failed to create AI task");
  }

  return await response.json();
};

export function useCreateTask() {
  return useMutation({
    mutationFn: createTask,
  });
}





