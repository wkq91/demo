"use client";
import { CustomButton } from "@/components/CustomButton";
import { UserAuthenticate } from "@/components/UserAuthenticate";
import { useAppSelector } from "@/hooks/useReduxHooks";
import { TaskData } from "@/interface/common";
import { RootState } from "@/redux/store";
import { interSemiBold } from "@/utils/fontUtils";
import classNames from "classnames";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import closeIcon from "public/close.svg";
import toast from "react-hot-toast";

export default function Home() {
  const router = useRouter();
  const [tasks, setTasks] = useState<TaskData[]>([]);

  const { userData } = useAppSelector((state: RootState) => {
    return {
      userData: state.app.userData,
    };
  });

  const updateTasks = useCallback(async () => {
    if (!userData) {
      return;
    }
    const response = await fetch(`/api/tasks?userId=${userData.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const resJson = await response.json();
    // console.log({ resJson });
    setTasks(resJson.tasks || []);
  }, [userData]);

  useEffect(() => {
    updateTasks();
  }, [updateTasks]);

  const deleteTask = async (taskId: string) => {
    const response = await fetch(`/api/tasks`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        taskId,
      }),
    });
    const resJson = await response.json();
    console.log({ resJson });
    if (resJson.code === "1") {
      toast("Delete Task success");
      updateTasks();
    } else {
      toast(resJson.message || "Delete Task failed", {
        style: { color: "#ff0000" },
      });
    }
  };

  return (
    <main className="px-5">
      <UserAuthenticate />

      <CustomButton
        type="primary"
        className="mt-5"
        onClick={() => {
          router.push("/newTask");
        }}
      >
        Create New Task
      </CustomButton>

      {tasks.length == 0 && (
        <div className="text-text2 text-[18px] flex justify-center mt-20">
          No Data
        </div>
      )}

      <div className="">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="mt-5 rounded-sm border-divider1 border-solid border-[1px] py-2 px-3 relative"
          >
            <div
              className="absolute right-2 top-2 w-[20px] h-[20px] cursor-pointer"
              onClick={() => {
                deleteTask(task.id);
              }}
            >
              <Image alt="close" src={closeIcon} layout="fill" />
            </div>

            <div
              className={classNames(
                interSemiBold.className,
                "text-[18px] text-text1"
              )}
            >
              {task.title}
            </div>

            <div className="mt-2 text-text2">{task.content}</div>

            <div className="mt-2 flex justify-between">
              <div className=" text-text2 text-[12px]">
                Due: {task.deadline}
              </div>

              <div
                className=" text-textLink text-[12px] underline cursor-pointer"
                onClick={() => {
                  router.push(`/editTask/${task.id}`);
                }}
              >
                Edit
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
