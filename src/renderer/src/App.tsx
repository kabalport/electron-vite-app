import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './components/Page/MainPage';
import CapturePage from "./components/Page/CapturePage";
import Test from "./components/Test";
import Timer from "./components/Page/Timer";
import MonitoringPage from "./components/Page/MonitoringPage";



const App: React.FC = (): JSX.Element => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/capture" element={<CapturePage />} />
        <Route path="/calculator" element={<Test />} />
        <Route path="/timer" element={<Timer />} />
        <Route path="/monitoring" element={<MonitoringPage />} />
        {/* 여기에 더 많은 라우트를 추가할 수 있습니다 */}
      </Routes>
    </Router>
  );
};

export default App;
