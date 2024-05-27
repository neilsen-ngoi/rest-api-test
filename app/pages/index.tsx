import { GetServerSideProps } from "next";
import { useState } from "react";
import UserItem from "../../components/userItem";
import { fetchUsers } from "@/services/api";
import { User, PaginatedResponse } from "@/types";
import React from "react";

interface HomePageProps {
  initialData: PaginatedResponse<User>;
}

const HomePage: React.FC<HomePageProps> = ({ initialData }) => {
  const [data, setData] = useState(initialData);

  const handlePageChange = async (page: number) => {
    const newData = await fetchUsers(page);
    setData(newData);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {data.data.map((user) => (
          <UserItem key={user.id} user={user} />
        ))}
      </div>
      <div className="flex justify-between mt-4">
        <button
          onClick={() => handlePageChange(data.page - 1)}
          disabled={data.page === 1}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={() => handlePageChange(data.page + 1)}
          disabled={data.page === data.total_pages}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const initialData = await fetchUsers(1);
  return { props: { initialData } };
};

export default HomePage;
