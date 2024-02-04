import { UserData } from "@/interface/common";
import { getUuid } from "@/utils/commonUtils";
import { JSONFilePreset } from "lowdb/node";
import { NextRequest, NextResponse } from "next/server";

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

  const matchedUser = users.find((dbUser) => {
    return (
      dbUser.username === data.username && dbUser.password === data.password
    );
  });

  if (matchedUser) {
    return NextResponse.json({ code: "1", user: matchedUser });
  } else {
    return NextResponse.json({ code: "-1", message: "Authentication failed" });
  }
}
