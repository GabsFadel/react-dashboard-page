import { useState } from 'react';
import { Avatar, Box, Button, Checkbox, FormControlLabel, Grid, TextField, Typography, useTheme } from "@mui/material";
import { keyframes } from '@emotion/react';
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link as RouterLink, useNavigate } from "react-router-dom"; 
import { tokens } from "../../theme";

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }`;

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translate3d(0, 40px, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }`;

const Login = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = (event) => {
    event.preventDefault();

    const loginData = {
      email: email,
      password: password,
    };

    console.log("Dados de Login (JSON):", JSON.stringify(loginData, null, 2));

    // 3. Redireciona para o dashboard
    navigate("/dashboard");
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: `linear-gradient(-45deg, ${colors.primary[900]}, ${colors.primary[700]}, ${colors.blueAccent[800]}, ${colors.primary[900]})`,
        backgroundSize: '400% 400%',
        animation: `${gradientAnimation} 15s ease infinite`,
      }}
    >
      <Box
        sx={{
          maxWidth: 400,
          width: '100%',
          p: 4,
          backgroundColor: 'rgba(12, 16, 27, 0.5)',
          backdropFilter: 'blur(10px)',
          border: `1px solid ${colors.primary[700]}`,
          borderRadius: '16px',
          boxShadow: `0 8px 32px 0 rgba(0, 0, 0, 0.37)`,
          animation: `${fadeInUp} 0.8s ease-out`,
        }}
      >
        <Avatar sx={{
          m: '0 auto 16px auto',
          width: 56,
          height: 56,
          backgroundColor: colors.blueAccent[600],
        }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant="h4" fontWeight="bold" sx={{ textAlign: "center", mb: 3, color: colors.grey[100] }}>
          Login
        </Typography>

        <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            variant="standard"
            placeholder="Email"
            name="email" 
            fullWidth
            required
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              mb: 2,
              '& .MuiInput-underline:before': { borderBottomColor: colors.grey[500] },
              '& .MuiInput-underline:hover:not(.Mui-disabled):before': { borderBottomColor: colors.blueAccent[400] },
              '& .MuiInput-underline:after': { borderBottom: `2px solid ${colors.blueAccent[500]}` },
              input: { color: colors.grey[100] },
            }}
            InputLabelProps={{ style: { color: colors.grey[300] } }}
          />
          <TextField
            variant="standard"
            placeholder="Senha"
            name="password"
            fullWidth
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              mb: 1,
              '& .MuiInput-underline:before': { borderBottomColor: colors.grey[500] },
              '& .MuiInput-underline:hover:not(.Mui-disabled):before': { borderBottomColor: colors.blueAccent[400] },
              '& .MuiInput-underline:after': { borderBottom: `2px solid ${colors.blueAccent[500]}` },
              input: { color: colors.grey[100] },
            }}
            InputLabelProps={{ style: { color: colors.grey[300] } }}
          />
          <FormControlLabel
            control={<Checkbox sx={{
              color: colors.blueAccent[400],
              '&.Mui-checked': { color: colors.blueAccent[500] },
            }} />}
            label="Lembrar-se de mim"
            sx={{ color: colors.grey[200] }}
          />
          <Button
            type="submit"
            fullWidth
            sx={{
              mt: 3,
              mb: 2,
              p: '12px',
              fontWeight: 'bold',
              color: colors.grey[100],
              background: `linear-gradient(45deg, ${colors.greenAccent[500]} 30%, ${colors.blueAccent[500]} 90%)`,
              border: 'none',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: `0 10px 20px -10px ${colors.blueAccent[700]}`,
                opacity: 0.9,
              }
            }}
          >
            Sign In
          </Button>

          <Grid container justifyContent="space-between">
            <Grid item>
              <RouterLink to="/forgot" style={{ color: colors.blueAccent[400], textDecoration: 'none' }}>
                Esqueceu sua senha?
              </RouterLink>
            </Grid>
            <Grid item>
              <RouterLink to="/register" style={{ color: colors.blueAccent[400], textDecoration: 'none' }}>
                Registrar-se
              </RouterLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}

export default Login;