import { ChangeEventHandler } from "react";

type TextInput = {
  value: string;
  handleChange: ChangeEventHandler<HTMLInputElement>;
  htmlfor: string;
  name: string;
  labelText: string;
};

export const TextInput = ({
  value,
  handleChange,
  htmlfor,
  name,
  labelText,
}: TextInput) => {
  return (
    <label htmlFor={htmlfor}>
      {labelText}
      <input
        value={value}
        placeholder="0"
        onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
        className="text-white text-xl w-[200px] bg-[#3e3e59] h-10 p-2 rounded m-1"
        onChange={handleChange}
        id="send"
        type="text"
        name={name}
      />
    </label>
  );
};
