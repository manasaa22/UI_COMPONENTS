import { fireEvent, render, screen } from "@testing-library/react";
import { InputField } from "./InputField";

describe("InputField", () => {
  it("renders with label", () => {
    render(<InputField label="Username" />);
    expect(screen.getByText("Username")).toBeInTheDocument();
  });

  it("shows error message when invalid", () => {
    render(<InputField invalid errorMessage="Required" />);
    expect(screen.getByText("Required")).toBeInTheDocument();
  });

  it("toggles password visibility", () => {
    render(<InputField type="password" />);
    const toggle = screen.getByRole("button");
    fireEvent.click(toggle);
    expect(toggle).toHaveTextContent("Hide");
  });
});
