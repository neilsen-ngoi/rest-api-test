"use client";

import { useEffect, useState } from "react";
import UserItem from "../../components/userItem";
import { PaginatedResponse, User } from "@/types/types";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";

const HomePage: React.FC = () => {
  const router = useRouter();
  const [allUsers, setAllUsers] = useState<PaginatedResponse<User> | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const searchParams = useSearchParams();
  const pageNumber = searchParams.get("pageNumber");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const initialData: { data: PaginatedResponse<User> } = await axios.get(
          `https://reqres.in/api/users?page=${Number(pageNumber) || 1}`
        );

        setAllUsers(initialData.data);
      } catch (error) {
        console.error("Error fetching initial data:", ErrorEvent);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [pageNumber]);

  const handlePageChange = async (page: number) => {
    router.push(`/page?pageNumber=${page}`);
    setLoading(false);
  };

  const handleClick = (user: User) => {
    router.push(`/users/${user.id}`);
  };

  if (loading) {
    return <p>Loading...</p>;
  }
  console.log(allUsers?.data);
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      {!!allUsers && allUsers.data ? (
        <>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {allUsers.data.map((user) => (
              <div key={user.id} onClick={() => handleClick(user)}>
                <UserItem user={user} />
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4">
            <button
              onClick={() => handlePageChange(allUsers.page - 1)}
              disabled={allUsers.page === 1}
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={() => handlePageChange(allUsers.page + 1)}
              disabled={allUsers.page === allUsers.total_pages}
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
};

export default HomePage;
