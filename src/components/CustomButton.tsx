import classNames from "classnames";
import { RootState } from "../redux/store";
import { interSemiBold } from "@/utils/fontUtils";
import { useAppSelector } from "@/hooks/useReduxHooks";

type ButtonProps = React.PropsWithChildren<{
  disabled?: boolean;
  loading?: boolean;
  type?: "primary" | "secondary" | "stroke";
  width?: string;
  height?: string;
  fontSize?: string;
  className?: string;
  onClick?: () => void;
}>;

export const CustomButton = (props: ButtonProps) => {
  const { darkMode } = useAppSelector((state: RootState) => {
    return { darkMode: state.app.darkMode };
  });

  const textColor = "#ffffff";

  return (
    <button
      className={classNames(
        props.type === "primary"
          ? "text-white bg-primary hover:bg-primaryActive active:opacity-70"
          : "",
        props.type === "stroke"
          ? "text-color-text1 border-solid border-[1px] border-color-divider1 active:opacity-70 hover:bg-color-bg1"
          : "",
        "flex items-center justify-center rounded-[6px] cursor-pointer overflow-hidden",
        interSemiBold.className,
        { "opacity-80": props.loading },
        props.width ? "" : "px-4",
        props.className || ""
      )}
      style={{
        ...(props.width ? { width: props.width } : {}),
        // color: textColor,
        height: props.height || "36px",
        fontSize: props.fontSize || "16px",
      }}
      onClick={() => {
        if (!props.disabled && !props.loading) {
          props.onClick && props.onClick();
        }
      }}
    >
      <div
        className={classNames("flex items-center", { "ml-1": props.loading })}
      >
        {props.children}
      </div>
    </button>
  );
};
