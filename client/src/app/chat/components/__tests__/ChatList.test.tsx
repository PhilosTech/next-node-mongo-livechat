import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ChatList from '../ChatList';
import { getChats } from '../../services/chatService';


jest.mock('../services/chatService', () => ({
  getChats: jest.fn(),
}));

describe('ChatList Component', () => {
  const mockChats = [
    {
      _id: '1',
      participants: ['User1', 'User2'],
      type: 'personal',
      createdAt: '2024-12-06T12:00:00Z',
    },
    {
      _id: '2',
      participants: ['User3', 'User4'],
      type: 'group',
      createdAt: '2024-12-05T11:00:00Z',
    },
  ];

  const mockOnChatSelect = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders loading state initially', () => {
    (getChats as jest.Mock).mockImplementation(() => new Promise(() => {}));

    render(<ChatList onChatSelect={mockOnChatSelect} />);

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  test('renders error message if user is not authenticated', async () => {
    (getChats as jest.Mock).mockRejectedValue(new Error('User not authenticated'));

    render(<ChatList onChatSelect={mockOnChatSelect} />);

    await waitFor(() => expect(screen.getByText(/User not authenticated/i)).toBeInTheDocument());
  });

  test('renders chat list correctly', async () => {
    (getChats as jest.Mock).mockResolvedValue(mockChats);

    render(<ChatList onChatSelect={mockOnChatSelect} />);

    await waitFor(() => {
      expect(screen.getByText('Personal Chat')).toBeInTheDocument();
      expect(screen.getByText('User1, User2')).toBeInTheDocument();
      expect(screen.getByText('Group Chat')).toBeInTheDocument();
      expect(screen.getByText('User3, User4')).toBeInTheDocument();
    });
  });

  test('handles chat selection on click', async () => {
    (getChats as jest.Mock).mockResolvedValue(mockChats);

    render(<ChatList onChatSelect={mockOnChatSelect} />);

    await waitFor(() => screen.getByText('Personal Chat'));

    const personalChat = screen.getByText('Personal Chat');
    userEvent.click(personalChat);

    expect(mockOnChatSelect).toHaveBeenCalledWith('1');
  });
});
