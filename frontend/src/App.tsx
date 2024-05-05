import logo from './logo.png';
import './App.css';
import { Grid, Button} from '@mui/material';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
          <code>Python Learning Club</code>

          <Grid container spacing={2} justifyContent="center" alignItems="center">
            <Grid item>
              <a href='https://level-scallop-cd8.notion.site/Python-d12c0389e5874dceb9273432b849cd59?pvs=4' target='_blank' rel='noreferrer'>
                <Button 
                  variant="contained" 
                  sx={{
                    fontWeight: "bold",
                    backgroundColor: "#FFF", // 自定義背景顏色
                    color: "#111", // 文字顏色
                    '&:hover': {
                      backgroundColor: "#FCFAB6", // 滑鼠懸停時的背景顏色
                    }
                  }}>
                  近期活動
                </Button>
              </a>
            </Grid>

            <Grid item>
              <a href='https://level-scallop-cd8.notion.site/Python-f88abbfaf6fc4caf9c0e61048eea53b9?pvs=4' target='_blank' rel='noreferrer'>
                <Button 
                variant="contained" 
                sx={{
                  fontWeight: "bold",
                  backgroundColor: "#FFF", // 自定義背景顏色
                  color: "#111", // 文字顏色
                  '&:hover': {
                    backgroundColor: "#FCFAB6", // 滑鼠懸停時的背景顏色
                  }
                }}>
                學習資源
                </Button>
              </a>
            </Grid>

            <Grid item>
              <a href='https://docs.google.com/forms/d/e/1FAIpQLScF3E9_u7Sldp050SJnu9liMkSwJ8-kA_gOVlqnpiqTdZ0FFw/viewform?usp=sf_link' target='_blank' rel='noreferrer'>
                <Button 
                variant="contained" 
                sx={{
                  fontWeight: "bold",
                  backgroundColor: "#FFF", // 自定義背景顏色
                  color: "#111", // 文字顏色
                  '&:hover': {
                    backgroundColor: "#FCFAB6", // 滑鼠懸停時的背景顏色
                  }
                }}>
                學習計畫
                </Button>
              </a>
            </Grid>
          </Grid>
      </header>
    </div>
  );
}

export default App;
