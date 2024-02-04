import { UserData } from "@/interface/common";
import { getUuid } from "@/utils/commonUtils";
import { JSONFilePreset } from "lowdb/node";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  return NextResponse.json({ message: "success" });
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  if (!data.username || !data.password) {
    return NextResponse.json({ code: "-1" });
  }

  const db = await JSONFilePreset<{ users: UserData[] }>("../users.json", {
    users: [],
  });
  const { users } = db.data;
  console.log({ users });

  const post = {
    id: getUuid(),
    username: data.username,
    password: data.password,
  };

  await db.update(({ users }) => users.push(post));
  await db.write();

  return NextResponse.json({ code: "1", user: post });
}
