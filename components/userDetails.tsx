"use client";

import { User } from "@/types/types";
import Image from "next/image";
import React from "react";

interface UserDetailsProps {
  user: User;
}

const UserDetails: React.FC<UserDetailsProps> = ({ user }) => {
  return (
    <div className="border p-4 rounded-lg shadow-md">
      <Image
        src={user.avatar}
        alt={`${user.first_name} ${user.last_name}`}
        width={150}
        height={150}
        className="rounded-full mx-auto"
      />
      <h2 className="text-2xl font-bold text-center mt-4">
        {user.first_name} {user.last_name}
      </h2>
      <p className="text-center mt-2">{user.email}</p>
    </div>
  );
};

export default UserDetails;
