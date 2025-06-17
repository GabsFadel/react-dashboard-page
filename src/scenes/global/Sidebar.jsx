import { useState } from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { Box, Icon, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";
import HomeIcon from '@mui/icons-material/Home';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ContactsIcon from '@mui/icons-material/Contacts';
import AddReactionIcon from '@mui/icons-material/AddReaction';
// import  ReceiptOutlinedIcon  from "@mui/icons-material/ReceiptOutlined";
// import  PersonalOutlinedIcon  from "@mui/icons-material/PersonalOutlined";
// import  CalendarTodayOutlinedIcon  from "@mui/icons-material/CalendarTodayOutlined";
// import  HelpOutlinedIcon  from "@mui/icons-material/HelpOutlined";
// import  BarChartOutlinedIcon  from "@mui/icons-material/BarChartOutlined";
// import  PieChartOutlinedIcon  from "@mui/icons-material/PieChartOutlined";
// import  TimelineOutlinedIcon  from "@mui/icons-material/TimelineOutlined";
import  MenuOutlinedIcon  from "@mui/icons-material/MenuOutlined";
// import  MapOutlinedIcon  from "@mui/icons-material/MapOutlined";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem 
      active={selected === title} 
      style={{ color: colors.grey[100]}} 
      onClick={()=> setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  )
}

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard"); 

  return (
    <Box
      sx={{
        '& .pro-sidebar-inner': {
          background: `${colors.primary[400]} !important`
        },
        '& .pro-icon-wrapper': {
          backgroundColor: "transparent !important"
        },
        '& .pro-inner-item': {
          padding: "5px 35px 5px 20px !important"
        },
        '& .pro-inner-item:hover': {
          color: "#868dfb !important"
        },
        '& .pro-menu-item.active': {
          color: "#6870fa !important"
        }
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* Logo e Menu */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
            >
              {!isCollapsed && (
                <Box 
                  display="flex" 
                  justifyContent="space-between" 
                  alignItems="center" 
                  ml="15px"
                >
                  <Typography variant="h3" colors={colors.grey[100]}>
                    Chats
                    </Typography>
                  <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                    <MenuOutlinedIcon />
                  </IconButton>
                </Box>
              )}
            </MenuItem>


          {/* USER */}
          {!isCollapsed && (
            <Box mb="25px ">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img 
                  alt="profile-user"
                  widht="100px"
                  height="100px"
                  src={`../../assets/user.jpeg`} 
                  style={{ cursor: "pointer ", borderRadius:"50%"}}
                />
              </Box>

              <Box textAlign="center">
                <Typography 
                  variant="h3" 
                  color={colors.grey[100]} 
                  fontWeight="bold" 
                  sx={{ m: "10px 0 0 0"}}
                  >Orga AI
                  </Typography>
                <Typography variant="h7" color={colors.greenAccent[500]}>
                  © Desenvolvido pela equipe de Sistemas
                  </Typography>
              </Box>
            </Box>
          )}

          {/* MENU ITEMS */}
          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/"
              icon={<HomeIcon/>}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Usuários"
              to="/team"
              icon={<PeopleAltIcon/>}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Criar Usuários"
              to="/form"
              icon={<AddReactionIcon/>}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Dados Usuários"
              to="/contacts"
              icon={<ContactsIcon/>}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>

        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;