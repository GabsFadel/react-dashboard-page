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
import ForgotPassword from "./scenes/forgot";
import Register from "./scenes/register";
import EditUser from "./scenes/editUser";

function App() {
  const [theme, colorMode] = useMode();
  const location = useLocation();

  const standaloneRoutes = ["/login", "/forgot", "/register"];
  const isStandaloneRoute = standaloneRoutes.includes(location.pathname);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {!isStandaloneRoute && <Sidebar />}
          <main className="content">
            {!isStandaloneRoute && <Topbar />}
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/forgot" element={<ForgotPassword />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<Dashboard />} />
              <Route path="/team" element={<Team />} />
              <Route path="/form" element={<Form />} />
              <Route path="/edit-user/:id" element={<EditUser />} /> 
              <Route path="/contacts" element={<Contacts />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;