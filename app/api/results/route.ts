import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { name, personality, coffee, tagline } = await request.json();

    if (!name || !personality) {
      return NextResponse.json(
        { error: "Name and personality are required" },
        { status: 400 }
      );
    }

    await sql`
      CREATE TABLE IF NOT EXISTS quiz_results (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        personality VARCHAR(255) NOT NULL,
        coffee VARCHAR(255),
        tagline VARCHAR(255),
        created_at TIMESTAMP DEFAULT NOW()
      )
    `;

    await sql`
      INSERT INTO quiz_results (name, personality, coffee, tagline)
      VALUES (${name}, ${personality}, ${coffee}, ${tagline})
    `;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to save result:", error);
    return NextResponse.json(
      { error: "Failed to save result" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS quiz_results (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        personality VARCHAR(255) NOT NULL,
        coffee VARCHAR(255),
        tagline VARCHAR(255),
        created_at TIMESTAMP DEFAULT NOW()
      )
    `;

    const { rows } = await sql`
      SELECT * FROM quiz_results ORDER BY created_at DESC
    `;

    return NextResponse.json(rows);
  } catch (error) {
    console.error("Failed to fetch results:", error);
    return NextResponse.json(
      { error: "Failed to fetch results" },
      { status: 500 }
    );
  }
}
