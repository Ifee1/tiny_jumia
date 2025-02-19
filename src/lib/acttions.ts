"use server";

import { wixClientServer } from "./wixClientServer";

export async function updateUser(formData: FormData) {
  const wixClient = await wixClientServer();
  const id = formData.get("id") as string;
  const username = formData.get("username") as string;
  const firstname = formData.get("firstname") as string;
  const lastname = formData.get("lastname") as string;
  const phone = formData.get("phone") as string;
  //   const email = formData.get("email") as string;

  try {
    const response = await wixClient.members.updateMember(id, {
      contact: {
        firstName: firstname || "",
        lastName: lastname || "",
        phones: [phone],
      },
      //   loginEmail: email || undefined,
      profile: { nickname: username || "" },
    });
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}
