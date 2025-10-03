// src/components/CourseForm.js
import React, { useState, useEffect } from "react";
import api from "../services/api";
import "../css/UserForm.css";

const CourseForm = ({ courseToEdit, onSave, clearEdit }) => {
  const [course, setCourse] = useState({
    code: "",
    class: "",
    prof: "",
    location: "",
    maximun_num: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (courseToEdit) {
      setCourse(courseToEdit);
    } else {
      setCourse({
        code: "",
        class: "",
        prof: "",
        location: "",
        maximun_num: "",
      });
    }
  }, [courseToEdit]);

  const handleChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!course.code || !course.class || !course.prof || !course.location || !course.maximun_num) {
      setError("All fields are required.");
      return;
    }

    // 학생 수 숫자
    if (isNaN(course.maximun_num)) {
      setError("Maximum number of students must be a number.");
      return;
    }

    setError("");

    try {
      if (courseToEdit) {
        await api.put(`/oss-assignment5/${course.id}`, course);
      } else {
        await api.post("/oss-assignment5", course);
      }

      onSave();
      clearEdit();
      setCourse({
        code: "",
        class: "",
        prof: "",
        location: "",
        maximun_num: "",
      });
    } catch (error) {
      console.error("Error saving course:", error);
      setError("Failed to save course. Please try again later.");
    }
  };

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      {error && <div className="error-message">{error}</div>}

      <input
        type="text"
        name="class"
        placeholder="Course Name"
        value={course.class}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="code"
        placeholder="Course Code"
        value={course.code}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="prof"
        placeholder="Professor"
        value={course.prof}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="location"
        placeholder="Location"
        value={course.location}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        name="maximun_num"
        placeholder="Students number"
        value={course.maximun_num}
        onChange={handleChange}
        required
      />

      <button type="submit">
        {courseToEdit ? "Update Course" : "Create Course"}
      </button>
    </form>
  );
};

export default CourseForm;