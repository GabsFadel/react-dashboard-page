import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import 'react-pro-sidebar/dist/css/styles.css';
import Topbar from "./scenes/global/Topbar";
import Dashboard from "./scenes/dashboard";
import { Route, Routes, useLocation } from "react-router-dom";
import Sidebar from "./scenes/global/Sidebar";
import Team from "./scenes/team";
import Login from "./scenes/login";
import Contacts from "./scenes/contacts";
import Form from "./scenes/form";

function App() {
  const [theme, colorMode] = useMode();
  const location = useLocation();

  // Rota onde não queremos exibir Sidebar e Topbar
  const isLoginRoute = location.pathname === "/login";

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {/* Renderize Sidebar apenas se não estiver na rota de login */}
          {!isLoginRoute && <Sidebar />}
          <main className="content">
            {/* Renderize Topbar apenas se não estiver na rota de login */}
            {!isLoginRoute && <Topbar />}
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Dashboard />} />
              <Route path="/team" element={<Team />} />
              <Route path="/form" element={<Form />} />
              <Route path="/contacts" element={<Contacts />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
