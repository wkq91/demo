import { TaskData, UserData } from "@/interface/common";
import { getUuid } from "@/utils/commonUtils";
import { JSONFilePreset } from "lowdb/node";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  //   const data = await req.json();
  const params = req.nextUrl.searchParams;
  const userId = params.get("userId");
  if (!userId) {
    return NextResponse.json({ code: "-1", message: "Missing userId" });
  }

  const taskId = params.get("taskId");

  const db = await JSONFilePreset<{ tasks: TaskData[] }>("../tasks.json", {
    tasks: [],
  });
  const { tasks } = db.data;
  const filterTasks = tasks.filter(
    (task) => task.userId === userId && (!taskId || taskId === task.id)
  );
  console.log({ tasks });

  return NextResponse.json({ code: "1", tasks: filterTasks });
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  if (!data.title || !data.content || !data.deadline || !data.userId) {
    return NextResponse.json({ code: "-1", message: "Missing task info" });
  }

  const db = await JSONFilePreset<{ tasks: TaskData[] }>("../tasks.json", {
    tasks: [],
  });

  const newTask = {
    id: getUuid(),
    userId: data.userId,
    title: data.title,
    content: data.content,
    deadline: data.deadline,
  };

  await db.update(({ tasks }) => tasks.push(newTask));
  await db.write();

  return NextResponse.json({ code: "1" });
}

export async function DELETE(req: NextRequest) {
  const data = await req.json();
  if (!data.taskId) {
    return NextResponse.json({ code: "-1", message: "Missing taskId" });
  }

  const db = await JSONFilePreset<{ tasks: TaskData[] }>("../tasks.json", {
    tasks: [],
  });

  await db.update(({ tasks }) => {
    const index = tasks.findIndex((item) => item.id === data.taskId);
    if (index >= 0) {
      tasks.splice(index, 1);
    }
  });
  await db.write();

  return NextResponse.json({ code: "1" });
}

export async function PUT(req: NextRequest) {
  const data = await req.json();
  if (
    !data.taskId ||
    !data.title ||
    !data.content ||
    !data.deadline ||
    !data.userId
  ) {
    return NextResponse.json({ code: "-1", message: "Missing task info" });
  }

  const db = await JSONFilePreset<{ tasks: TaskData[] }>("../tasks.json", {
    tasks: [],
  });

  const newTask = {
    userId: data.userId,
    title: data.title,
    content: data.content,
    deadline: data.deadline,
  };

  await db.update(({ tasks }) => {
    const index = tasks.findIndex((item) => item.id === data.taskId);
    if (index >= 0) {
      tasks[index] = { id: data.taskId, ...newTask };
    }
  });
  await db.write();

  return NextResponse.json({ code: "1" });
}
