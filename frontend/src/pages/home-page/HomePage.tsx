import { FC } from 'react';
import logo from '../../logo.png';
import { Grid, Button } from '@mui/material';
import { PageButton } from './PageButton';
import { SocialMediaButtons } from './SocialMediaButtons';

export const HomePage: FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <code>Python Learning Club</code>

        {/* Source Pages */}
        <Grid container spacing={2} justifyContent="center" alignItems="center">
            <Grid item>
              <PageButton
                    url="https://level-scallop-cd8.notion.site/Python-d12c0389e5874dceb9273432b849cd59?pvs=4"
                    text="近期活動"
                />
            </Grid>
            <Grid item>
                <PageButton
                    url="https://level-scallop-cd8.notion.site/Python-f88abbfaf6fc4caf9c0e61048eea53b9?pvs=4"
                    text="學習資源"
                />
            </Grid>
            <Grid item>
                <PageButton
                    url="https://forms.gle/USYC5L5pL2wuEhXc6"
                    text="學習計畫"
                />
            </Grid>
        </Grid>

        <a href={"/login/"}>
            <Button
                variant="contained" 
                sx={{
                    fontWeight: "bold",
                    backgroundColor: "#00DB79", // 自定義背景顏色
                    color: "#111", // 文字顏色
                    width: '300px',
                    '&:hover': {
                        backgroundColor: "#FCFAB6", // 滑鼠懸停時的背景顏色
                        }
                }}
            >
                登入 
            </Button>
        </a>

        {/* SocialMedias */}
        <SocialMediaButtons />
      </header>
    </div>
  );
};