import Link from "next/link";
import { User } from "@/types/types";
import Image from "next/image";

// Define the props interface for the UserItem component
interface UserItemProps {
  user: User;
}

const UserItem: React.FC<UserItemProps> = ({ user }) => {
  return (
    <div className="border p-4 rounded-lg shadow-md flex items-center space-x-4">
      <Image
        src={user.avatar}
        alt={`${user.first_name} ${user.last_name}`}
        height={50}
        width={50}
        className="rounded-full"
      />
      <div>
        <h2 className=" font-bold text-xl">
          {user.first_name} {user.last_name}
        </h2>
        <p>{user.email}</p>
        {/* Render a link to the user details page */}
        <Link href={`/users/${user.id}`}>
          <p className="text-green-300">View user</p>
        </Link>
      </div>
    </div>
  );
};

export default UserItem;
