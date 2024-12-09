import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_STORAGE_API_URL;

export const getChats = async (token: string) => {
  try {
    const response = await axios.get(`${API_URL}/chats`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || 'Failed to fetch chats');
  }
};
