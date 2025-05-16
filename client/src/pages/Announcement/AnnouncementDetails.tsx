import { Suspense, useEffect, useState } from "react";
import { ChevronLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import FallbackLoadingComponent from "../../components/FallbackLoadingComponent/FallbackLoadingComponent";
import { Oval } from "react-loader-spinner";
import toast from "react-hot-toast";
import Advertisment from "../../components/Advertisment/Advertisment";

const API_URL = process.env.REACT_APP_CLIENT_URL;
interface AnnouncementProps {
  _id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
}
function AnnouncementDetails() {
  const [annoucementData, setAnnouncementData] = useState<AnnouncementProps>();
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteting, setIsDeleteting] = useState(false);
  const { id } = useParams();

  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  async function getAnnoucement() {
    try {
      setIsLoading(true);
      const res = await fetch(`${API_URL}/api/v1/secure/announcement/${id}`);
      if (!res.ok) {
        throw new Error(`Error fetching announcement`);
      }
      const { announcement } = await res.json();
      setAnnouncementData(announcement);
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  }

  useEffect(() => {
    getAnnoucement();
  }, []);

  async function handleDelete(id: string | undefined) {
    console.log(id);
    setIsDeleteting(true);

    try {
      if (
        window.confirm("Are you sure you want to delete this announcement?")
      ) {
        const res = await fetch(`${API_URL}/api/v1/secure/announcement/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error(`Error Deleting announcement`);
        }

        navigate("/secure/announcement");
        toast.success("Announcement Deleted");
      } else {
        // User clicked "Cancel"
        console.log("Deletion cancelled by user.");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => {
        setIsDeleteting(false);
      }, 500);
    }
  }

  return (
    <div>
      <header>
        <button className="flex space-x-2" onClick={handleBackClick}>
          {" "}
          <ChevronLeft />
          Back
        </button>
      </header>
      <main>
        {isLoading ? (
          <div className=" flex justify-center items-center w-full py-8">
            <Oval height="48" width="48" />
          </div>
        ) : (
          <section>
            <div className="top md:flex md:justify-between md:items-center mt-8 ">
              <div className="left">
                <h1 className="text-2xl text-[#212529] font-bold">
                  {annoucementData?.title}
                </h1>
              </div>
            </div>
            <Suspense fallback={<FallbackLoadingComponent />}>
              <p className="mt-8 text-sm leading-8">
                {annoucementData?.description}
              </p>
            </Suspense>
          </section>
        )}
      </main>
      <Advertisment />
    </div>
  );
}

export default AnnouncementDetails;
