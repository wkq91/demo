"use client";
import { CustomButton } from "@/components/CustomButton";
import { UserAuthenticate } from "@/components/UserAuthenticate";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { RootState } from "@/redux/store";
import { interSemiBold } from "@/utils/fontUtils";
import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface IFormInput {
  title: string;
  content: string;
  deadline: string;
}

export default function EditTask({ params }: { params: { taskId: string } }) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { userData } = useAppSelector((state: RootState) => {
    return {
      userData: state.app.userData,
    };
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IFormInput>();

  const fetchTaskData = useCallback(async () => {
    if (!userData) {
      return;
    }
    const response = await fetch(
      `/api/tasks?userId=${userData.id}&taskId=${params.taskId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const resJson = await response.json();
    console.log({ resJson });
    if (resJson.tasks && resJson.tasks.length > 0) {
      const task = resJson.tasks[0];
      setValue("title", task.title);
      setValue("content", task.content);
      setValue("deadline", task.deadline);
    }
  }, [userData, params.taskId, setValue]);

  useEffect(() => {
    fetchTaskData();
  }, [fetchTaskData]);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log(data);
    const response = await fetch(`/api/tasks`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        taskId: params.taskId,
        userId: userData?.id,
        title: data.title,
        content: data.content,
        deadline: data.deadline,
      }),
    });
    const resJson = await response.json();
    console.log({ resJson });
    if (resJson.code === "1") {
      toast("Update Task success");
      router.push("/");
    } else {
      toast(resJson.message || "Update Task failed", {
        style: { color: "#ff0000" },
      });
    }
  };

  return (
    <div className="px-5 flex flex-col items-center">
      <div className="w-full md:w-[500px]">
        <UserAuthenticate />

        <div className="mt-3 flex items-center">
          <Link href={"/"} className="text-textLink cursor-pointer">
            Home
          </Link>

          <div className="mx-2">/</div>

          <div>Edit Task</div>
        </div>

        <div className="mt-5 border-divider1 border-solid border-[1px] rounded-md px-5 py-3 self-stretch">
          <div
            className={classNames(
              "text-[20px] text-text1",
              interSemiBold.className
            )}
          >
            New Task
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-5 flex flex-col w-full"
          >
            <div className="flex items-center">
              <input
                {...register("title", { required: true })}
                placeholder="Title"
                className="h-[34px] border-divider1 border-solid border-[1px] rounded-sm pl-[10px] w-full"
              />
            </div>

            {errors.title && (
              <div className="text-[#ff0000] mt-2">title is required</div>
            )}

            <div className="mt-5 flex items-center">
              <textarea
                {...register("content", { required: true })}
                placeholder="Content"
                className="h-[100px] border-divider1 border-solid border-[1px] rounded-sm pl-[10px] w-full pt-[10px]"
              />
            </div>

            <div className="mt-5 flex items-center">
              <input
                type="date"
                {...register("deadline", { required: true })}
                placeholder="Content"
                className="h-[34px] border-divider1 border-solid border-[1px] rounded-sm pl-[10px] w-full"
              />
            </div>

            {errors.deadline && (
              <div className="text-[#ff0000] mt-2">due date is required</div>
            )}

            <CustomButton type="primary" className="mt-5">
              Update
            </CustomButton>
          </form>
        </div>
      </div>
    </div>
  );
}
