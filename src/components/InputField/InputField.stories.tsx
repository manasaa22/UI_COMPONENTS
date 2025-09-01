import type { Meta, StoryObj } from "@storybook/react";
import { InputField } from "./InputField";

const meta: Meta<typeof InputField> = {
  title: "Components/InputField",
  component: InputField,
  args: {
    label: "Username",
    placeholder: "Enter text",
  },
};
export default meta;

type Story = StoryObj<typeof InputField>;

export const Default: Story = {};
export const Filled: Story = { args: { variant: "filled" } };
export const Outlined: Story = { args: { variant: "outlined" } };
export const Ghost: Story = { args: { variant: "ghost" } };
export const Invalid: Story = {
  args: { invalid: true, errorMessage: "Invalid input" },
};
export const Password: Story = {
  args: { type: "password", label: "Password" },
};
