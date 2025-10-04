// src/components/UserList.js
import React, { useEffect, useState } from "react";
import api from "../services/api";
import "../css/UserList.css";

const UserList = ({ onEdit }) => {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "class", direction: "asc" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch data
  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const response = await api.get("/oss-assignment5");
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
      setError("Failed to fetch courses. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const deleteCourse = async (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        await api.delete(`/oss-assignment5/${id}`);
        fetchCourses();
      } catch (error) {
        console.error("Error deleting course:", error);
        setError("Failed to delete course. Please try again later.");
      }
    }
  };

  // Filtering + sorting
  const filteredCourses = courses
  .filter((course) =>
    (course.class?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
    (course.code?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
    (course.prof?.toLowerCase() || "").includes(searchTerm.toLowerCase())
  )
  .sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });


  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="user-list">
      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading-message">Loading courses...</div>
      ) : (
        <>
          {/* Search */}
          <div className="controls">
            <input
              type="text"
              placeholder="Search by class, code, or professor"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Table */}
          {filteredCourses.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th onClick={() => requestSort("class")}>
                    Class {sortConfig.key === "class" && (sortConfig.direction === "asc" ? "▲" : "▼")}
                  </th>
                  <th onClick={() => requestSort("code")}>
                    Code {sortConfig.key === "code" && (sortConfig.direction === "asc" ? "▲" : "▼")}
                  </th>
                  <th onClick={() => requestSort("prof")}>
                    Professor {sortConfig.key === "prof" && (sortConfig.direction === "asc" ? "▲" : "▼")}
                  </th>
                  <th onClick={() => requestSort("location")}>
                    Location {sortConfig.key === "location" && (sortConfig.direction === "asc" ? "▲" : "▼")}
                  </th>
                  <th onClick={() => requestSort("maximun_num")}>
                    Students number {sortConfig.key === "maximun_num" && (sortConfig.direction === "asc" ? "▲" : "▼")}
                  </th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {filteredCourses.map((course) => (
                  <tr key={course.id}>
                    <td>{course.class}</td>
                    <td>{course.code}</td>
                    <td>{course.prof}</td>
                    <td>{course.location}</td>
                    <td>{course.maximun_num}</td>
                    <td>
                      <button onClick={() => onEdit(course)}>Edit</button>
                    </td>
                    <td>
                      <button onClick={() => deleteCourse(course.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="no-results-message">No courses found.</div>
          )}
        </>
      )}
    </div>
  );
};

export default UserList;

