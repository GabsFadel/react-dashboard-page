import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import 'react-pro-sidebar/dist/css/styles.css'
import Topbar from "./scenes/global/Topbar"
import Dashboard from "./scenes/dashboard";
import { Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Route, Routes } from "react-router-dom";
import Sidebar from "./scenes/global/Sidebar";
import Team from "./scenes/team";
// import Invoices from "./scenes/global/invoices";
import Contacts from "./scenes/contacts";
// import Bar from "./scenes/global/bar";
import Form from "./scenes/form";
// import Line from "./scenes/global/line";
// import Pie from "./scenes/global/pie";
// import FAQ from "./scenes/global/faq";
// import Geography from "./scenes/global/geography";
// import Calendar from "./scenes/global/calendar";

function App() {
  const [theme, colorMode] = useMode();

  return (
  <ColorModeContext.Provider value={colorMode}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="app">
        <Sidebar />
        <main className="content">
          <Topbar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/team" element={<Team />} />
            <Route path="/contacts" element={<Contacts />} />
            {/* <Route path="/invoices" element={<Invoices />} /> */}
            <Route path="/form" element={<Form />} />
            {/* <Route path="/bar" element={<Bar />} /> */}
            {/* <Route path="/pie" element={<Pie />} /> */}
            {/* <Route path="/line" element={<Line />} /> */}
            {/* <Route path="/faq" element={<FAQ />} /> */}
            {/* <Route path="/geography" element={<Geography />} /> */}
            {/* <Route path="/calendar" element={<Calendar />} /> */}
          </Routes>
        </main>
      </div>
    </ThemeProvider>
  </ColorModeContext.Provider>
  );
}

export default App;
