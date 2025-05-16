import React, { useState, ChangeEvent, FormEvent } from "react";
const API_URL = process.env.REACT_APP_CLIENT_URL;
function Advertisement() {
  // Image file states
  const [topImage, setTopImage] = useState<File | null>(null);
  const [topImagePreview, setTopImagePreview] = useState<string | null>(null);
  const [topImageLink, setTopImageLink] = useState<string>("");

  const [bottomLeftImage, setBottomLeftImage] = useState<File | null>(null);
  const [bottomLeftImagePreview, setBottomLeftImagePreview] = useState<
    string | null
  >(null);
  const [bottomLeftImageLink, setBottomLeftImageLink] = useState<string>("");

  const [bottomRightImage, setBottomRightImage] = useState<File | null>(null);
  const [bottomRightImagePreview, setBottomRightImagePreview] = useState<
    string | null
  >(null);
  const [bottomRightImageLink, setBottomRightImageLink] = useState<string>("");

  // Form submission states
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);

  // Handle file change with preview generation
  const handleFileChange = (
    e: ChangeEvent<HTMLInputElement>,
    setFile: React.Dispatch<React.SetStateAction<File | null>>,
    setPreview: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
    const file = e.target.files?.[0] || null;
    setFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  // URL validation helper
  const isValidURL = (url: string): boolean => {
    if (!url) return true; // Empty URLs are valid (optional links)
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Reset states
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      // Check if at least one image is selected
      if (!topImage && !bottomLeftImage && !bottomRightImage) {
        throw new Error("Please select at least one image");
      }

      // Validate URLs
      if (
        !isValidURL(topImageLink) ||
        !isValidURL(bottomLeftImageLink) ||
        !isValidURL(bottomRightImageLink)
      ) {
        throw new Error("Please enter valid URLs for image links");
      }

      // Create FormData object for the backend
      const formData = new FormData();

      // Append images and their links if they exist
      if (topImage) {
        formData.append("topImage", topImage);
        formData.append("topImageLink", topImageLink);
      }

      if (bottomLeftImage) {
        formData.append("bottomLeftImage", bottomLeftImage);
        formData.append("bottomLeftImageLink", bottomLeftImageLink);
      }

      if (bottomRightImage) {
        formData.append("bottomRightImage", bottomRightImage);
        formData.append("bottomRightImageLink", bottomRightImageLink);
      }

      console.log(formData);

      const response = await fetch(
        `${API_URL}/api/v1/secure/advertisment/create-ads`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        // catch the response error
        throw new Error(errorData.message || "Failed to upload advertisement");
      }

      // Handle successful submission
      setSubmitSuccess(true);
    } catch (error) {
      // Handle error
      setSubmitError(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset form function
  const resetForm = () => {
    setTopImage(null);
    setTopImagePreview(null);
    setTopImageLink("");

    setBottomLeftImage(null);
    setBottomLeftImagePreview(null);
    setBottomLeftImageLink("");

    setBottomRightImage(null);
    setBottomRightImagePreview(null);
    setBottomRightImageLink("");

    setSubmitSuccess(false);
    setSubmitError(null);
  };

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold">Place Advertisement</h1>

      {/* Status messages */}
      {submitSuccess && (
        <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-md">
          Advertisement successfully uploaded!
        </div>
      )}

      {submitError && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
          Error: {submitError}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="ads my-10 w-full max-w-[1100px] mx-auto overflow-hidden">
          <div className="ads1 w-full mb-1 border border-gray-400 rounded-md p-6">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Top Advertisement
              </label>

              {/* Top image input */}
              <div className="mb-3">
                <p className="text-sm text-gray-600 mb-1">
                  Image (JPG, PNG, GIF, WebP accepted)
                </p>
                <input
                  type="file"
                  name="topImage"
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  onChange={(e) =>
                    handleFileChange(e, setTopImage, setTopImagePreview)
                  }
                  accept="image/jpeg,image/png,image/gif,image/webp"
                />
              </div>

              {/* Top image link input */}
              <div className="mb-3">
                <p className="text-sm text-gray-600 mb-1">
                  Link URL (where users will go when clicking the image)
                </p>
                <input
                  type="url"
                  name="topImageLink"
                  placeholder="https://example.com"
                  value={topImageLink}
                  onChange={(e) => setTopImageLink(e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm p-2 border"
                />
              </div>

              {/* Top image info and preview */}
              {topImage && (
                <p className="mt-2 text-sm text-gray-500">
                  Selected: {topImage.name} ({(topImage.size / 1024).toFixed(2)}{" "}
                  KB)
                </p>
              )}
              {topImagePreview && (
                <div className="mt-4">
                  <p className="text-sm mb-1">Preview:</p>
                  <img
                    src={topImagePreview}
                    alt="Top preview"
                    className="max-h-48 rounded-md object-contain"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="ads_bottom grid grid-cols-1 md:grid-cols-2 gap-1">
            <div className="left border border-gray-400 rounded-md p-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bottom Left Advertisement
                </label>

                {/* Bottom left image input */}
                <div className="mb-3">
                  <p className="text-sm text-gray-600 mb-1">
                    Image (JPG, PNG, GIF, WebP accepted)
                  </p>
                  <input
                    type="file"
                    name="bottomLeftImage"
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    onChange={(e) =>
                      handleFileChange(
                        e,
                        setBottomLeftImage,
                        setBottomLeftImagePreview
                      )
                    }
                    accept="image/jpeg,image/png,image/gif,image/webp"
                  />
                </div>

                {/* Bottom left image link input */}
                <div className="mb-3">
                  <p className="text-sm text-gray-600 mb-1">
                    Link URL (where users will go when clicking the image)
                  </p>
                  <input
                    type="url"
                    name="bottomLeftImageLink"
                    placeholder="https://example.com"
                    value={bottomLeftImageLink}
                    onChange={(e) => setBottomLeftImageLink(e.target.value)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm p-2 border"
                  />
                </div>

                {/* Bottom left image info and preview */}
                {bottomLeftImage && (
                  <p className="mt-2 text-sm text-gray-500">
                    Selected: {bottomLeftImage.name} (
                    {(bottomLeftImage.size / 1024).toFixed(2)} KB)
                  </p>
                )}
                {bottomLeftImagePreview && (
                  <div className="mt-4">
                    <p className="text-sm mb-1">Preview:</p>
                    <img
                      src={bottomLeftImagePreview}
                      alt="Bottom Left preview"
                      className="max-h-48 rounded-md object-contain"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="right border border-gray-400 rounded-md p-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bottom Right Advertisement
                </label>

                {/* Bottom right image input */}
                <div className="mb-3">
                  <p className="text-sm text-gray-600 mb-1">
                    Image (JPG, PNG, GIF, WebP accepted)
                  </p>
                  <input
                    type="file"
                    name="bottomRightImage"
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    onChange={(e) =>
                      handleFileChange(
                        e,
                        setBottomRightImage,
                        setBottomRightImagePreview
                      )
                    }
                    accept="image/jpeg,image/png,image/gif,image/webp"
                  />
                </div>

                {/* Bottom right image link input */}
                <div className="mb-3">
                  <p className="text-sm text-gray-600 mb-1">
                    Link URL (where users will go when clicking the image)
                  </p>
                  <input
                    type="url"
                    name="bottomRightImageLink"
                    placeholder="https://example.com"
                    value={bottomRightImageLink}
                    onChange={(e) => setBottomRightImageLink(e.target.value)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm p-2 border"
                  />
                </div>

                {/* Bottom right image info and preview */}
                {bottomRightImage && (
                  <p className="mt-2 text-sm text-gray-500">
                    Selected: {bottomRightImage.name} (
                    {(bottomRightImage.size / 1024).toFixed(2)} KB)
                  </p>
                )}
                {bottomRightImagePreview && (
                  <div className="mt-4">
                    <p className="text-sm mb-1">Preview:</p>
                    <img
                      src={bottomRightImagePreview}
                      alt="Bottom Right preview"
                      className="max-h-48 rounded-md object-contain"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Uploading..." : "Submit Advertisement"}
          </button>

          {submitSuccess && (
            <button
              type="button"
              className="ml-4 px-4 py-2 bg-gray-200 text-gray-800 font-medium rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              onClick={resetForm}
            >
              Create New Advertisement
            </button>
          )}
        </div>
      </form>
    </main>
  );
}

export default Advertisement;
