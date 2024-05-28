"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { fetchUsers } from "@/services/api";
import { User, PaginatedResponse } from "@/types/types";

const UserList: React.FC = () => {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const response: PaginatedResponse<User> = await fetchUsers(page);
        setUsers(response.data);
      } catch (err) {
        setError("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, [page]);

  const handleUserClick = (id: number) => {
    router.push(`/users/${id}`);
  };

  return (
    <div>
      <h1>User List</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {users.map((user) => (
          <li key={user.id} onClick={() => handleUserClick(user.id)}>
            {user.first_name} {user.last_name}
          </li>
        ))}
      </ul>
      <button onClick={() => setPage(page - 1)} disabled={page === 1}>
        Previous
      </button>
      <button onClick={() => setPage(page + 1)}>Next</button>
    </div>
  );
};

export default UserList;
