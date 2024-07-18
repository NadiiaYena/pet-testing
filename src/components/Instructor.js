import { useNavigate } from "react-router-dom";

function Instructor() {
  const navigate = useNavigate();

  const getKeyForTesting = () => {
    console.log("getKeyForTesting");
    const key = "fW59pkGBPqSQGxbEZtDxCaRR7Lb2w8kM";
    const data = {
      instructor_id: key,
    };

    fetch(`/api/testing/start?key=${key}`, {
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

        console.log("response", response);
        return response.text();
      })
      .then((data) => {
        console.log("Success data:", data);
        navigate(`/results/${data}`);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="component-instructor">
      <button onClick={getKeyForTesting} className="btn ">
        Розпочати тестування
      </button>
    </div>
  );
}

export default Instructor;
