import { useState } from "react"; // Importando useState
import { Box, Typography, useTheme, Button, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import { useNavigate } from "react-router-dom";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'; // Ícone de deletar
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import Header from "../../components/Header";

const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  // --- NOVA LÓGICA DE ESTADO E DELEÇÃO ---
  // Colocamos os dados em um estado para que possamos modificá-los (deletar)
  const [users, setUsers] = useState(mockDataTeam);

  const handleEdit = (id) => {
    console.log(`Editando usuário com ID: ${id}`);
    // Navega para a nova rota de edição
    navigate(`/edit-user/${id}`);
  };

  const handleDelete = (id) => {
    // Adiciona uma confirmação antes de deletar
    if (window.confirm("Você tem certeza que deseja deletar este usuário?")) {
      console.log(`Deletando usuário com ID: ${id}`);
      // Filtra o array, removendo o usuário com o ID correspondente
      setUsers(users.filter((user) => user.id !== id));
    }
  };

  const columns = [
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
        <Box
          width="60%" m="0 auto" p="5px" display="flex" justifyContent="center"
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
          {/* BOTÃO DE DELETAR AGORA FUNCIONAL */}
          <IconButton onClick={() => handleDelete(params.row.id)} sx={{ color: colors.redAccent[500] }}>
            <DeleteOutlineIcon />
          </IconButton>
        </Box>
      )
    }
  ];

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Usuários" subtitle="Administração de usuários da IA" />
        <Button
          onClick={() => navigate('/form')}
          sx={{
            backgroundColor: colors.blueAccent[700], color: colors.grey[100],
            fontSize: "14px", fontWeight: "bold", padding: "10px 20px",
            '&:hover': { backgroundColor: colors.blueAccent[600] }
          }}
        >
          <AddOutlinedIcon sx={{ mr: "10px" }} />
          Criar Novo Usuário
        </Button>
      </Box>
      <Box m="40px 0 0 0" sx={{ /* ... seus estilos sx ... */ }}>
        <DataGrid
          autoHeight
          rows={users} // Usa o estado 'users' em vez do mockDataTeam direto
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default Team;