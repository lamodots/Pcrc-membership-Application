import { Link } from "react-router-dom";

function NotificationComponent() {
  return (
    <div className="relative z-50 top-[120px] right-[140px] bg-white w-full max-w-lg p-6 rounded-lg shadow-lg overflow-y-auto h-fit ">
      <div className="mb-6">
        <div>
          <p className="text-sm">
            <Link to="/announcement/1">
              To create a variable that should store a number, look at the
              following example
            </Link>
          </p>
          <span className="text-xs text-slate-400">20-11-2024</span>
        </div>
      </div>
      <Link to="/announcement" className="text-[#1A4F83]">
        Read more
      </Link>
    </div>
  );
}

export default NotificationComponent;
