import { redirect } from "next/navigation";
import { auth } from "@/auth";
export default async function UnauthPage() {
  const getSession = await auth();
  if (getSession?.user) {
    redirect("/");
  }
  return (
    <div className="p-20 flex justify-center">
      <h2 className="text-3xl font-extrabold">
        Please sign in to continue shopping
      </h2>
    </div>
  );
}
