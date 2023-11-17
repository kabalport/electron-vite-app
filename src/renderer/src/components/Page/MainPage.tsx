import { Button, Grid, Paper, Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom';

function MainPage(): JSX.Element {
  const navigate = useNavigate();

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
      <Grid item xs={12}>
        <Typography variant="h3" align="center" gutterBottom>
          메인 페이지
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
        <Paper elevation={4} style={{ padding: 16 }}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => navigate('/capture')}
          >
            캡처앱으로 이동
          </Button>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
        <Paper elevation={4} style={{ padding: 16 }}>
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            onClick={() => navigate('/calculator')}
          >
            계산기앱으로 이동
          </Button>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
        <Paper elevation={4} style={{ padding: 16 }}>
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            onClick={() => navigate('/timer')}
          >
            time앱으로 이동
          </Button>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
        <Paper elevation={4} style={{ padding: 16 }}>
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            onClick={() => navigate('/calculator')}
          >
            계산기앱으로 이동
          </Button>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default MainPage;
