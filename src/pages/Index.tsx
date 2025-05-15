
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";

const Index = () => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    // Here you would implement logout logic
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Logo />
            <span className="font-bold text-xl">App Dashboard</span>
          </div>
          <Button variant="outline" onClick={handleLogout}>Logout</Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white shadow rounded-lg p-6">
          <h1 className="text-2xl font-semibold mb-4">Welcome to your Dashboard</h1>
          <p className="text-gray-600">
            You have successfully logged in. This is a protected page that users 
            can only see after authentication.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Index;
