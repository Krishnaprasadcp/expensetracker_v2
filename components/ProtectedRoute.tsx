import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}
const PUBLIC_ROUTES = ["/signup", "/login"];

const ProtectedRouteComponent: React.FC<ProtectedRouteProps> = ({
  children,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    if (PUBLIC_ROUTES.includes(pathname)) {
      return;
    }
    const checkAuth = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/authentication/protectedRoute`,
          { credentials: "include" }
        );
        const data = await response.json();

        if (response.ok && data.message) {
        } else {
          router.push("/");
        }
      } catch (error) {}
    };
    checkAuth();
  }, [router, pathname]);

  return <>{children}</>;
};
export default ProtectedRouteComponent;
