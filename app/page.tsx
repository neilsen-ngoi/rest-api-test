import Link from "next/link";
import React from "react";

const HomePage = () => {
  return (
    <div>
      <Link href={"/page"}>Go to List</Link>
    </div>
  );
};

export default HomePage;
