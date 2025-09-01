import { useState } from "react";
import { type Column, DataTable } from "./components/DataTable/DataTable";
import { InputField } from "./components/InputField/InputField";

interface User {
  id: number;
  name: string;
  email: string;
}

const columns: Column<User>[] = [
  { key: "1", title: "ID", dataIndex: "id", sortable: true },
  { key: "2", title: "Name", dataIndex: "name", sortable: true },
  { key: "3", title: "Email", dataIndex: "email", sortable: false },
];

const initialData: User[] = [
  { id: 1, name: "web", email: "web@example.com" },
  { id: 2, name: "hello", email: "hello@example.com" },
];

function App() {
  const [data, setData] = useState<User[]>(initialData);
  const [name, setName] = useState("");

  const handleAdd = () => {
    if (!name) return;
    const newUser: User = {
      id: data.length + 1,
      name,
      email: `${name.toLowerCase()}@example.com`,
    };
    setData([...data, newUser]);
    setName("");
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-xl font-bold">Assessment App</h1>

      <InputField
        label="Add User"
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        variant="outlined"
        size="md"
      />
      <button
        onClick={handleAdd}
        className="px-4 py-2 rounded-lg bg-blue-600 text-black font-bold shadow-md hover:bg-blue-700">
        ADD
      </button>

      <DataTable<User>
        data={data}
        columns={columns}
        selectable
        onRowSelect={(rows) => console.log("Selected:", rows)}
      />
    </div>
  );
}

export default App;
