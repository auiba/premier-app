import { ChangeEventHandler } from "react";

type TextInput = {
  value: string;
  handleChange: ChangeEventHandler<HTMLInputElement>;
  htmlfor: string;
  name: string;
  labelText: string;
  ph?: string;
};

export const TextInput = ({
  value,
  handleChange,
  htmlfor,
  name,
  labelText,
  ph,
}: TextInput) => {
  return (
    <label
      className="flex flex-col items-start justify-center text-gray-300"
      htmlFor={htmlfor}
    >
      {labelText}
      <input
        value={value}
        placeholder={ph}
        onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
        className="text-white text-lg w-[250px] bg-[#3e3e59] h-10 p-2 rounded m-1"
        onChange={(e) => handleChange(e)}
        id="send"
        type="text"
        name={name}
      />
    </label>
  );
};
