import { PropsWithChildren, useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useCurrentUser } from "../../context/AdminContext";
import { Oval } from "react-loader-spinner";

const ProtectedRoute = ({ children }: PropsWithChildren<{}>) => {
  const { currentUser, loading, fetchCurrentUser } = useCurrentUser();
  const location = useLocation();

  useEffect(() => {
    if (!currentUser) {
      fetchCurrentUser(); // Ensure currentUser is always fetched
    }
  }, [currentUser, fetchCurrentUser]);

  if (loading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <Oval height="40" width="40" color="#4A90E2" />
      </div>
    );
  }
  if (!currentUser) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (!currentUser.user.isOnboarded) {
    return <Navigate to="/member-onboarding" replace />;
  }
  return <> {children || <Outlet />}</>;
};

export default ProtectedRoute;
