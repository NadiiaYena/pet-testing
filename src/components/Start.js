import { useNavigate, useLocation } from "react-router-dom";
import React, { useState } from "react";
function Start() {
  const navigate = useNavigate();

  const [name, setName] = useState("");

  const handleChange = (e) => {
    setName(e.target.value);
  };
  const location = useLocation();
  const keyInPath = location.pathname.split("/");
  const key = keyInPath[2];

  // const searchParams = new URLSearchParams(location.search);
  // const key = searchParams.get("key");
  // console.log(key)

  const handleSubmit = (e) => {
    console.log("e", e);
    e.preventDefault();
    console.log("getKeyForTesting");
    const data = {
      student_name: name,
    };

    fetch(`/api/student-testing/start?key=${key}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.text();
      })
      .then((data) => {
        console.log("Success:", data);
        navigate(`/testing/${data}`);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="component-instructor" onSubmit={handleSubmit}>
      <form className="form-student" id="form-student">
        <input
          type="text"
          name="name"
          value={name.name}
          onChange={handleChange}
          placeholder="Ваше ім'я"
        />
        <button type="submit">Розпочати тестування</button>
      </form>
    </div>
  );
}

export default Start;
