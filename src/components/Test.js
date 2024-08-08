import React, { useState } from 'react';
import axios from 'axios';

const GoogleSheetHandler = () => {
  const [sheetUrl, setSheetUrl] = useState('');
  const [questions, setQuestions] = useState([]);
  const [responses, setResponses] = useState([]);

  const importQuestions = async () => {
    // const sheetId = sheetUrl.split('/d/')[1].split('/')[0];
    const sheetId = sheetUrl;

    const range = 'Sheet1!A1:B11'; // Задайте відповідний діапазон
    try {
      const response = await axios.post('http://localhost:5001/import', {
        sheetId: sheetId,
        range: range
      });
      console.log(response.data)
      setQuestions(response.data);
    } catch (error) {
      console.error('Error importing questions:', error);
    }
  };

  const exportResponses = async () => {
    const sheetId = sheetUrl.split('/d/')[1].split('/')[0];
    const range = 'Sheet1!B2:B11'; // Задайте відповідний діапазон для відповідей
    try {
      await axios.post('http://localhost:5001/export', {
        sheetId: sheetId,
        range: range,
        values: responses.map(response => [response])
      });
      alert('Responses exported successfully');
      setResponses([])
    } catch (error) {
      console.error('Error exporting responses:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter Google Sheet URL"
        value={sheetUrl}
        onChange={(e) => setSheetUrl(e.target.value)}
      />
      <button onClick={importQuestions}>Import Questions</button>
      {questions.length > 0 && (
        <div>
          {questions.map((question, index) => (
            <div key={index}>
              <p>{question.Question}</p>
              <input
                type="text"
                onChange={(e) => {
                  const newResponses = [...responses];
                  newResponses[index] = e.target.value;
                  setResponses(newResponses);
                }}
              />
            </div>
          ))}
          <button onClick={exportResponses}>Export Responses</button>
        </div>
      )}
    </div>
  );
};

export default GoogleSheetHandler;
