// src/hooks/useDailyFocus.hook.js
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";

async function dailyFocus() {
  const base = import.meta.env.VITE_API_URL || "";
  const url = `${base.replace(/\/+$/, "")}/AI/focus`;

  const token = Cookies.get("token");
  console.log("[dailyFocus] token? ", token ? token.slice(0, 12) + "..." : "(missing)");

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}), // send header if token exists
    },
    body: JSON.stringify({}),
    credentials: "include", // keep sending cookies
  });

   if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Request failed: ${res.status} ${res.statusText}${text ? ` — ${text}` : ""}`);
  }

  const json = await res.json();
  return json.data || json;
}


async function createTask(description) {
  const base = import.meta.env.VITE_API_URL || "";
  const url = `${base.replace(/\/+$/, "")}/tasks`;

  const token = Cookies.get("token");
  console.log("[createTask] token? ", token ? token.slice(0, 12) + "..." : "(missing)");

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}), // send header if token exists
    },
    body: JSON.stringify({ description }),
    credentials: "include", // keep sending cookies
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Request failed: ${res.status} ${res.statusText}${text ? ` — ${text}` : ""}`);
  }

  const json = await res.json();
  return json.data || json;
}

export function useDailyFocus(params = {}) {
  return useQuery({
    queryKey: ["dailyFocus", params],
    queryFn: dailyFocus,
    enabled: false,
    refetchOnWindowFocus: false,
  });
}


export function useCreateTask(params = {}) {
  return useQuery({
    queryKey: ["createTask", params],
    queryFn: createTask,
    enabled: false,
    refetchOnWindowFocus: false,
  });
}
