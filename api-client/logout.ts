export async function logoutUser(): Promise<void> {
  const response = await fetch("/api/auth/logout", { method: "POST" });
  if (!response.ok) {
    throw new Error("Unable to log out. Please try again.");
  }
}
