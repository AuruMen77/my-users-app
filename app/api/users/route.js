import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const runtime = "nodejs"; // ✅ Force Node runtime

const dataFilePath = path.join(process.cwd(), "data", "Users.json");

function readUsers() {
  try {
    const data = fs.readFileSync(dataFilePath, "utf8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function writeUsers(users) {
  fs.writeFileSync(dataFilePath, JSON.stringify(users, null, 2), "utf8");
}

export async function GET() {
  const users = readUsers();
  return NextResponse.json(users);
}

export async function POST(request) {
  try {
    const body = await request.json();
    const users = readUsers();

    if (!body.name || !body.email || !body.company?.name) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const newUser = {
      id: Date.now().toString(),
      ...body,
    };

    users.push(newUser);
    writeUsers(users);

    return NextResponse.json(newUser, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
