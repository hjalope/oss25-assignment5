// src/components/AnalyticsDashboard.js
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import api from "../services/api";
import "../css/AnalyticsDashboard.css";

// Register Chart.js modules
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AnalyticsDashboard = () => {
  const [courses, setCourses] = useState([]);

  // 수업 데이터 불러오기
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.get("/oss-assignment5");
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCourses();
  }, []);

  // Bar Chart (수업별 학생 수)
  const barData = {
    labels: courses.map((course) => course.class), // 수업명
    datasets: [
      {
        label: "학생 수",
        data: courses.map((course) => Number(course.maximun_num)), // 학생 수
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  // Chart 막대기표
  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
      title: {
        display: true,
        text: "수업별 학생 수",
      },
    },
    animation: false,
  };

  // 학생 수가 가장 많은 수업 표시
  const topCourse =
    courses.length > 0
      ? courses.reduce((max, course) =>
          Number(course.maximun_num) > Number(max.maximun_num) ? course : max
        )
      : null;

  return (
    <div className="analytics-dashboard">
      <h2>수업별 학생 수 분석</h2>

      {topCourse && (
        <div className="metrics-container">
          <h3>
            가장 학생이 많은 수업: <b>{topCourse.class}</b> (
            {topCourse.maximun_num}명)
          </h3>
        </div>
      )}

      {/* Bar Chart */}
      <div className="chart-container">
        <Bar data={barData} options={barOptions} />
      </div>
    </div>
  );
};

export default AnalyticsDashboard;