import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Testing from "./components/Testing";
import Error from "./components/Error";
// import Instructor from "./components/Instructor";
// import Results from "./components/Results";
// import Start from "./components/Start";
import BlockScreen from "./components/BlockScreen";


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route  exact path="/" element={<Testing />}/>
          {/* <Route path="/instructor/:instructorKey" element={<Instructor />} />
          <Route path="/results/:results" element={<Results />} />
          <Route path="/start/:start" element={<Start />} /> */}
          <Route path="/block" element={<BlockScreen />} />
          <Route path="*" element={<Error />} /> 
        </Routes>
      </Router>
    </div> 
  );
}

export default App;
