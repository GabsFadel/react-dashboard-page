import { useState, useEffect, useRef } from 'react';
import { Box, Typography, InputBase, IconButton, useTheme } from "@mui/material";
import { keyframes } from '@emotion/react';
import { tokens } from "../../theme";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Header from "../../components/Header";

const TypingEffect = ({ fullText, typingSpeed = 30 }) => { // Velocidade aumentada para 30ms
  const [displayedText, setDisplayedText] = useState('');
  const index = useRef(0); // Usando useRef para um controle mais estável do índice

  useEffect(() => {
    // Reseta o estado e o índice quando um novo texto é recebido
    setDisplayedText('');
    index.current = 0;

    const intervalId = setInterval(() => {
      // Garante que não ultrapasse o comprimento do texto
      if (index.current < fullText.length) {
        setDisplayedText((prev) => prev + fullText.charAt(index.current));
        index.current++;
      } else {
        clearInterval(intervalId); // Para o intervalo quando o texto terminar
      }
    }, typingSpeed);

    // Função de limpeza essencial para parar o intervalo se o componente for desmontado
    return () => clearInterval(intervalId);
  }, [fullText, typingSpeed]);

  const isTyping = displayedText.length < fullText.length;

  return (
    <Typography component="span" sx={{ whiteSpace: 'pre-wrap' }}>
      {displayedText}
      {isTyping && (
        <Box
          component="span"
          sx={{
            animation: `${blink} 1s step-start infinite`,
            borderLeft: '2px solid',
            marginLeft: '2px',
          }}
        />
      )}
    </Typography>
  );
};

const blink = keyframes`
  50% { border-color: transparent; }
`;

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);
  const endOfMessagesRef = useRef(null);

  const gradientAnimation = keyframes`
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  `;

  const pulseAnimation = keyframes`
    0% { box-shadow: 0 0 8px 0px ${colors.blueAccent[700]}; }
    50% { box-shadow: 0 0 16px 4px ${colors.blueAccent[500]}; }
    100% { box-shadow: 0 0 8px 0px ${colors.blueAccent[700]}; }
  `;

  const handleSendPrompt = () => {
    const trimmedPrompt = prompt.trim();
    if (trimmedPrompt === "") return;

    const userMessage = {
      id: Date.now(),
      text: trimmedPrompt,
      sender: 'user',
    };
    setMessages(prev => [...prev, userMessage]);
    setPrompt("");

    setTimeout(() => {
      const aiMessage = {
        id: Date.now() + 1,
        text: "Esta é uma resposta fixa da Orga IA. Em breve, estarei conectada a uma inteligência artificial de verdade!",
        sender: 'ai',
      };
      setMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendPrompt();
    }
  };

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <Box m="20px" display="flex" flexDirection="column" height="calc(100vh - 100px)">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Orga IA" subtitle="Bem-vindo a nossa IA!" />
      </Box>

      <Box display="flex" flexDirection="column" justifyContent="flex-end" flexGrow={1} pb={2} position="relative">
        <Box
          flexGrow={1} display="flex" flexDirection="column"
          justifyContent={messages.length === 0 ? "center" : "flex-start"}
          alignItems="center" sx={{ overflowY: 'auto', p: 2 }}
        >
          {messages.length === 0 ? (
            <Typography variant="h1" textAlign="center" sx={{
              fontSize: '56px', fontWeight: 'bold',
              background: `linear-gradient(45deg, ${colors.blueAccent[500]}, ${colors.redAccent[500]}, ${colors.blueAccent[500]})`,
              backgroundSize: '200% 200%', backgroundClip: 'text', WebkitBackgroundClip: 'text',
              color: 'transparent', animation: `${gradientAnimation} 4s ease infinite`,
            }}>
              Pergunte a Orga IA!
            </Typography>
          ) : (
            <Box width="100%" maxWidth="900px" display="flex" flexDirection="column" gap={2}>
              {messages.map(msg => (
                <Box
                  key={msg.id} display="flex" gap={1.5}
                  alignSelf={msg.sender === 'user' ? 'flex-end' : 'flex-start'}
                  flexDirection={msg.sender === 'user' ? 'row-reverse' : 'row'}
                >
                  <Box sx={{
                    borderRadius: '50%',
                    backgroundColor: msg.sender === 'user' ? colors.blueAccent[800] : colors.greenAccent[800],
                    p: 1, display: 'flex', alignSelf: 'flex-start'
                  }}>
                    {msg.sender === 'user' ? <AccountCircleIcon /> : <SmartToyIcon />}
                  </Box>
                  <Box sx={{
                    backgroundColor: msg.sender === 'user' ? colors.blueAccent[700] : colors.primary[600],
                    color: colors.grey[100], p: '10px 15px',
                    borderRadius: '15px', maxWidth: '600px',
                  }}>
                    {msg.sender === 'ai' ? (
                      <TypingEffect fullText={msg.text} />
                    ) : (
                      <Typography sx={{ whiteSpace: 'pre-wrap' }}>{msg.text}</Typography>
                    )}
                  </Box>
                </Box>
              ))}
              <div ref={endOfMessagesRef} />
            </Box>
          )}
        </Box>

        <Box width="100%" display="flex" justifyContent="center" pt={2}>
          <Box width={{ xs: '95%', md: '80%' }} maxWidth="900px">
            <Box
              display="flex" alignItems="center" p={1}
              sx={{
                backgroundColor: colors.primary[700], borderRadius: '28px', border: `1px solid ${colors.grey[600]}`,
                transition: 'all 0.3s ease',
                '&:hover, &:focus-within': {
                  backgroundColor: colors.primary[400], borderColor: 'transparent',
                  boxShadow: `0 0 12px 2px ${colors.blueAccent[600]}`,
                },
                '&:focus-within': { animation: `${pulseAnimation} 2s infinite` }
              }}
            >
              <IconButton sx={{ color: colors.grey[100] }}><AddCircleOutlineIcon /></IconButton>
              <InputBase
                fullWidth placeholder="Peça ao Orga" value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyPress={handleKeyPress} multiline maxRows={5}
                sx={{
                  color: colors.grey[100], fontSize: '16px', ml: 1,
                  '& .MuiInputBase-input::placeholder': { color: colors.grey[300], opacity: 1, },
                }}
              />
              <IconButton
                onClick={handleSendPrompt}
                disabled={prompt.trim() === ""}
                sx={{
                  color: colors.grey[100],
                  backgroundColor: prompt.trim() === "" ? 'transparent' : colors.blueAccent[600],
                  transition: 'background-color 0.3s',
                  '&:hover': {
                    backgroundColor: prompt.trim() === "" ? 'transparent' : colors.blueAccent[500],
                  }
                }}
              >
                <ArrowUpwardIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Dashboard;