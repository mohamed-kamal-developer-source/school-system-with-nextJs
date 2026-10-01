export async function logoutUser(): Promise<void> {
  await fetch("/api/auth/logout", { method: "POST" });
}