import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginPage from "../page";
import axios from "axios";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

jest.mock("axios");
jest.mock("jwt-decode", () => jest.fn());
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockedRouter = useRouter as jest.MockedFunction<typeof useRouter>;
const mockedJwtDecode = jwtDecode as jest.MockedFunction<typeof jwtDecode>;

describe("LoginPage Component", () => {
  const routerPushMock = jest.fn();

  beforeEach(() => {
    mockedRouter.mockReturnValue({ push: routerPushMock } as any);
    localStorage.clear();
  });

  it("renders the login form correctly", () => {
    render(<LoginPage />);

    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter your email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter your password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
  });

  it("submits the form and logs in successfully", async () => {
    const mockToken = "fakeToken123";
    mockedAxios.post.mockResolvedValueOnce({ data: { token: mockToken } });
    mockedJwtDecode.mockReturnValueOnce({ id: "user123" });

    render(<LoginPage />);


    fireEvent.change(screen.getByPlaceholderText("Enter your email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter your password"), {
      target: { value: "password123" },
    });


    fireEvent.click(screen.getByRole("button", { name: "Login" }));

    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalledWith("/api/auth/login", {
        email: "test@example.com",
        password: "password123",
      });
      expect(mockedJwtDecode).toHaveBeenCalledWith(mockToken);
      expect(localStorage.getItem("token")).toBe(mockToken);
      expect(localStorage.getItem("userId")).toBe("user123");
      expect(routerPushMock).toHaveBeenCalledWith("/chat");
    });
  });

  it("displays an error message when login fails", async () => {
    mockedAxios.post.mockRejectedValueOnce({
      response: { data: { error: "Invalid credentials" } },
    });

    render(<LoginPage />);

    fireEvent.change(screen.getByPlaceholderText("Enter your email"), {
      target: { value: "wrong@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter your password"), {
      target: { value: "wrongpass" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Login" }));

    await waitFor(() => {
      expect(screen.getByText("Invalid credentials")).toBeInTheDocument();
    });
  });

  it("shows a default error message for unexpected errors", async () => {
    mockedAxios.post.mockRejectedValueOnce(new Error("Network error"));

    render(<LoginPage />);

    fireEvent.change(screen.getByPlaceholderText("Enter your email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter your password"), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Login" }));

    await waitFor(() => {
      expect(
        screen.getByText("Failed to login. Please try again.")
      ).toBeInTheDocument();
    });
  });
});
