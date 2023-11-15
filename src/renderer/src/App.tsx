import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './components/Page/MainPage';


const App: React.FC = (): JSX.Element => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        {/* 여기에 더 많은 라우트를 추가할 수 있습니다 */}
      </Routes>
    </Router>
  );
};

export default App;
