import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import RegisterPage from "../page";

global.fetch = jest.fn();

describe("RegisterPage Component", () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  it("renders the registration form correctly", () => {
    render(<RegisterPage />);

    expect(screen.getByText("Register")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter your name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter your email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter your password")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Confirm your password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Register" })).toBeInTheDocument();
  });

  it("shows an error if passwords do not match", async () => {
    render(<RegisterPage />);

    fireEvent.change(screen.getByPlaceholderText("Enter your name"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter your email"), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter your password"), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByPlaceholderText("Confirm your password"), {
      target: { value: "password456" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Register" }));

    await waitFor(() => {
      expect(screen.getByText("Passwords do not match")).toBeInTheDocument();
    });
  });

  it("shows a success message when registration is successful", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    });

    render(<RegisterPage />);

    fireEvent.change(screen.getByPlaceholderText("Enter your name"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter your email"), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter your password"), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByPlaceholderText("Confirm your password"), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Register" }));

    await waitFor(() => {
      expect(
        screen.getByText("Registration successful! You can now login.")
      ).toBeInTheDocument();
    });
  });

  it("displays an error message when the server returns an error", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: "Email already exists" }),
    });

    render(<RegisterPage />);

    fireEvent.change(screen.getByPlaceholderText("Enter your name"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter your email"), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter your password"), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByPlaceholderText("Confirm your password"), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Register" }));

    await waitFor(() => {
      expect(screen.getByText("Email already exists")).toBeInTheDocument();
    });
  });
});
