"use client";

import { useEffect, useState } from "react";

interface QuizResult {
  id: number;
  name: string;
  personality: string;
  coffee: string;
  tagline: string;
  created_at: string;
}

export default function AdminPage() {
  const [results, setResults] = useState<QuizResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/results")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setResults(data);
        } else {
          setError("Failed to load results");
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load results");
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen p-8">
      <div
        className="mx-auto max-w-4xl rounded-2xl p-10"
        style={{
          background: "#FFFBF5",
          boxShadow: "0 12px 40px rgba(139,109,74,0.12)",
        }}
      >
        <h1
          className="mb-2 text-3xl font-bold"
          style={{
            fontFamily: "var(--font-heading)",
            color: "var(--color-dark)",
          }}
        >
          Quiz Results
        </h1>
        <p
          className="mb-8 text-sm"
          style={{ color: "var(--color-light-muted)" }}
        >
          {results.length} {results.length === 1 ? "entry" : "entries"} total
        </p>

        {loading && (
          <p style={{ color: "var(--color-muted)" }}>Loading...</p>
        )}

        {error && (
          <p style={{ color: "#c44" }}>{error}</p>
        )}

        {!loading && !error && results.length === 0 && (
          <p style={{ color: "var(--color-muted)" }}>
            No results yet. Take the quiz to see entries here!
          </p>
        )}

        {!loading && !error && results.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr
                  style={{
                    borderBottom: "2px solid #E6D9C8",
                    color: "var(--color-light-muted)",
                  }}
                >
                  <th className="px-4 py-3 font-medium">Name</th>
                  <th className="px-4 py-3 font-medium">Personality</th>
                  <th className="px-4 py-3 font-medium">Coffee</th>
                  <th className="px-4 py-3 font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {results.map((r) => (
                  <tr
                    key={r.id}
                    style={{
                      borderBottom: "1px solid #E6D9C8",
                      color: "var(--color-dark)",
                    }}
                  >
                    <td className="px-4 py-3 font-medium">{r.name}</td>
                    <td className="px-4 py-3">{r.personality}</td>
                    <td className="px-4 py-3">{r.coffee}</td>
                    <td
                      className="px-4 py-3"
                      style={{ color: "var(--color-muted)" }}
                    >
                      {new Date(r.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-8">
          <a
            href="/"
            className="text-sm font-medium underline"
            style={{ color: "#8B7AA0" }}
          >
            Back to Quiz
          </a>
        </div>
      </div>
    </div>
  );
}
