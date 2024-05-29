import UserDetails from "@/components/userDetails";
import { User } from "@/types/types";
import axios from "axios";

const UserDetailsPage = async ({ params }: { params: { id: string } }) => {
  // Destructure the id parameter from the params object
  const { id } = params;

  // Fetch the user details data from the API
  const { data: allUserDetails }: { data: { data: User } } = await axios.get(
    `https://reqres.in/api/users/${id}`
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Details</h1>
      {/* Render the UserDetails component and pass the fetched user data as a prop */}
      <UserDetails user={allUserDetails.data} />
    </div>
  );
};

export default UserDetailsPage;
