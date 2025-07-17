import { Box, IconButton, useTheme, Menu, MenuItem, Dialog, DialogActions, DialogTitle, Button } from "@mui/material";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ColorModeContext, tokens } from "../../theme";
// import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
// import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

const Topbar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
    const navigate = useNavigate();

    // Estado para o menu e o dialog 
    const [anchorEl, setAnchorEl] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const isMenuOpen = Boolean(anchorEl);

    // Handlers para o menu e dialog 
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
        navigate('/');
    };

    return (
        // Layout ajustado e padding responsivo
        <Box 
            display="flex" 
            justifyContent="flex-end" // Alinhado à direita, já que não há mais a busca na esquerda
            p={{ xs: 1, sm: 2 }} // Padding menor em telas pequenas
        >
            {/* ICONS */}
            <Box display="flex">
                {/* <IconButton onClick={colorMode.toggleColorMode}>
                    {theme.palette.mode === 'dark' ? (
                        <DarkModeOutlinedIcon />
                    ) : (
                        <LightModeOutlinedIcon />
                    )}
                </IconButton> */}
                
                <IconButton onClick={handleProfileMenuOpen}>
                    <PersonOutlinedIcon />
                </IconButton>
            </Box>

            {/* MENU DROPDOWN */}
            <Menu
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                id="primary-search-account-menu"
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isMenuOpen}
                onClose={handleMenuClose}
                sx={{ '& .MuiPaper-root': { backgroundColor: colors.primary[400] }}}
            >
                <MenuItem onClick={handleOpenDialog}>
                    <LogoutOutlinedIcon sx={{ mr: 1 }} />
                    Logout
                </MenuItem>
            </Menu>

            {/* DIALOG DE CONFIRMAÇÃO */}
            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                sx={{ '& .MuiPaper-root': { backgroundColor: colors.primary[400] }}}
            >
                <DialogTitle id="alert-dialog-title">
                    {"Gostaria de sair?"}
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleCloseDialog} sx={{ color: colors.grey[100] }}>
                        Não
                    </Button>
                    <Button onClick={handleConfirmLogout} sx={{ color: colors.grey[100] }} autoFocus>
                        Sim
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
};

export default Topbar;