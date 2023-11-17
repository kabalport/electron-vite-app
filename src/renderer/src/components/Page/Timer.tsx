import React, { useState, useEffect } from 'react';
import { Button, TextField, Box, Typography, Paper } from '@mui/material';

const Timer = () => {
  const [value, setValue] = useState('');
  const [seconds, setSeconds] = useState(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (seconds >= 60 * parseInt(value)) {
      window.electron.ipcRenderer.send('test-alarm');

      // window.electron.dialog.showMessageBox({
      //   type: 'question',
      //   buttons: ['Yes'],
      //   defaultId: 2,
      //   title: '알림!',
      //   message: '시간이 다 되었습니다.',
      //   detail: `${value}분이 되었습니다.`,
      //   checkboxChecked: false,
      // });
      handleStop();
    }
  }, [seconds, value]);

  const handleStart = () => {
    const numericValue = parseInt(value);
    if (isNaN(numericValue)) {
      setMessage('숫자만 입력하여 주세요 👻');
      return;
    }
    if (!intervalId) {
      setValue(`동작시간 : ${value}분`);
      const id = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
      setIntervalId(id);
    } else {
      setMessage('이미 실행중입니다. 중지만 할 수 있습니다 👻');
    }
  };

  const handleStop = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
      setSeconds(0);
      setValue('');
    } else {
      setMessage('현재 동작하고 있지 않습니다 👻');
    }
  };

  const handleTestAlarm = () => {
    window.electron.ipcRenderer.send('test-alarm');
  };

  return (
    <Paper style={{ padding: '2rem', margin: 'auto', maxWidth: '500px', textAlign: 'center' }}>
      <Button variant="contained" onClick={handleTestAlarm}>
        알람 테스트
      </Button>
      <Typography variant="h4">심플 타이머</Typography>
      <Box my={3}>
        <TextField
          fullWidth
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="시간을 입력하세요(분단위)"
        />
      </Box>
      <Box my={3}>
        <Typography variant="h5">{seconds}초</Typography>
      </Box>
      <Box my={3}>
        <Button variant="contained" color="primary" onClick={handleStart}>
          시작
        </Button>
        <Button variant="contained" color="secondary" onClick={handleStop} style={{ marginLeft: '1rem' }}>
          중지
        </Button>
      </Box>
      {message && (
        <Box my={3}>
          <Typography variant="body1" className="explainer">{message}</Typography>
        </Box>
      )}
    </Paper>
  );
};

export default Timer;
