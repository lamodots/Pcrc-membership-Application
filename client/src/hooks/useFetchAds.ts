import { useState, useEffect } from "react";
const API_URL = process.env.REACT_APP_CLIENT_URL;
// Define types for ad data structure
interface Ad {
  _id: string;
  topImageLink?: string;
  bottomRightImageLink?: string;
  bottomLeftImageLink?: string;
  topImage: string;
  bottomLeftImage: string;
  bottomRightImage: string;
  // Add any other fields your ads may have
}

// Define types for API response
interface ApiResponse {
  success: boolean;
  data: Ad[];
  message?: string;
}

// Define types for hook options
interface UseAdsOptions {
  fetchOnMount?: boolean;
}

// Define types for hook return value
interface UseAdsReturn {
  ads: Ad[];
  loading: boolean;
  error: string | null;
}

/**
 * Custom React hook to fetch advertisements
 * @param options - Configuration options
 * @returns Object containing ads data and control functions
 */
const useAds = ({ fetchOnMount = true }: UseAdsOptions = {}): UseAdsReturn => {
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetches advertisements from the API
   */
  const fetchAds = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${API_URL}/api/v1/secure/advertisment`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data: ApiResponse = await response.json();

      if (data.success) {
        setAds(data.data);
      } else {
        throw new Error(data.message || "Failed to fetch ads");
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "An error occurred while fetching ads";
      setError(errorMessage);
      console.error("Error fetching ads:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch ads on mount if enabled
  useEffect(() => {
    if (fetchOnMount) {
      fetchAds();
    }
  }, [fetchOnMount]);

  return {
    ads,
    loading,
    error,
  };
};

export default useAds;
