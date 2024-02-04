"use client";
import { CustomButton } from "@/components/CustomButton";
import { interBold, interSemiBold } from "@/utils/fontUtils";
import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface IFormInput {
  username: string;
  password: string;
}

export default function Register() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log(data);
    const response = await fetch(`/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: data.username,
        password: data.password,
      }),
    });
    // console.log({ response });
    const resJson = await response.json();
    if (resJson.code === "1") {
      router.push(`/login?username=${data.username}&password=${data.password}`);
    } else {
      toast("Register failed");
    }
  };

  return (
    <div className="px-5 flex flex-col items-center">
      <div className="w-full md:w-[500px]">
        <div className="lg:mt-10 lg:py-5 mt-5 border-divider1 border-solid border-[1px] rounded-md px-5 py-3 self-stretch">
          <div
            className={classNames(
              "text-[20px] text-text1",
              interSemiBold.className
            )}
          >
            Register
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="lg:mt-10 mt-5 flex flex-col w-full"
          >
            <div className="flex items-center">
              <input
                {...register("username", { required: true })}
                placeholder="username"
                className="h-[34px] border-divider1 border-solid border-[1px] rounded-sm pl-[10px] w-full"
              />
            </div>

            {errors.username && (
              <div className="text-[#ff0000] mt-2">username is required</div>
            )}

            <div className="lg:mt-10 mt-5 flex items-center">
              <input
                {...register("password", { required: true })}
                type="password"
                placeholder="password"
                className="h-[34px] border-divider1 border-solid border-[1px] rounded-sm pl-[10px] w-full"
              />
            </div>

            {errors.password && (
              <div className="text-[#ff0000] mt-2">password is required</div>
            )}

            <div className="lg:mt-10 mt-5">
              Already have a account?{" "}
              <Link href={"/login"}>
                <span className="text-textLink underline">Login</span>
              </Link>
            </div>

            <CustomButton type="primary" className="lg:mt-10 mt-5">
              Submit
            </CustomButton>
          </form>
        </div>
      </div>
    </div>
  );
}
