"use client";

// Import necessary modules and components
import { PaginatedResponse, User } from "@/types/types";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import UserItem from "../../components/userItem";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const HomePage = () => {
  // Get the router instance
  const router = useRouter();

  // State to store the paginated user data
  const [allUsers, setAllUsers] = useState<PaginatedResponse<User> | null>(
    null
  );

  // State to track loading status
  const [loading, setLoading] = useState<boolean>(true);

  // Get the current page number from the query parameters
  const searchParams = useSearchParams();
  const pageNumber = searchParams.get("pageNumber");

  // Fetch user data when the component mounts or the page number changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        //  GET request to fetch user data for the current page
        const initialData: { data: PaginatedResponse<User> } = await axios.get(
          `https://reqres.in/api/users?page=${Number(pageNumber) || 1}`
        );

        // Update the allUsers state with the fetched data
        setAllUsers(initialData.data);
      } catch (error) {
        toast("Error fetching initial data:");
      } finally {
        // Set loading to false after data is fetched or an error occurs
        setLoading(false);
      }
    };
    fetchData();
  }, [pageNumber]);

  // Handle page change
  const handlePageChange = async (page: number) => {
    // Update the URL with the new page number
    router.push(`/page?pageNumber=${page}`);
    setLoading(false);
  };

  // Handle user click
  const handleClick = (user: User) => {
    // Navigate to the user details page
    router.push(`/users/${user.id}`);
  };

  // If data is loading, show a loading message
  if (loading) {
    return <p>Loading...</p>;
  }

  // Log the fetched user data for debugging
  console.log(allUsers?.data);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      {/* If allUsers has data, render the user list and pagination */}
      {!!allUsers && allUsers.data ? (
        <>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {/* Map over the user data and render UserItem components */}
            {allUsers.data.map((user) => (
              <div key={user.id} onClick={() => handleClick(user)}>
                <UserItem user={user} />
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4">
            {/* Previous button */}
            <Button
              onClick={() => handlePageChange(allUsers.page - 1)}
              disabled={allUsers.page === 1}
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            >
              Previous
            </Button>
            {/* Next button */}
            <Button
              onClick={() => handlePageChange(allUsers.page + 1)}
              disabled={allUsers.page === allUsers.total_pages}
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            >
              Next
            </Button>
          </div>
        </>
      ) : (
        // If no user data is available, show a message
        <p>No users found.</p>
      )}
    </div>
  );
};

export default HomePage;
