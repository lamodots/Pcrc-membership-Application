import { PropsWithChildren, useEffect } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useCurrentUser } from "../../context/AdminContext";
import { Oval } from "react-loader-spinner";

function AdminProtectedRoute({ children }: PropsWithChildren<{}>) {
  const { currentUser, loading, fetchCurrentUser } = useCurrentUser();
  const location = useLocation();
  console.log("ADMINSIUITARTOR", currentUser);
  const navigate = useNavigate();
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

  // Check if we have user data at all
  if (!currentUser) {
    return <Navigate to="/secure/login" replace state={{ from: location }} />;
  }

  // Try to get the role from wherever it might be in the object structure
  let userRole;
  if (typeof currentUser === "object") {
    // Check if it's directly on currentUser
    if ("role" in currentUser) {
      userRole = (currentUser as any).role;
    }
    // Check if it's nested in a user property
    else if (currentUser.user && "role" in currentUser.user) {
      userRole = currentUser.user.role;
    }
  }

  console.log("Detected user role:", userRole);

  if (!userRole || (userRole !== "admin" && userRole !== "moderator")) {
    return <Navigate to="/secure/login" replace state={{ from: location }} />;
  }
  return <>{children || <Outlet />}</>;
}

export default AdminProtectedRoute;
// https://www.gov.uk/government/publications/skilled-worker-visa-immigration-salary-list/skilled-worker-visa-immigration-salary-list
