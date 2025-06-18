import { useState } from 'react';
import { Box, Typography, InputBase, IconButton, useTheme } from "@mui/material";
import { keyframes } from '@emotion/react';
import { tokens } from "../../theme";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import MicIcon from '@mui/icons-material/Mic';
import MovieIcon from '@mui/icons-material/Movie';
import ScienceIcon from '@mui/icons-material/Science';
import BrushIcon from '@mui/icons-material/Brush';

import Header from "../../components/Header";

const Dashboard = () => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Animação para o gradiente do texto
  const gradientAnimation = keyframes`
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  `;
  
  // Animação de brilho para a borda do input
  const pulseAnimation = keyframes`
    0% { box-shadow: 0 0 8px 0px ${colors.blueAccent[700]}; }
    50% { box-shadow: 0 0 16px 4px ${colors.blueAccent[500]}; }
    100% { box-shadow: 0 0 8px 0px ${colors.blueAccent[700]}; }
  `;

  // Estado e handlers (sem alteração na lógica)
  const [prompt, setPrompt] = useState("");

  const handleSendPrompt = () => {
    if (prompt.trim() === "") return;
    console.log("Enviando prompt:", prompt);
    setPrompt("");
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendPrompt();
    }
  };

  return (
    <Box m="20px" display="flex" flexDirection="column" height="calc(100vh - 100px)">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Orga IA" subtitle="Bem-vindo a nossa IA!" />
      </Box>

      <Box display="flex" flexDirection="column" justifyContent="flex-end" alignItems="center" flexGrow={1} pb={4}>
        <Box flexGrow={1} display="flex" alignItems="center" justifyContent="center">
            <Typography variant="h1" sx={{
                fontSize: '56px',
                fontWeight: 'bold',
                // Gradiente usando suas cores de acento
                background: `linear-gradient(45deg, ${colors.blueAccent[500]}, ${colors.redAccent[500]}, ${colors.blueAccent[500]})`,
                backgroundSize: '200% 200%',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                animation: `${gradientAnimation} 4s ease infinite`,
            }}>
                Pergunte a Orga IA!
            </Typography>
        </Box>

        <Box width={{ xs: '95%', md: '80%' }} maxWidth="900px" position="relative">
          <Box
            display="flex"
            alignItems="center"
            p={1}
            sx={{
              // Cores do input totalmente baseadas no seu tema
              backgroundColor: colors.primary[700],
              borderRadius: '28px',
              border: `1px solid ${colors.grey[600]}`,
              transition: 'all 0.3s ease',
              '&:hover, &:focus-within': {
                backgroundColor: colors.primary[400],
                borderColor: 'transparent',
                boxShadow: `0 0 12px 2px ${colors.blueAccent[600]}`,
              },
              '&:focus-within': {
                animation: `${pulseAnimation} 2s infinite`,
              }
            }}
          >
            {/* Ícones com a cor de texto principal do seu tema */}
            <IconButton sx={{ color: colors.grey[100] }}><AddCircleOutlineIcon /></IconButton>
            <IconButton title="Vídeo" sx={{ color: colors.grey[100], mx: 0.5 }}><MovieIcon /></IconButton>
            <IconButton title="Deep Research" sx={{ color: colors.grey[100], mx: 0.5 }}><ScienceIcon /></IconButton>
            <IconButton title="Canvas" sx={{ color: colors.grey[100], mx: 0.5 }}><BrushIcon /></IconButton>

            <InputBase
              fullWidth
              placeholder="Peça ao Orga"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyPress={handleKeyPress}
              multiline
              maxRows={5}
              sx={{
                color: colors.grey[100],
                fontSize: '16px',
                ml: 1,
                '& .MuiInputBase-input::placeholder': {
                  color: colors.grey[300],
                  opacity: 1,
                },
              }}
            />

            <IconButton sx={{ color: colors.grey[100] }}><MicIcon /></IconButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Dashboard;