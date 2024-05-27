// import axios from "axios";
// import { User, PaginatedResponse } from "../types";

// const API_URL = "https://reqres.in/api";

// export const fetchUsers = async (
//   page: number
// ): Promise<PaginatedResponse<User>> => {
//   const response = await axios.get(`${API_URL}/users`, { params: { page } });
//   return response.data;
// };

// export const fetchUserDetails = async (id: number): Promise<User> => {
//   const response = await axios.get(`${API_URL}/user/${id}`);
//   return response.data.data;
// };

// services/api.ts
import { User, PaginatedResponse } from "@/types";

export const fetchUsers = async (
  page: number
): Promise<PaginatedResponse<User>> => {
  const response = await fetch(`https://reqres.in/api/users?page=${page}`);
  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }
  return response.json();
};

export const fetchUser = async (id: number): Promise<User> => {
  const response = await fetch(`https://reqres.in/api/users/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch user");
  }
  const data = await response.json();
  return data.data;
};
