import UpdateButton from "@/components/updateButton/UpdateButton";
import { updateUser } from "@/lib/acttions";
import { wixClientServer } from "@/lib/wixClientServer";
import { members } from "@wix/members";
import React, { useContext } from "react";

async function ProfilePage() {
  const wixClient = await wixClientServer();

  const user = await wixClient.members.getCurrentMember({
    fieldsets: [members.Set.FULL],
  });

  if (!user.member?._id) {
    return <div className="">User not Logged In</div>;
  }
  //   console.log(user);
  return (
    <div className="flex flex-col md:flex-row gap-24 md:h-[calc(100vh-80px)] px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 items-center justify-center">
      <div className="w-full md:w-1/2 ">
        <h1 className="text-2xl mt-6">User Profile</h1>
        <form action={updateUser} className="mt-6 flex flex-col gap-4">
          <input type="hidden" name="id" value={user.member?.contactId!} />
          <label htmlFor="" className="text-sm text-gray-700">
            Username
          </label>
          <input
            type="text"
            name="name"
            placeholder={user.member?.profile?.nickname || "John"}
            className="ring-1 ring-gray-300 rounded-md p-2 max-w-90"
          />
          <label htmlFor="" className="text-sm text-gray-700">
            First Name
          </label>
          <input
            type="text"
            name="firstname"
            placeholder={user.member?.contact?.firstName || "John"}
            className="ring-1 ring-gray-300 rounded-md p-2 max-w-90"
          />
          <label htmlFor="" className="text-sm text-gray-700">
            Last Name
          </label>
          <input
            type="text"
            name="lastname"
            placeholder={user.member?.contact?.lastName || "Doe"}
            className="ring-1 ring-gray-300 rounded-md p-2 max-w-90"
          />
          <label htmlFor="" className="text-sm text-gray-700">
            Phone Number
          </label>
          <input
            type="text"
            name="phone"
            placeholder={
              (user.member?.contact?.phones &&
                user.member?.contact?.phones[0]) ||
              "+99398"
            }
            className="ring-1 ring-gray-300 rounded-md p-2 max-w-90"
          />
          <label htmlFor="" className="text-sm text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder={user.member?.loginEmail || "john@yahoo.com"}
            className="ring-1 ring-gray-300 rounded-md p-2 max-w-90"
          />
          <UpdateButton />
        </form>
      </div>
      <div className="w-full md:w-1/2 ">Orders</div>
    </div>
  );
}

export default ProfilePage;
