// src/components/DailyFocusCard.jsx
import React from "react";

export default function DailyFocusCard({ focus, tasks = [], onDismiss }) {
  if (!focus) return null;

  // Build a quick lookup so we can show titles instead of IDs
  const byId = new Map(tasks.map(t => [String(t._id || t.id), t]));

  return (
    <div className="border rounded-md p-3 mt-3">
      <h3 style={{ fontWeight: 600, marginBottom: 8 }}>Today’s Focus</h3>

      <ol style={{ paddingLeft: 18, margin: 0 }}>
        {(focus.picks || []).map((p) => {
          const t = byId.get(String(p.taskId));
          const title = t?.title || p.taskId;
          return (
            <li key={p.taskId} style={{ marginBottom: 6 }}>
              <span style={{ fontWeight: 500 }}>{title}</span> — {p.reason}
            </li>
          );
        })}
      </ol>

      {focus.microPlan && (
        <>
          <div style={{ fontWeight: 600, marginTop: 12, marginBottom: 6 }}>
            First step plan:
          </div>
          <ul style={{ paddingLeft: 18, margin: 0 }}>
            {focus.microPlan.steps?.map((s, i) => <li key={i}>{s}</li>)}
          </ul>
        </>
      )}

      <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
        <button
          className="px-2 py-1 border rounded"
          onClick={() => {
            // Optional: tag these tasks as "focus", pin, or start a 25m timer
            // You can integrate with your existing updateTask hook here.
          }}
        >
          Set Focus
        </button>
        <button className="px-2 py-1 border rounded" onClick={onDismiss}>
          Dismiss
        </button>
      </div>
    </div>
  );
}
