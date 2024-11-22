import React, { useState, useEffect } from "react";
import axios from "axios";

const BadReviews = () => {
  const [badReviews, setBadReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch bad reviews from the API
  useEffect(() => {
    const fetchBadReviews = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/badreviews");
        setBadReviews(response.data || []); // Directly set the nested array from the API response
      } catch (err) {
        setError("Error fetching bad reviews. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchBadReviews();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="text-lg font-semibold text-blue-600 animate-pulse">
          Loading bad reviews...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="text-lg text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Bad Reviews
        </h1>
        {badReviews.length === 0 ? (
          <div className="text-center text-gray-600">
            <p>No bad reviews found.</p>
          </div>
        ) : (
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <ul className="divide-y divide-gray-200">
              {badReviews.map((reviewArray, index) => (
                <li
                  key={index}
                  className="p-6 hover:bg-gray-100 transition-all duration-300 group"
                >
                  {/* Main Heading */}
                  <div className="text-center text-lg font-semibold text-blue-800 mb-4 group-hover:text-blue-600">
                    {reviewArray[0]} {/* Display the first element */}
                  </div>
                  {/* Numbered List */}
                  <ol className="list-decimal list-inside space-y-2">
                    {reviewArray.slice(1).map((item, subIndex) => (
                      <li
                        key={subIndex}
                        className="text-sm text-gray-700 group-hover:text-gray-900 transition duration-300"
                      >
                        {item}
                      </li>
                    ))}
                  </ol>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default BadReviews;
