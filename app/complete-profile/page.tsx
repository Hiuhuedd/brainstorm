// app/complete-profile/page.tsx
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import ProfileForm from "../Components/ProfileForm/ProfileForm";

export default function CompleteProfile() {
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }

  return <ProfileForm />;
}