import React, { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import Chart from "chart.js/auto";
import axios from "axios";

const DashboardComponent = () => {
  const [feedbackData, setFeedbackData] = useState({
    positive: 0,
    negative: 0,
    neutral: 0,
    total: 0,
    positivePercentage: 0,
  });
  const [pieData, setPieData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    // Fetch and process bar chart data from API
    axios
      .get("http://localhost:8000/api/second-column")
      .then((response) => {
        const responses = response.data; // Assuming the API returns an array of feedback responses
        const responseCount = {
          positive: 0,
          negative: 0,
          neutral: 0,
        };

        // Categorize feedback responses
        responses.forEach((response) => {
          if (response && typeof response === "string") {
            const trimmedResponse = response.trim().toLowerCase();

            // Negative responses
            if (
              ["very dissatisfied", "dissatisfied", "poor", "strongly disagree"].includes(
                trimmedResponse
              )
            ) {
              responseCount.negative += 1;
            }
            // Positive responses
            else if (
              ["very satisfied", "satisfied", "happy"].includes(trimmedResponse)
            ) {
              responseCount.positive += 1;
            }
            // Neutral responses
            else {
              responseCount.neutral += 1;
            }
          }
        });

        const totalResponses = responses.length;
        const positivePercentage = ((responseCount.positive / totalResponses) * 100).toFixed(2);

        setFeedbackData({
          ...responseCount,
          total: totalResponses,
          positivePercentage,
        });
      })
      .catch((error) => {
        console.error("Error fetching bar chart data: ", error);
      });

    // Fetch and process Pie chart data
    axios
      .get("http://127.0.0.1:8000/api/getqueries")
      .then((response) => {
        const answered = response.data.filter((item) => item.Answer !== "").length;
        const unanswered = response.data.filter((item) => item.Answer === "").length;

        setPieData({
          labels: ["Answered", "Unanswered"],
          datasets: [
            {
              data: [answered, unanswered],
              backgroundColor: ["green", "red"],
            },
          ],
        });
      })
      .catch((error) => {
        console.error("Error fetching pie chart data:", error);
      });
  }, []);

  // Bar chart options
  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  // Pie chart options
  const pieChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-slate-50 overflow-x-hidden">
      {/* Header Section */}
      <header className="py-4 px-8 bg-white shadow-md flex justify-between items-center">
        <div className="text-2xl font-semibold text-gray-800">Dashboard</div>
        <nav className="flex items-center space-x-4">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Profile
          </button>
          <button className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">
            Logout
          </button>
        </nav>
      </header>

      {/* Main Content */}
      <main className="px-8 py-6 flex flex-1 flex-col">
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Summary Cards */}
          <div className="bg-white shadow-md rounded-lg p-4">
            <h3 className="text-lg font-bold text-gray-700">Total Feedback</h3>
            <p className="text-3xl font-bold text-gray-900">{feedbackData.total}</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-4">
            <h3 className="text-lg font-bold text-gray-700">Positive</h3>
            <p className="text-3xl font-bold text-gray-900">{feedbackData.positive}</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-4">
            <h3 className="text-lg font-bold text-gray-700">Negative</h3>
            <p className="text-3xl font-bold text-gray-900">{feedbackData.negative}</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-4">
            <h3 className="text-lg font-bold text-gray-700">Positivity</h3>
            <p className="text-3xl font-bold text-gray-900">
              {feedbackData.positivePercentage}%
            </p>
          </div>
        </section>

        {/* Performance Section */}
        <section className="bg-white shadow-md rounded-lg p-6 mt-6">
          <h3 className="text-lg font-bold text-gray-700 mb-4">Performance</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Bar Chart */}
            <div>
              <h4 className="text-lg font-semibold text-gray-700 mb-2">Feedback Response</h4>
              <Bar
                data={{
                  labels: ["Positive", "Negative", "Neutral"],
                  datasets: [
                    {
                      label: "Responses",
                      data: [
                        feedbackData.positive,
                        feedbackData.negative,
                        feedbackData.neutral,
                      ],
                      backgroundColor: ["blue", "blue", "blue"], // All bars are blue
                    },
                  ],
                }}
                options={barChartOptions}
              />
            </div>

            {/* Pie Chart */}
            <div>
              <h4 className="text-lg font-semibold text-gray-700 mb-2">Query Responses</h4>
              <Pie data={pieData} options={pieChartOptions} />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default DashboardComponent;
