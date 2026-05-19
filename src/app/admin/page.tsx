import { getSession } from "@/lib/session";
import { AdminDashboard } from "./dashboard";
import { LoginForm } from "./login-form";

export const metadata = {
  title: "Admin | AI Store",
};

export default async function AdminPage() {
  const session = await getSession();

  if (!session.isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <LoginForm />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <AdminDashboard />
    </div>
  );
}
