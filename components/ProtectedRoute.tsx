import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}
const ProtectedRouteComponent: React.FC<ProtectedRouteProps> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/authentication/protectedRoute`,
          { credentials: "include" }
        );
        const data = await response.json();

        if (response.ok && data.message) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          router.push("/");
        }
      } catch (error) {}
    };
    checkAuth();
  }, [router]);

  return <>{children}</>;
};
export default ProtectedRouteComponent;
