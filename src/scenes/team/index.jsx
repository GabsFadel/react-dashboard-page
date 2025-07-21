import { useState } from "react"; 
import { Box, Typography, useTheme, Button, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import { useNavigate } from "react-router-dom";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import Header from "../../components/Header";

const Team = ({ isMobile }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const [users, setUsers] = useState(mockDataTeam);

  const handleEdit = (id) => {
    navigate(`/edit-user/${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm("Você tem certeza que deseja deletar este usuário?")) {
      setUsers(users.filter((user) => user.id !== id));
    }
  };

  let columns = [
    { field: "id", headerName: "ID" },
    { field: "name", headerName: "Name", flex: 1, cellClassName: "name-column--cell" },
    { field: "age", headerName: "Age", type: "number", headerAlign: "left", align: "left" },
    { field: "phone", headerName: "Phone Number", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    {
      field: "access",
      headerName: "Access Level",
      flex: 1,
      renderCell: ({ row: { access } }) => (
        // --- CORREÇÃO APLICADA AQUI ---
        <Box
          // Removido 'width="80%"' para permitir que o box se ajuste ao conteúdo.
          // Ajustado o padding para '5px 10px' para dar um espaçamento horizontal mais agradável.
          m="0 auto" 
          p="5px 10px" 
          display="flex" 
          justifyContent="center"
          backgroundColor={access === 'admin' ? colors.greenAccent[600] : colors.greenAccent[700]}
          borderRadius="4px"
        >
          {access === "admin" && <AdminPanelSettingsOutlinedIcon />}
          {access === "manager" && <SecurityOutlinedIcon />}
          {access === "user" && <LockOpenOutlinedIcon />}
          <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>{access}</Typography>
        </Box>
      ),
    },
    {
      field: "actions",
      headerName: "Ações",
      flex: 1,
      renderCell: (params) => (
        <Box display="flex" justifyContent="center" width="100%">
          <IconButton onClick={() => handleEdit(params.row.id)}>
            <EditOutlinedIcon />
          </IconButton>
          <IconButton onClick={() => handleDelete(params.row.id)} sx={{ color: colors.redAccent[500] }}>
            <DeleteOutlineIcon />
          </IconButton>
        </Box>
      )
    }
  ];

  if (isMobile) {
    columns = columns.filter(
      (col) => col.field === 'name' || col.field === 'access' || col.field === 'actions'
    );
  }

  return (
    <Box m={isMobile ? "10px" : "20px"}>
      <Box 
        display="flex" 
        flexDirection={isMobile ? "column" : "row"}
        justifyContent="space-between" 
        alignItems={isMobile ? "flex-start" : "center"}
        gap={isMobile ? 2 : 0}
      >
        <Header title="Usuários" subtitle="Administração de usuários da IA" />
        <Button
          onClick={() => navigate('/form')}
          sx={{
            backgroundColor: colors.blueAccent[700], 
            color: colors.grey[100],
            fontSize: "14px", 
            fontWeight: "bold", 
            padding: "10px 20px",
            width: isMobile ? "100%" : "auto",
            '&:hover': { backgroundColor: colors.blueAccent[600] }
          }}
        >
          <AddOutlinedIcon sx={{ mr: "10px" }} />
          Criar Novo Usuário
        </Button>
      </Box>
      <Box 
        m="20px 0 0 0"
        sx={{
          overflow: "auto",
          "& .MuiDataGrid-root": { border: "none" },
          "& .MuiDataGrid-cell": { borderBottom: "none" },
          "& .name-column--cell": { color: colors.greenAccent[300] },
          "& .MuiDataGrid-columnHeaders": { backgroundColor: colors.blueAccent[700], borderBottom: "none" },
          "& .MuiDataGrid-virtualScroller": { backgroundColor: colors.primary[400] },
          "& .MuiDataGrid-footerContainer": { borderTop: "none", backgroundColor: colors.blueAccent[700] },
        }}
      >
        <DataGrid
          autoHeight
          rows={users} 
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default Team;