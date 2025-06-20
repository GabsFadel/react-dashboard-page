import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";
import HomeIcon from '@mui/icons-material/Home';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ContactsIcon from '@mui/icons-material/Contacts';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import AddCommentOutlinedIcon from '@mui/icons-material/AddCommentOutlined';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{ color: colors.grey[100] }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  )
}

const mockChatHistory = [
  "Monitor Fora de Quadro:...", 
  "IT Service Launch Success F...", 
  "Documento Sobre React Ho...", 
  "Como fazer café dalgona",
  "Mija em mim", 
  "Melhores práticas de UI/UX",
  "Cozinhar droga",
];

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const [isShowingMore, setIsShowingMore] = useState(false);
  const initialVisibleCount = 5;
  const visibleHistory = isShowingMore ? mockChatHistory : mockChatHistory.slice(0, initialVisibleCount);

  return (
    <Box
      sx={{
        height: "100vh", display: 'flex',
        '& .pro-sidebar-inner': { background: `${colors.primary[400]} !important` },
        '& .pro-icon-wrapper': { backgroundColor: "transparent !important" },
        '& .pro-inner-item': {
          padding: "5px 35px 5px 20px !important",
          '& .pro-item-content': { whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }
        },
        '& .pro-inner-item:hover': {
          color: "#868dfb !important",
          backgroundColor: "rgba(134, 141, 251, 0.1) !important",
          borderRadius: "8px",
        },
        '& .pro-menu-item.active': { color: "#6870fa !important" }
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* Logo e Menu */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{ margin: "10px 0 20px 0", color: colors.grey[100] }}
          >
            {!isCollapsed && (
              <Box display="flex" justifyContent="space-between" alignItems="center" ml="15px">
                <Typography variant="h3" color={colors.grey[100]}>Chats</Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}><MenuOutlinedIcon /></IconButton>
              </Box>
            )}
          </MenuItem>

          {/* USER */}
          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user" width="100px" height="100px"
                  src={`../../assets/user.jpeg`}
                  style={{ cursor: "pointer ", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography variant="h3" color={colors.grey[100]} fontWeight="bold" sx={{ m: "10px 0 0 0" }}>
                  Orga AI
                </Typography>
                <Typography variant="h6" color={colors.greenAccent[500]}>
                  © Desenvolvido pela equipe de Sistemas
                </Typography>
              </Box>
            </Box>
          )}


          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Nova conversa" to="/" icon={<AddCommentOutlinedIcon />}
              selected={selected} setSelected={setSelected}
            />
            {!isCollapsed && (
              <Typography variant="h6" color={colors.grey[300]} sx={{ m: "15px 0 5px 0" }}>
                Recentes
              </Typography>
            )}
            {visibleHistory.map((chatTitle, index) => (
              <MenuItem
                key={`${chatTitle}-${index}`} style={{ color: colors.grey[100] }}
                icon={<ChatBubbleOutlineIcon />} onClick={() => setSelected(chatTitle)}
                active={selected === chatTitle}
              >
                <Typography>{chatTitle}</Typography>
              </MenuItem>
            ))}

            {!isCollapsed && mockChatHistory.length > initialVisibleCount && (
              <MenuItem
                icon={isShowingMore ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                style={{ color: colors.grey[300] }} onClick={() => setIsShowingMore(!isShowingMore)}
              >
                <Typography>{isShowingMore ? 'Mostrar menos' : 'Mostrar mais'}</Typography>
              </MenuItem>
            )}
            

            <Box my="20px" />
            {!isCollapsed && (
              <Typography variant="h6" color={colors.grey[300]} sx={{ m: "15px 0 5px 0" }}>
                Admin
              </Typography>
            )}
            
            <Item
              title="Dashboard" to="/" icon={<HomeIcon />}
              selected={selected} setSelected={setSelected}
            />
            <Item
              title="Usuários" to="/team" icon={<PeopleAltIcon />}
              selected={selected} setSelected={setSelected}
            />
            <Item
              title="Criar Usuários" to="/form" icon={<AddReactionIcon />}
              selected={selected} setSelected={setSelected}
            />
            <Item
              title="Dados Usuários" to="/contacts" icon={<ContactsIcon />}
              selected={selected} setSelected={setSelected}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;