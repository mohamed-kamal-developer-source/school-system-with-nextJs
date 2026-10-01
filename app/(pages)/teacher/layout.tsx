// app/admin/layout.jsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { jwtVerify } from "jose";

const SECRET = new TextEncoder().encode("a1234");

export default async function AdminLayout({ children }) {
  const token = (await cookies()).get("token")?.value;

  let role = null;
  try {
    const { payload } = await jwtVerify(token, SECRET);
    role = payload.role;
  } catch {}

  if (role !== "teacher") redirect("/dashboard");

  return <>{children}</>;
}
