import { fireEvent, render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import { DataTable } from "./DataTable";

interface Row { id: number; name: string; age: number; }

const data: Row[] = [
  { id: 1, name: "Alice", age: 25 },
  { id: 2, name: "Bob", age: 30 },
];

const columns = [
  { key: "name", title: "Name", dataIndex: "name" as keyof Row, sortable: true },
  { key: "age", title: "Age", dataIndex: "age" as keyof Row, sortable: true },
];

describe("DataTable", () => {
  it("renders rows", () => {
    render(<DataTable data={data} columns={columns} />);
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Bob")).toBeInTheDocument();
  });

  it("shows loading state", () => {
    render(<DataTable data={[]} columns={columns} loading />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("allows row selection", () => {
    render(<DataTable data={data} columns={columns} selectable />);
    const checkbox = screen.getAllByRole("checkbox")[0];
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });
});
