import { Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';

function MainPage(): JSX.Element {
  const navigate = useNavigate();

  return (
    <>
      <Button onClick={() => navigate('/capture')}>캡처앱으로 이동</Button>
      <Button onClick={() => navigate('/calculator')}>계산기앱으로 이동</Button>
    </>
  );
}

export default MainPage;
