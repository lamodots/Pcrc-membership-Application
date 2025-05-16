import React, { lazy, Suspense } from "react";
import { Toaster } from "react-hot-toast";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./layouts/ProtectedRoute/ProtectedRoute";
import DashboardLayout from "./layouts/DashboardLayout/DashboardLayout";
import FallbackLoadingComponent from "./components/FallbackLoadingComponent/FallbackLoadingComponent";
import AdminProtectedRoute from "./layouts/AdminProtectedRoute/AdminProtectedRoute";
//******** */ Admin Dashboard Page Imports
import AdminDashboardLayout from "./layouts/AdminDashboardLayout/AdminDashboardLayout";
import { AuthContext } from "./context/AdminContext";
import Payments from "./pages/Admin/MembersDues/Payments";
import RegisterConfirmation from "./pages/Register/RegisterConfirmation";

const AdminOverViewPage = lazy(
  () => import("./pages/Admin/OverViewPage/OverViewPage")
);
const AdminOnboardingStepTwo = lazy(
  () => import("./pages/Admin/Onboarding/OnboardingStepTwo")
);

const AdminLogin = lazy(() => import("./pages/Admin/Login/Login"));

const AdminSettings = lazy(() => import("./pages/Admin/Settings/Settings"));
const AdminSubscription = lazy(
  () => import("./pages/Admin/Subscription/CreateSubScriptions")
);
const AdminMembersDues = lazy(
  () => import("./pages/Admin/MembersDues/MembersDues")
);
const AdminMembershipPayment = lazy(
  () => import("./pages/Admin/MembersDues/MembershipPayment")
);
const AdminWelfarePayment = lazy(
  () => import("./pages/Admin/MembersDues/WelfarePayment")
);
const AdminSubscriptionList = lazy(
  () => import("./pages/Admin/Subscription/Subscription")
);

const AdminSubscriptionDetails = lazy(
  () => import("./pages/Admin/Subscription/SubscriptionDetails")
);
const AdminMembers = lazy(() => import("./pages/Admin/Members/Members"));
const AdminCreateMember = lazy(
  () => import("./pages/Admin/Members/CreateNewMember")
);
const AdminMemberRegisterList = lazy(
  () => import("./pages/Admin/Members/MembersRegister")
);
const AdminMembersDetails = lazy(
  () => import("./pages/Admin/Members/AdminMembersDetails")
);

const AdminEditSubscription = lazy(
  () => import("./pages/Admin/Subscription/EditSubcription")
);

const AdminAnnouncements = lazy(
  () => import("./pages/Admin/Announcement/Announcement")
);
const AdminAnnouncementsDetails = lazy(
  () => import("./pages/Admin/Announcement/AnnouncementDetails")
);
const AdminCreateAnnouncement = lazy(
  () => import("./pages/Admin/Announcement/CreateAnnouncement")
);
const AdminEditAnnouncement = lazy(
  () => import("./pages/Admin/Announcement/EditAnnouncement")
);
const AdminCreateEvent = lazy(() => import("./pages/Admin/Events/CreateEvent"));

const AdminEvents = lazy(() => import("./pages/Admin/Events/Events"));

const AdminEventDetails = lazy(
  () => import("./pages/Admin/Events/EventDetails")
);
const AdminCertificate = lazy(
  () => import("./pages/Admin/Certificate/Certificate")
);

const AdminEditEvent = lazy(() => import("./pages/Admin/Events/EditEvents"));
const AdminApprove = lazy(() => import("./pages/Admin/Events/ApproveEvent"));
const AdminRegisterEvent = lazy(
  () => import("./pages/Admin/Events/RegisterEvent")
);

const AdminAdvertisment = lazy(
  () => import("./pages/Admin/Advertisment/Advertisment")
);
const AdminQRCodeScanner = lazy(() => import("./pages/Admin/Events/Scan"));

const AdminIdCard = lazy(() => import("./pages/Admin/IdCard/IdCard"));

//********** * Auth Pages
const Register = lazy(() => import("./pages/Register/Register"));
const EmailVerifcation = lazy(
  () => import("./pages/Register/EmailVerifcation")
);

const Login = lazy(() => import("./pages/Login/Login"));

const ForgotPassword = lazy(
  () => import("./pages/ForgotPassword/ForgotPassword")
);
const ResetPassword = lazy(() => import("./pages/ResetPassword/ResetPassword"));

// Onboarding Pages
const OnboardingWelcome = lazy(
  () => import("./pages/Onboarding/OnboardingWelcome")
);

//********* USER Dashboard Pages
const OverViewPage = lazy(() => import("./pages/OverViewPage/OverViewPage"));

const Members = lazy(() => import("./pages/Members/Members"));
const MembersDetails = lazy(() => import("./pages/Members/MembersDetails"));
const Subscription = lazy(() => import("./pages/Subscription/Subscription"));
const MyDues = lazy(() => import("./pages/Subscription/MyDues"));
const Events = lazy(() => import("./pages/Events/Events"));
const Certificate = lazy(() => import("./pages/Certificate/Certificate"));
const IdCard = lazy(() => import("./pages/IdCard/IdCard"));
const Donate = lazy(() => import("./pages/Donate/Donate"));
const Settings = lazy(() => import("./pages/Settings/Settings"));
const Announcement = lazy(() => import("./pages/Announcement/Announcement"));
const AnnouncementDetails = lazy(
  () => import("./pages/Announcement/AnnouncementDetails")
);
const Profile = lazy(() => import("./pages/Profile/Profile"));
const EventDetails = lazy(() => import("./pages/Events/EventDetails"));
const UserEventRegister = lazy(() => import("./pages/Events/Register"));
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Suspense fallback={<FallbackLoadingComponent />}>
        <AuthContext>
          <Routes>
            {/* Public Routes */}
            <Route path="/register" element={<Register />} />
            <Route path="/verify" element={<EmailVerifcation />} />
            <Route
              path="/verify-email-sent"
              element={<RegisterConfirmation />}
            />

            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="events/details/:id" element={<EventDetails />} />
            <Route path="events/:id/register" element={<UserEventRegister />} />
            <Route path="events" element={<Events />} />
            <Route path="/member-onboarding">
              <Route index element={<OnboardingWelcome />} />
            </Route>
            <Route
              path="events/details/:id/register"
              element={<h1>Register events</h1>}
            />
            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              {/* Onboarding */}
              {/* <Route path="/member-onboarding">
                <Route index element={<OnboardingWelcome />} />
               
              </Route> */}
              {/* Dashboard */}
              <Route path="/" element={<DashboardLayout />}>
                <Route index element={<OverViewPage />} />

                <Route path="members" element={<Members />} />
                <Route
                  path="members/details/:id"
                  element={<MembersDetails />}
                />
                <Route path="subscription" element={<Subscription />} />
                <Route path="subscription/dues" element={<MyDues />} />
                <Route path="events" element={<Events />} />
                {/* <Route path="certificate" element={<Certificate />} /> */}
                <Route path="id_card" element={<IdCard />} />
                <Route path="donate" element={<Donate />} />
                <Route path="settings" element={<Settings />} />
                <Route path="announcement" element={<Announcement />} />
                <Route
                  path="announcement/details/:id"
                  element={<AnnouncementDetails />}
                />
                <Route path="profile" element={<Profile />} />
              </Route>
            </Route>
          </Routes>
        </AuthContext>
      </Suspense>

      {/* //ADMIN ROUTES */}
      <Suspense>
        <AuthContext>
          <Routes>
            <Route path="/secure/login" element={<AdminLogin />} />

            {/* register should be protected */}
            <Route
              path="/secure/register"
              element={<AdminOnboardingStepTwo />}
            />

            {/* Dashboard */}
            <Route
              path="/secure"
              element={
                <AdminProtectedRoute>
                  <AdminDashboardLayout />
                </AdminProtectedRoute>
              }
            >
              <Route index element={<AdminOverViewPage />} />

              <Route path="members" element={<AdminMembers />} />
              <Route
                path="members-register"
                element={<AdminMemberRegisterList />}
              />
              <Route path="members/create" element={<AdminCreateMember />} />
              <Route
                path="members/details/:memberId"
                element={<AdminMembersDetails />}
              />

              <Route path="payments" element={<AdminMembersDues />}>
                <Route index element={<Payments />} />
                <Route
                  index
                  path="membership-payments"
                  element={<AdminMembershipPayment />}
                />
                <Route
                  path="welfare-payments"
                  element={<AdminWelfarePayment />}
                />
              </Route>
              {/* Changed this idea
              
              <Route
                path="members-dues/create"
                element={<AdminSubscription />}
              />
              <Route
                path="members-dues/details/:subId"
                element={<AdminSubscriptionDetails />}
              />
              <Route
                path="members-dues/details/:subId/edit"
                element={<AdminEditSubscription />}
              /> */}
              <Route path="events" element={<AdminEvents />} />
              <Route path="events/create" element={<AdminCreateEvent />} />
              <Route
                path="events/details/:id"
                element={<AdminEventDetails />}
              />

              <Route
                path="events/details/:id/edit"
                element={<AdminEditEvent />}
              />
              <Route path="events/:id/approve" element={<AdminApprove />} />
              <Route path="events/:id/scan" element={<AdminQRCodeScanner />} />
              {/* <Route path="certificate" element={<AdminCertificate />} /> */}
              <Route path="id_card" element={<AdminIdCard />} />
              <Route path="advertisment" element={<AdminAdvertisment />} />
              <Route path="settings" element={<AdminSettings />} />
              <Route path="announcement" element={<AdminAnnouncements />} />
              <Route
                path="announcement/create"
                element={<AdminCreateAnnouncement />}
              />
              <Route
                path="announcement/details/:id"
                element={<AdminAnnouncementsDetails />}
              />
              <Route
                path="announcement/details/:id/edit"
                element={<AdminEditAnnouncement />}
              />
              {/* <Route path="profile" element={<Profile />} /> */}
            </Route>
          </Routes>
        </AuthContext>
      </Suspense>
    </BrowserRouter>
    <Toaster />
  </React.StrictMode>
);
// I want user to only access Dashboard if they have completed onboarding and the onboarding will not show again if user complete it
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
