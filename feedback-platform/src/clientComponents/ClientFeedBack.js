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
        const response = await axios.get("http://localhost:9000/api/bad-reviews");
        setBadReviews(response.data.bad_reviews || []); // Ensure we handle the key properly
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
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg text-blue-500">Loading bad reviews...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Bad Reviews</h1>
        {badReviews.length === 0 ? (
          <div className="text-center text-gray-600">
            <p>No bad reviews found.</p>
          </div>
        ) : (
          <div className="bg-white shadow rounded-lg">
            <ul className="divide-y divide-gray-200">
              {badReviews.map((review, index) => (
                <li key={index} className="p-4 hover:bg-gray-50">
                  <div className="flex items-center">
                    <div className="text-sm font-medium text-gray-800 flex-grow">
                      {review}
                    </div>
                    <div className="ml-4">
                      <span className="px-3 py-1 text-xs font-semibold text-red-700 bg-red-100 rounded-full">
                        Bad Review
                      </span>
                    </div>
                  </div>
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
