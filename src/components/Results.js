import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function Results() {
  const [isPromptVisible, setIsPromptVisible] = useState(false);
  const [liststudents, setListStudents] = useState([]);
  const location = useLocation();
  console.log(location.pathname.split("/"));
  const keyInPath = location.pathname.split("/");
  const key = keyInPath[2];

  //   const searchParams = new URLSearchParams(location.search);
  //   console.log(searchParams)
  //   const key = searchParams.get("key");

  const getResultStudents = () => {
    console.log("getResultStudents");
    fetch(`/api/testing/results?key=${key}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setListStudents(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    getResultStudents();
  }, []);

  const copyKey = (event) => {
    // const textToCopy = `https://uavtheory.site/start?key=${key}`;
    const textToCopy = event.target.textContent;
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        console.log("Text copied to clipboard:", textToCopy);
        setIsPromptVisible(true);
        setTimeout(() => {
          setIsPromptVisible(false);
        }, 2000);
      })
      .catch((err) => {
        console.error("Failed to copy text:", err);
      });
  };

  return (
    <div className="component-result">
      <div className="result" onClick={copyKey}>
        {`https://uavtheory.site/start/${key}`}
      </div>
      <button onClick={getResultStudents}>ОНОВИТИ ТАБЛИЦЮ</button>
      {isPromptVisible ? <span className="promt-copy">link copied</span> : ""}
      <div className="students-list">
        <table>
          <thead>
            <tr>
              <th className="numberRow">№</th>
              <th>ПІБ</th>
              <th className="point">Оцінка</th>
            </tr>
          </thead>
          <tbody>
            {liststudents.length > 0 ? (
              liststudents.map((item, index) => (
                <tr key={item.id}>
                  <td className="numberRow">{index + 1}</td>
                  <th>{item.student_name}</th>
                  <th className="point">{item.grade}</th>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Results;
