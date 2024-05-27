import { useRouter } from "next/router";
import UserDetails from "@/components/userDetails";
import { fetchUser } from "@/services/api";
import { User } from "@/types";
import { useEffect, useState } from "react";

const UserDetailsPage: React.FC = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const fetchedUser = await fetchUser(Number(id));
          setUser(fetchedUser);
        } catch (error) {
          console.error("Failed to fetch user data");
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!user) {
    return <p>No user found.</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Details</h1>
      <UserDetails user={user} />
    </div>
  );
};

export default UserDetailsPage;
