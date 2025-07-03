import { Box, IconButton, useTheme, Menu, MenuItem, Dialog, DialogActions, DialogTitle, Button } from "@mui/material";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from '@mui/material/InputBase';
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

const Topbar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
    const navigate = useNavigate();

    // ESTADO PARA O MENU E O DIALOG 
    const [anchorEl, setAnchorEl] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const isMenuOpen = Boolean(anchorEl);

    //  HANDLERS PARA O MENU E DIALOG 
    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleOpenDialog = () => {
        setOpenDialog(true);
        handleMenuClose(); 
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleConfirmLogout = () => {
        console.log("Usuário deslogado. Redirecionando para a página de login...");
        handleCloseDialog();
        navigate('/'); // Redireciona para a página de login
    };


    return (
        <Box display="flex" justifyContent="space-between" p={2}>
            {/* SEARCH BAR */}
            <Box
                display="flex"
                backgroundColor={colors.primary[400]}
                borderRadius="3px"
            >
                <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
                <IconButton type="button" sx={{ p: 1 }}>
                    <SearchIcon />
                </IconButton>
            </Box>

            {/* ICONS */}
            <Box display="flex">
                <IconButton onClick={colorMode.toggleColorMode}>
                    {theme.palette.mode === 'dark' ? (
                        <DarkModeOutlinedIcon />
                    ) : (
                        <LightModeOutlinedIcon />
                    )}
                </IconButton>
                {/* <IconButton>
                    <SettingsOutlinedIcon />
                </IconButton> */}
                
                {/* BOTÃO DE PERFIL COM ONCLICK */}
                <IconButton onClick={handleProfileMenuOpen}>
                    <PersonOutlinedIcon />
                </IconButton>
            </Box>

            {/* MENU DROPDOWN */}
            <Menu
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                id="primary-search-account-menu"
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={isMenuOpen}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={handleOpenDialog}>
                    <LogoutOutlinedIcon sx={{ mr: 1 }} />
                    Logout
                </MenuItem>
            </Menu>

            {/* (DIALOG) */}
            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Gostaria de sair?"}
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="secondary">
                        Não
                    </Button>
                    <Button onClick={handleConfirmLogout} color="secondary" autoFocus>
                        Sim
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
};

export default Topbar;