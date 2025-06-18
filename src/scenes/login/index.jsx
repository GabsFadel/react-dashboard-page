import { Avatar, Box, Button, Checkbox, Container, FormControlLabel, Grid, Paper, TextField, Typography, useTheme } from "@mui/material";
import { AppProvider } from '@toolpad/core/AppProvider';
import { SignInPage } from '@toolpad/core/SignInPage';
import { Formik } from "formik";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import { tokens } from "../../theme";
import { Link, Link as RouterLink} from "react-router-dom";

const Login = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const handleSubmit =() => console.log('login')

  return (
    <Container maxWidth="xs">
      <Paper elevation={10} sx={{ marginTop: 8, padding:2}}>
        <Avatar sx={{
          mx: "auto",
          backgroundColor: colors.blueAccent[500],
          textAlign: "center",
          mb: 1,
        }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant="h5" sx={{ textAlign: "center"}}>
          Login
        </Typography>
        <Box 
          component='form'
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 1 }}
          >
          <TextField 
            placeholder="Email" 
            fullWidth 
            required 
            autoFocus 
            sx={{ mb: 2}}
          />
          <TextField 
            placeholder="Senha" 
            fullWidth 
            required 
            type="password"
          />
          <FormControlLabel 
            required control={<Checkbox />} 
            label="Lembrar-se de mim"
            />
          <Button type="submit" variant="contained" fullWidth sx={{mt: 1}} >
            Sign In
          </Button>
        </Box>
        <Grid Container justifyContent="space-between" sx={{mt:1}}>
          <Grid Item>
            <Link component={RouterLink} to="/forgot">
              Esqueceu sua senha?
            </Link>
          </Grid>
          <Grid Item>
            <Link component={RouterLink} to="/form">
              Registrar-se
            </Link>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default Login;
