import { useState } from "react"; // 1. Importar useState
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import 'react-pro-sidebar/dist/css/styles.css';
import Topbar from "./scenes/global/Topbar";
import Dashboard from "./scenes/dashboard";
import { Route, Routes, useLocation } from "react-router-dom";
import Sidebar from "./scenes/global/Sidebar";
import Team from "./scenes/team";
import Login from "./scenes/login";
import Form from "./scenes/form";
import ForgotPassword from "./scenes/forgot";
import Register from "./scenes/register";
import EditUser from "./scenes/editUser";

function App() {
  const [theme, colorMode] = useMode();
  const location = useLocation();

  // --- ESTADO ELEVADO PARA O APP.JS ---
  const [messages, setMessages] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null); // Para guardar o ID do chat ativo

  // Função para criar um novo chat
  const handleNewChat = async () => {
    console.log("Iniciando uma nova conversa...");
    // 1. Limpa as mensagens da tela imediatamente para feedback visual
    setMessages([]);

    // 2. Placeholder para a chamada de API
    try {
      // Exemplo de como seria a chamada de API
      // const response = await fetch('/api/create-chat', { method: 'POST' });
      // const data = await response.json();
      // const newChatId = data.chatId;

      const newChatId = `chat_${Date.now()}`; // Simulando um novo ID de chat
      setActiveChatId(newChatId);
      console.log(`Nova conversa criada com ID: ${newChatId}`);

      // Aqui você poderia, por exemplo, adicionar a nova conversa à lista da Sidebar
      // (isso exigiria elevar também o estado do 'mockChatHistory')

    } catch (error) {
      console.error("Erro ao criar nova conversa:", error);
    }
  };

  const standaloneRoutes = ["/", "/forgot", "/register"];
  const isStandaloneRoute = standaloneRoutes.includes(location.pathname);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {/* A Sidebar agora recebe a função onNewChat como prop */}
          {!isStandaloneRoute && <Sidebar onNewChat={handleNewChat} />}
          
          <main className="content">
            {!isStandaloneRoute && <Topbar />}
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/forgot" element={<ForgotPassword />} />
              <Route path="/register" element={<Register />} />
              
              {/* A Dashboard agora recebe o estado e a função de atualizar como props */}
              <Route 
                path="/dashboard" 
                element={<Dashboard messages={messages} setMessages={setMessages} chatId={activeChatId} />} 
              />
              
              <Route path="/team" element={<Team />} />
              <Route path="/form" element={<Form />} />
              <Route path="/edit-user/:id" element={<EditUser />} /> 
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;