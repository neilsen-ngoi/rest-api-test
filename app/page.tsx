"use client";

import { useEffect, useState } from "react";
import UserItem from "../components/userItem";
import { fetchUsers } from "@/services/api";
import { User, PaginatedResponse } from "@/types";

// interface HomePageProps {
//   initialData: PaginatedResponse<User>;
// }

const HomePage: React.FC = () => {
  const [data, setData] = useState<PaginatedResponse<User> | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const initialData = await fetchUsers(1);
        setData(initialData);
      } catch (error) {
        console.error("Error fetching initial data:", ErrorEvent);
      }
    };
    fetchData();
  }, []);

  const handlePageChange = async (page: number) => {
    try {
      const newData = await fetchUsers(page);
      setData(newData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      {data ? (
        <>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {data?.data.map((user) => (
              <UserItem key={user.id} user={user} />
            ))}
          </div>
          <div className="flex justify-between mt-4">
            <button
              onClick={() => handlePageChange(data!.page - 1)}
              disabled={data!.page === 1}
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={() => handlePageChange(data!.page + 1)}
              disabled={data!.page === data!.total_pages}
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default HomePage;
