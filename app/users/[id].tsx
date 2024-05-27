import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import UserDetails from "@/components/userDetails";
import { fetchUserDetails } from "@/services/api";
import { User } from "@/types";

interface UserDetailsPageProps {
  user: User;
}

const UserDetailsPage: React.FC<UserDetailsPageProps> = ({ user }) => {
  const router = useRouter();
  return (
    <div className="container mx-auto p-4">
      <button onClick={() => router.back()} className="mb-4 text-blue-500">
        Back
      </button>
      <UserDetails user={user} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;
  const user = await fetchUserDetails(Number(id));
  return { props: { user } };
};

export default UserDetailsPage;
