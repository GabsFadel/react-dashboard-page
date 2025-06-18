import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";

const initialValues ={ 
  firstName: "",
  lastName: "",
  email: "",
  // password: any,
  contact: "",
  address1: "",
  address2: "",
}

const phoneRegExp = 
  /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/

const userSchema = yup.object().shape({
  firstName: yup
    .string()
    .required("Informe o nome"),
  lastName: yup
    .string()
    .required("Informe o sobrenome"),
  email: yup
    .string()
    .email("Email invalido")
    .required("Informe o email"),
  // password: yup
  //   .string()
  //   .password("Informe uma senha")
  //   .required("Digite uma senha")
  //   .min(6),
  contact: yup
    .string()
    .matches(phoneRegExp, "Telefone não é valido")
    .required("Informe o contato"),
  address1: yup
    .string()
    .required("Informe o endereço"),
  address2: yup
    .string()
    .required("Informe o endereço2"),
})

const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (values) => {
    console.log(values);
  }

  return <Box m="20px">
    <Header title="Criação de usuário" subtitle="Crie um novo perfil de usuário" />

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
        handleSubmit 
      }) => (
        <form onSubmit={handleSubmit}>
          <Box 
            display="grid"
            gap="30px" 
            gridTemplateColumns="repeat(4, minmax(0, 1fr))" //1fr significa que cada coluna pode ter 1 fração do espaço, na page
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined: "span 4"},
            }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Nome"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
                name="firstName"
                error={!!touched.firstName && !!errors.firstName} //isso esta forçando um boolean | e quando é clicado no campo ele força erro
                helperText={!!touched.firstName && errors.firstName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Sobrenome"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastName}
                name="lastName"
                error={!!touched.lastName && !!errors.lastName} //isso esta forçando um boolean | e quando é clicado no campo ele força erro
                helperText={!!touched.lastName && errors.lastName}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email} //isso esta forçando um boolean | e quando é clicado no campo ele força erro
                helperText={!!touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />
              {/* <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Senha"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="password"
                error={!!touched.password && !!errors.password} //isso esta forçando um boolean | e quando é clicado no campo ele força erro
                helperText={!!touched.password && errors.password}
                sx={{ gridColumn: "span 2" }}
              /> */}
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Número de telefone"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.contact}
                name="contact"
                error={!!touched.contact && !!errors.contact} //isso esta forçando um boolean | e quando é clicado no campo ele força erro
                helperText={!!touched.contact && errors.contact}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Endereço 1"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address1}
                name="address1"
                error={!!touched.address1 && !!errors.address1} //isso esta forçando um boolean | e quando é clicado no campo ele força erro
                helperText={!!touched.address1 && errors.address1}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Endereço 2"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address2}
                name="address2"
                error={!!touched.address2 && !!errors.address2} //isso esta forçando um boolean | e quando é clicado no campo ele força erro
                helperText={!!touched.address2 && errors.address2}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained" >
                Crie novo usuário
              </Button>
            </Box>
        </form>
      )}
    </Formik>
  </Box>
}


export default Form; 