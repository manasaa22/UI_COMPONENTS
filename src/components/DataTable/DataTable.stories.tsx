import type { Meta, StoryObj } from "@storybook/react";
import { DataTable } from "./DataTable";

interface Person {
  id: number;
  name: string;
  age: number;
}

const data: Person[] = [
  { id: 1, name: "Alice", age: 25 },
  { id: 2, name: "Bob", age: 30 },
  { id: 3, name: "Charlie", age: 22 },
];

const columns: { key: string; title: string; dataIndex: keyof Person; sortable: boolean }[] = [
  { key: "name", title: "Name", dataIndex: "name", sortable: true },
  { key: "age", title: "Age", dataIndex: "age", sortable: true },
];

const meta: Meta<typeof DataTable<Person>> = {
  title: "Components/DataTable",
  component: DataTable<Person>,
  args: { data, columns },
};
export default meta;

type Story = StoryObj<typeof DataTable<Person>>;

export const Default: Story = {};
export const Selectable: Story = { args: { selectable: true } };
export const Loading: Story = { args: { loading: true } };
export const Empty: Story = { args: { data: [] } };
