import { useWixClient } from "@/hooks/useWixClient";
import { wixClientServer } from "@/lib/wixClientServer";
import { members } from "@wix/members";
import React from "react";

async function ProfilePage() {
  const wixClient = await wixClientServer();

  const user = await wixClient.members.getCurrentMember({
    fieldsets: [members.Set.FULL],
  });

  if (!user.member?._id) {
    <div className="">User not Logged In</div>;
  }
  //   console.log(user);
  return (
    <div className=" flex flex-col md:flex-row gap-24 md:h-[calc(100vh-80px)] px-4 md:px-8 lg:pd-16 xl:px-32 2xl:px-64 items-center justify-center">
      <div className="w-full md:w-1/2 ">
        <h1>User Information</h1>

        <h2>{user.member?.profile?.nickname}</h2>
      </div>
      <div className="w-full md:w-1/2 ">Orders</div>
    </div>
  );
}

export default ProfilePage;
