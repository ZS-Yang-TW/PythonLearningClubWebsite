import { Grid } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';

export const SocialMediaButtons = () => {
    return (
        <Grid container spacing={2} justifyContent="center" alignItems="center">
             {/* Facebook icon */}
            <Grid item>
            <a href="https://www.facebook.com/people/Python-%E5%AD%B8%E7%BF%92%E8%AE%80%E6%9B%B8%E6%9C%83/61553979676290/" target='_blank' rel='noreferrer'>
                <FacebookIcon sx={{ fontSize: 40, color: "#FFF" }}/>
            </a>
            </Grid>

            {/* Instagram icon */}
            <Grid item>
            <a href="https://www.instagram.com/pythonlearningclub/" target='_blank' rel='noreferrer'>
                <InstagramIcon sx={{ fontSize: 40, color: "#FFF" }}/>
            </a>
            </Grid>
        </Grid>
    )
}