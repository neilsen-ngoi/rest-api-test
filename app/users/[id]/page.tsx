import UserDetails from "@/components/userDetails";
import { PaginatedResponse, User } from "@/types/types";
import axios from "axios";

const UserDetailsPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const { data: allUserDetails }: { data: { data: User } } = await axios.get(
    `https://reqres.in/api/users/${id}`
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Details</h1>
      <UserDetails user={allUserDetails.data} />
    </div>
  );
};

export default UserDetailsPage;
