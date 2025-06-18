import { Avatar, Box, Button, Checkbox, Container, FormControlLabel, Grid, TextField, Typography, useTheme } from "@mui/material";
import { keyframes } from '@emotion/react';
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link as RouterLink } from "react-router-dom";

// IMPORTANTE: Importe seus tokens do arquivo de tema
import { tokens } from "../../theme"; // <-- Ajuste o caminho se necessário

// --- Animações ---

// Animação para o fundo com gradiente
const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Animação para o formulário aparecer suavemente
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translate3d(0, 40px, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`;

const Login = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const handleSubmit = (event) => {
    event.preventDefault(); // Previne o recarregamento padrão da página
    console.log('Tentativa de login...');
    // Aqui você adicionaria sua lógica de validação e autenticação
  };

  return (
    // Container principal que ocupa a tela inteira e aplica o fundo animado
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // O gradiente usa as cores primárias do seu tema
        background: `linear-gradient(-45deg, ${colors.primary[900]}, ${colors.primary[700]}, ${colors.blueAccent[800]}, ${colors.primary[900]})`,
        backgroundSize: '400% 400%',
        animation: `${gradientAnimation} 15s ease infinite`,
      }}
    >
      {/* Container para o formulário com efeito de vidro */}
      <Box
        sx={{
          maxWidth: 400,
          width: '100%',
          p: 4,
          // Efeito de vidro
          backgroundColor: 'rgba(12, 16, 27, 0.5)', // Cor primária com transparência
          backdropFilter: 'blur(10px)',
          border: `1px solid ${colors.primary[700]}`,
          borderRadius: '16px',
          boxShadow: `0 8px 32px 0 rgba(0, 0, 0, 0.37)`,
          // Animação de entrada
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
            variant="standard" // Usamos a variante 'standard' para customizar a linha inferior
            placeholder="Email"
            fullWidth
            required
            autoFocus
            sx={{ 
              mb: 2,
              // Estilizando a linha inferior
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
            fullWidth
            required
            type="password"
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
              <RouterLink to="/form" style={{ color: colors.blueAccent[400], textDecoration: 'none' }}>
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