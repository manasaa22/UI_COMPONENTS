import { Eye, EyeOff, X } from "lucide-react";
import React, { useState } from "react";

export interface InputFieldProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  variant?: "filled" | "outlined" | "ghost";
  size?: "sm" | "md" | "lg";
  type?: "text" | "password";
  clearable?: boolean;
}

export const InputField: React.FC<InputFieldProps> = ({
  value = "",
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled = false,
  invalid = false,
  variant = "outlined",
  size = "md",
  type = "text",
  clearable = true,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const sizeClasses =
    size === "sm"
      ? "px-3 py-2 text-sm"
      : size === "lg"
      ? "px-4 py-4 text-lg"
      : "px-4 py-3 text-base";

  const getVariantClasses = () => {
    const baseClasses = "transition-all duration-200 ease-in-out";

    if (variant === "filled") {
      return `${baseClasses} bg-slate-50 border-2 border-slate-200 hover:bg-slate-100 hover:border-slate-300 ${
        isFocused ? "bg-white border-blue-500 shadow-lg shadow-blue-100" : ""
      } ${invalid ? "border-red-400 bg-red-50 hover:border-red-500" : ""}`;
    } else if (variant === "ghost") {
      return `${baseClasses} bg-transparent border-0 border-b-2 border-slate-300 rounded-none hover:border-slate-400 ${
        isFocused ? "border-blue-500 shadow-lg shadow-blue-50" : ""
      } ${invalid ? "border-red-400 hover:border-red-500" : ""}`;
    } else {
      return `${baseClasses} bg-white border-2 border-slate-200 hover:border-slate-300 ${
        isFocused ? "border-blue-500 shadow-lg shadow-blue-100" : ""
      } ${invalid ? "border-red-400 hover:border-red-500" : ""}`;
    }
  };

  const handleClear = () => {
    if (onChange) {
      const event = {
        target: { value: "" },
      } as React.ChangeEvent<HTMLInputElement>;
      onChange(event);
    }
  };

  const buttonSizeClasses =
    size === "sm" ? "p-1" : size === "lg" ? "p-2" : "p-1.5";
  const iconSize = size === "sm" ? 14 : size === "lg" ? 20 : 16;
  const rightPadding =
    clearable && value && type === "password"
      ? "pr-20"
      : (clearable && value) || type === "password"
      ? "pr-12"
      : "pr-4";

  return (
    <div className="flex flex-col mb-6">
      {label && (
        <label className="mb-2 text-sm font-semibold text-slate-700 tracking-wide">
          {label}
        </label>
      )}
      <div className="relative group">
        <input
          type={type === "password" && showPassword ? "text" : type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`w-full rounded-xl outline-none ${sizeClasses} ${getVariantClasses()} ${rightPadding} 
            placeholder:text-slate-400 placeholder:font-normal
            disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed
            disabled:border-slate-200 focus:outline-none`}
        />

        {/* Action buttons container */}
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
          {/* Clear button */}
          {clearable && value && (
            <button
              type="button"
              className={`${buttonSizeClasses} text-slate-400 hover:text-slate-600 hover:bg-slate-100 
                rounded-lg transition-all duration-150 ease-in-out transform hover:scale-105
                disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100`}
              onClick={handleClear}
              disabled={disabled}
            >
              <X size={iconSize} />
            </button>
          )}

          {/* Password toggle button */}
          {type === "password" && (
            <button
              type="button"
              className={`${buttonSizeClasses} text-slate-400 hover:text-slate-600 hover:bg-slate-100 
                rounded-lg transition-all duration-150 ease-in-out transform hover:scale-105
                disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100`}
              onClick={() => setShowPassword(!showPassword)}
              disabled={disabled}
            >
              {showPassword ? (
                <EyeOff size={iconSize} />
              ) : (
                <Eye size={iconSize} />
              )}
            </button>
          )}
        </div>
      </div>

      {/* Helper text and error messages */}
      <div className="mt-2 min-h-5">
        {helperText && !invalid && (
          <span className="text-xs text-slate-500 font-medium flex items-center">
            <div className="w-1 h-1 bg-slate-400 rounded-full mr-2"></div>
            {helperText}
          </span>
        )}
        {invalid && errorMessage && (
          <span className="text-xs text-red-500 font-medium flex items-center animate-pulse">
            <div className="w-1 h-1 bg-red-500 rounded-full mr-2"></div>
            {errorMessage}
          </span>
        )}
      </div>
    </div>
  );
};
