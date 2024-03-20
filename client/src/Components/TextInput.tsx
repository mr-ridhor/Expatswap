import { FieldError, UseFormRegister } from "react-hook-form";
import InputError from "./InputError";
import InputLabel from "./InputLabel";
import { ReactNode } from "react";

interface TextInputProps {
  type?: string;
  name: string;
  label?: string;
  register: UseFormRegister<any>; // Adjust the type as needed
  error?: FieldError | undefined;
  children?: ReactNode;
  className?: string;
  placeholder?: string;
  row?: number;
}

export const TextInput: React.FC<TextInputProps> = ({
  type,
  name,
  label,
  register,
  error,
  placeholder,
}) => {
  return (
    <div className="flex flex-col space-y-1 w-full">
      <InputLabel value={label} />
      <input
        type={type}
        placeholder={placeholder}
        className={`w-full h-9 bg-inherit border text-white border-gray-300 dark:border-slate-700 focus:border-blue-500 focus:ring-indigo-500 rounded-sm shadow-sm px-2 `}
        {...register(name)}
      />
      {error && <InputError message={error.message} />}
    </div>
  );
};

export const SelectInput: React.FC<TextInputProps> = ({
  name,
  label,
  register,
  error,
  children,
}) => {
  return (
    <div className="flex flex-col space-y-1 w-full">
      <InputLabel value={label} />
      <select
        className={`w-full h-9 bg-inherit border border-gray-300 dark:border-slate-700 focus:border-blue-500 focus:ring-indigo-500 rounded-sm shadow-sm px-2`}
        {...register(name)}
      >
        {children}
      </select>
      {error && <InputError message={error.message} />}
    </div>
  );
};

export const TextAreaInput: React.FC<TextInputProps> = ({
  name,
  label,
  row,
  register,
  error,
  placeholder,
}) => {
  return (
    <div className="flex flex-col space-y-1 w-full">
      <InputLabel value={label} />
      <textarea
        rows={row}
        placeholder={placeholder}
        className={`w-full bg-inherit border border-gray-300 dark:border-slate-700 focus:border-blue-500 focus:ring-indigo-500 rounded-sm shadow-sm px-2 py-1`}
        {...register(name)}
      />
      {error && <InputError message={error.message} />}
    </div>
  );
};

export const RadioInput: React.FC<TextInputProps> = ({
  name,
  label,
  register,
  error,
  className,
}) => {
  return (
    <>
      <div className={`flex gap-2 cursor-pointer ${className && className}`}>
        <input
          type="radio"
          {...register(name)}
          name={name}
          className="cursor-pointer"
        />
        <p>{label}</p>
      </div>
      {error && <InputError message={error.message} />}
    </>
  );
};

export const CheckBoxInput: React.FC<TextInputProps> = ({
  name,
  label,
  register,
  error,
  className,
}) => {
  return (
    <>
      <div className={`flex gap-2 cursor-pointer ${className && className}`}>
        <input
          type="checkbox"
          {...register(name)}
          name={name}
          className="cursor-pointer"
        />
        <p>{label}</p>
      </div>
      {error && <InputError message={error.message} />}
    </>
  );
};

////////////////////////////// THIS IS FOR INPUT THAT HAS NO REGISTER ////////////////////
interface TextInputWithOnChangeProps {
  type?: string;
  label?: string;
  error?: string;
  children?: ReactNode;
  className?: string;
  placeholder?: string;
  value: string | number;
  onChange: (value: string) => void;
}
export const TextInputWithOnChange: React.FC<TextInputWithOnChangeProps> = ({
  type,
  label,
  error,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <div className="flex flex-col space-y-1 w-full">
      <InputLabel value={label} />
      <input
        type={type}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        value={value}
        className={`w-full h-9 bg-inherit border border-gray-300 dark:border-slate-700 focus:border-blue-500 focus:ring-indigo-500 rounded-sm shadow-sm px-2 `}
      />
      {error && <InputError message={error} />}
    </div>
  );
};
