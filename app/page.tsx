import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const HomePage = () => {
  return (
    <div className=" w-full h-screen items-center justify-center flex">
      <Button asChild>
        <Link href={"/page"}>Go to List</Link>
      </Button>
    </div>
  );
};

export default HomePage;
