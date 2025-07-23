import { useState } from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import {
  Box,
  IconButton,
  Typography,
  useTheme,
  useMediaQuery,
  Drawer,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { tokens } from "../../theme";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import AddCommentOutlinedIcon from '@mui/icons-material/AddCommentOutlined';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';

const Item = ({ title, to, icon, selected, setSelected, closeMobileMenu }) => {
  const navigate = useNavigate();
  return (
    <MenuItem
      active={selected === title}
      onClick={() => {
        setSelected(title);
        navigate(to);
        if (closeMobileMenu) closeMobileMenu();
      }}
      icon={icon}
    >
      <Typography>{title}</Typography>
    </MenuItem>
  );
};

const mockChatHistory = [
  "Monitor Fora de Quadro:", "IT Service Launch Success F...", "Documento Sobre React Ho...",
  "Como fazer café dalgona", "Teste page", "Melhores práticas de UI/UX", "Cozinhar",
];

const SidebarContent = ({
  onNewChat,
  isMobile,
  selected,
  setSelected,
  isCollapsed,
  setIsCollapsed,
  closeMobileMenu // Nova prop para fechar o menu mobile
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isShowingMore, setIsShowingMore] = useState(false);
  const navigate = useNavigate();
  const initialVisibleCount = 5;
  const visibleHistory = isShowingMore ? mockChatHistory : mockChatHistory.slice(0, initialVisibleCount);

  return (
    <ProSidebar collapsed={isCollapsed}>
      <Menu iconShape="square">
        <MenuItem
          // A função fecha o Drawer no mobile ou recolhe no desktop
          onClick={() => isMobile ? closeMobileMenu() : setIsCollapsed(!isCollapsed)}
          icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
          style={{ margin: "10px 0 20px 0", color: colors.grey[100] }}
        >
          {!isCollapsed && (
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              ml="15px"
            >
              <Typography variant="h3" color={colors.grey[100]}>Chats</Typography>
              <IconButton onClick={() => isMobile ? closeMobileMenu() : setIsCollapsed(!isCollapsed)}>
                <MenuOutlinedIcon />
              </IconButton>
            </Box>
          )}
        </MenuItem>

        {!isCollapsed && (
          <Box mb="25px">
            <Box display="flex" justifyContent="center" alignItems="center">
              <img  
                alt="profile-user" 
                width="100px" 
                height="100px" 
                src={`../../assets/user.jpeg`} 
                style={{ cursor: "pointer",
                borderRadius: "50%" }} />
            </Box>
            <Box textAlign="center">
              <Typography   
                variant="h3" 
                color={colors.grey[200]} 
                sx={{ m: "10px 0 0 0" }}>
                  Orga AI
              </Typography>
              <Typography 
                variant="h6" 
                color={colors.greenAccent[500]}>
                  © Desenvolvido pela equipe de Sistemas
              </Typography>
            </Box>
          </Box>
        )}
        
        <Box paddingLeft={isCollapsed ? undefined : "10%"}>
          <MenuItem
            active={selected === "Nova conversa"}
            style={{ color: colors.grey[100] }}
            onClick={() => {
              setSelected("Nova conversa");
              if(onNewChat) onNewChat();
              navigate("/dashboard");
              if(isMobile) closeMobileMenu();
            }}
            icon={<AddCommentOutlinedIcon />}
          >
            <Typography>Nova conversa</Typography>
          </MenuItem>

          {!isCollapsed && (<Typography variant="h6" color={colors.grey[300]} sx={{ m: "15px 0 5px 20px" }}>Recentes</Typography>)}
          {visibleHistory.map((chatTitle, index) => (
            <MenuItem 
              key={`${chatTitle}-${index}`} 
              style={{ color: colors.grey[100] }} 
              icon={<ChatBubbleOutlineIcon />} 
              onClick={() => { setSelected(chatTitle); if(isMobile) closeMobileMenu(); }} active={selected === chatTitle}>
              <Typography>{chatTitle}</Typography>
            </MenuItem>
          ))}
          {!isCollapsed && mockChatHistory.length > initialVisibleCount && (
            <MenuItem 
              icon={isShowingMore ? <ExpandLessIcon /> : <ExpandMoreIcon />} 
              style={{ color: colors.grey[300] }} 
              onClick={() => setIsShowingMore(!isShowingMore)}>
              <Typography>{isShowingMore ? 'Mostrar menos' : 'Mostrar mais'}</Typography>
            </MenuItem>
          )}

          <Box my="20px" />
          <SubMenu  
            title="Administração" 
            icon={<AdminPanelSettingsOutlinedIcon />} 
            style={{ color: colors.grey[100] }}>
            <Item   
              title="Dashboard" 
              to="/dashboard" 
              icon={<HomeOutlinedIcon />} 
              selected={selected} 
              setSelected={setSelected} 
              closeMobileMenu={closeMobileMenu}/>
            <Item   
              title="Usuários" 
              to="/team" 
              icon={<PeopleOutlinedIcon />} 
              selected={selected} 
              setSelected={setSelected} 
              closeMobileMenu={closeMobileMenu}/>
            <Item   
              title="Criar Usuários" 
              to="/form" 
              icon={<PersonAddOutlinedIcon />} 
              selected={selected} 
              setSelected={setSelected} 
              closeMobileMenu={closeMobileMenu}/>
          </SubMenu>
        </Box>
      </Menu>
    </ProSidebar>
  );
};

const Sidebar = ({ onNewChat }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  // O estado 'isSidebarOpen' controla o Drawer no mobile
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // O estado 'isCollapsed' controla a sidebar no desktop
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <>
      {/* O botão de abrir o menu mobile fica fora do Drawer, na Topbar */}
      {isMobile && !isSidebarOpen && (
  <IconButton 
    onClick={() => setIsSidebarOpen(true)} 
    sx={{ position: 'fixed', top: '15px', left: '15px', zIndex: 1201 }}
  >
    <MenuOutlinedIcon />
  </IconButton>
)}

      {isMobile ? (
        <Drawer 
          anchor="left" 
          open={isSidebarOpen} 
          onClose={() => setIsSidebarOpen(false)}
        >

          <SidebarContent
            onNewChat={onNewChat}
            isMobile={true}
            selected={selected}
            setSelected={setSelected}
            isCollapsed={false} // No Drawer, a sidebar está sempre expandida
            setIsCollapsed={() => {}} // A função é passada, mas não precisa fazer nada
            closeMobileMenu={() => setIsSidebarOpen(false)} // Passa a função para fechar o Drawer
          />
        </Drawer>
      ) : (
        <Box sx={{ position: 'sticky', top: 0, height: '100vh' }}>
          <SidebarContent
            onNewChat={onNewChat}
            isMobile={false}
            selected={selected}
            setSelected={setSelected}
            isCollapsed={isCollapsed}
            setIsCollapsed={setIsCollapsed}
          />
        </Box>
      )}
    </>
  );
};

export default Sidebar;