import { UseFormRegister, FieldValues, FieldErrors } from "react-hook-form";

interface Props {
  id: string;
  value?: string;
  label: string;
  type?: string;
  disabled?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  placeholder?: string;
  required?: boolean;
  isSurpriseMe?: boolean;
  handleSurpriseMe?: () => void;
}

const Input: React.FC<Props> = ({
  errors,
  label,
  id,
  register,
  disabled,
  placeholder,
  required,
  type,
  handleSurpriseMe,
  isSurpriseMe,
}) => {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <label htmlFor={id} className="text-sm font-medium text-gray-900">
          {label}
        </label>

        {isSurpriseMe && handleSurpriseMe && (
          <button
            type="button"
            className="block font-semibold text-xs bg-[#ececf1] px-2 py-1 rounded-[5px] text-black"
            onClick={() => handleSurpriseMe()}
          >
            Surprise Me
          </button>
        )}
      </div>

      <input
        className={`bg-gray-50 border ${errors[id] ? 'border-red-500' : 'border-gray-300'} ${disabled ? 'opacity-60' : 'opacity-100'} text-gray-900 text-sm rounded-lg focus:ring-[#4649ff] focus:border-[#4649ff] outline-none block w-full p-3 disabled:cursor-not-allowed disabled:opacity-40`}
        id={id}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        {...register(id, { required })}
      />
    </div>
  );
};

export default Input;
