import { Box, Button, TextField, MenuItem, useTheme } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import { useNavigate } from "react-router-dom"; // Hook para navegação
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined'; // Ícone para o botão

const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate(); // Hook para controlar a navegação

  const handleFormSubmit = (values) => {
    console.log("Novo usuário criado:", values);
    // Após criar, pode ser uma boa ideia navegar de volta para a lista
    navigate("/team");
  };

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
    age: "",
    access: "user",
    password: "",
    confirmPassword: "",
  };

  const phoneRegExp = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;

  const userSchema = yup.object().shape({
    firstName: yup.string().required("O nome é obrigatório"),
    lastName: yup.string().required("O sobrenome é obrigatório"),
    email: yup.string().email("Formato de email inválido").required("O email é obrigatório"),
    contact: yup.string().matches(phoneRegExp, "Número de telefone não é válido").required("O contato é obrigatório"),
    age: yup.number().positive("A idade deve ser um número positivo").integer("A idade deve ser um número inteiro").required("A idade é obrigatória"),
    access: yup.string().oneOf(["admin", "manager", "user"]).required("O nível de acesso é obrigatório"),
    password: yup.string().min(6, "A senha deve ter no mínimo 6 caracteres").required("A senha é obrigatória"),
    confirmPassword: yup.string()
      .oneOf([yup.ref("password"), null], "As senhas não conferem")
      .required("Confirme a senha"),
  });

  return (
    <Box m="20px">
      {/* --- BOTÃO DE VOLTAR ADICIONADO AQUI --- */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Criação de Usuário" subtitle="Crie um novo perfil para a plataforma Orga IA" />
        <Button
          onClick={() => navigate('/team')} // Navega de volta para a lista
          sx={{
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
            '&:hover': {
              backgroundColor: colors.blueAccent[600],
            }
          }}
        >
          <ArrowBackOutlinedIcon sx={{ mr: "10px" }} />
          Voltar para a Lista
        </Button>
      </Box>

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={userSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                mt: "30px", // Adicionado margin-top para espaçamento do header
              }}
            >
              {/* Campos do formulário (sem alterações) */}
              <TextField fullWidth variant="filled" type="text" label="Nome" onBlur={handleBlur} onChange={handleChange} value={values.firstName} name="firstName" error={!!touched.firstName && !!errors.firstName} helperText={touched.firstName && errors.firstName} sx={{ gridColumn: "span 2" }} />
              <TextField fullWidth variant="filled" type="text" label="Sobrenome" onBlur={handleBlur} onChange={handleChange} value={values.lastName} name="lastName" error={!!touched.lastName && !!errors.lastName} helperText={touched.lastName && errors.lastName} sx={{ gridColumn: "span 2" }} />
              <TextField fullWidth variant="filled" type="text" label="Email" onBlur={handleBlur} onChange={handleChange} value={values.email} name="email" error={!!touched.email && !!errors.email} helperText={touched.email && errors.email} sx={{ gridColumn: "span 4" }} />
              <TextField fullWidth variant="filled" type="password" label="Senha" onBlur={handleBlur} onChange={handleChange} value={values.password} name="password" error={!!touched.password && !!errors.password} helperText={touched.password && errors.password} sx={{ gridColumn: "span 2" }} />
              <TextField fullWidth variant="filled" type="password" label="Confirmar Senha" onBlur={handleBlur} onChange={handleChange} value={values.confirmPassword} name="confirmPassword" error={!!touched.confirmPassword && !!errors.confirmPassword} helperText={touched.confirmPassword && errors.confirmPassword} sx={{ gridColumn: "span 2" }} />
              <TextField fullWidth variant="filled" type="text" label="Número de Telefone" onBlur={handleBlur} onChange={handleChange} value={values.contact} name="contact" error={!!touched.contact && !!errors.contact} helperText={touched.contact && errors.contact} sx={{ gridColumn: "span 4" }} />
              <TextField fullWidth variant="filled" type="number" label="Idade" onBlur={handleBlur} onChange={handleChange} value={values.age} name="age" error={!!touched.age && !!errors.age} helperText={touched.age && errors.age} sx={{ gridColumn: "span 2" }} />
              <TextField fullWidth variant="filled" select label="Nível de Acesso" value={values.access} onChange={handleChange} onBlur={handleBlur} name="access" error={!!touched.access && !!errors.access} helperText={touched.access && errors.access} sx={{ gridColumn: "span 2" }} >
                <MenuItem value="user">User</MenuItem>
                <MenuItem value="manager">Manager</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
              </TextField>

            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" sx={{
                backgroundColor: colors.greenAccent[600],
                color: colors.grey[100],
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
                '&:hover': {
                  backgroundColor: colors.greenAccent[700],
                }
              }}>
                Criar Novo Usuário
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default Form;