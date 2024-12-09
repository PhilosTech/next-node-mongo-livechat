import { render, screen, fireEvent } from "@testing-library/react";
import ChatWindow from "../ChatWindow";
import { useChat } from "../../hooks/useChat";

jest.mock("../hooks/useChat");

const mockUseChat = useChat as jest.MockedFunction<typeof useChat>;

describe("ChatWindow Component", () => {
  const chatId = "testChat123";

  beforeEach(() => {
    localStorage.setItem("userId", "user1");
    mockUseChat.mockImplementation((providedChatId) => {
      if (providedChatId !== chatId) {
        throw new Error("Invalid chatId");
      }
      return {
        messages: [
          {
            _id: "msg1",
            senderId: "user1",
            content: "Hello, World!",
            timestamp: new Date().toISOString(),
          },
          {
            _id: "msg2",
            senderId: "user2",
            content: "Hi there!",
            timestamp: new Date().toISOString(),
          },
        ],
        inputValue: "",
        setInputValue: jest.fn(),
        sendMessage: jest.fn(),
      };
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it("renders chat messages correctly", () => {
    render(<ChatWindow chatId={chatId} />);


    expect(screen.getByText("Hello, World!")).toBeInTheDocument();
    expect(screen.getByText("Hi there!")).toBeInTheDocument();
  });

  it("calls sendMessage when send button is clicked", () => {
    const sendMessageMock = jest.fn();
    mockUseChat.mockImplementation((providedChatId) => {
      if (providedChatId !== chatId) throw new Error("Invalid chatId");
      return {
        messages: [],
        inputValue: "",
        setInputValue: jest.fn(),
        sendMessage: sendMessageMock,
      };
    });

    render(<ChatWindow chatId={chatId} />);

    const sendButton = screen.getByText("Send");
    fireEvent.click(sendButton);

    expect(sendMessageMock).toHaveBeenCalledTimes(1);
  });
});
