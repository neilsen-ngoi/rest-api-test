import axios from "axios";
import { User, PaginatedResponse } from "../types";

const API_URL = "https://reqres.in/api";

export const fetchUsers = async (
  page: number
): Promise<PaginatedResponse<User>> => {
  const response = await axios.get(`${API_URL}/users`, { params: { page } });
  return response.data;
};

export const fetchUserDetails = async (id: number): Promise<User> => {
  const response = await axios.get(`${API_URL}/user/${id}`);
  return response.data.data;
};
