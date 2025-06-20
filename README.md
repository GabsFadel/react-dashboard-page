# Orga IA 🤖

![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)
![Framework](https://img.shields.io/badge/framework-React-blue?logo=react)
![Versão](https://img.shields.io/badge/versão-1.0.0-informational)
![Licença](https://img.shields.io/badge/licença-Proprietária-red)

Orga IA é uma plataforma de chat inteligente e segura, desenvolvida para uso interno na **[Organnact]**. Ela oferece uma interface moderna e intuitiva para interação com nosso modelo de IA customizado, baseado na tecnologia da OpenAI, além de um painel administrativo completo para gestão de acessos.

---

## 📜 Sobre o Projeto

O objetivo da Orga IA é centralizar a utilização de inteligência artificial na nossa organização, fornecendo uma ferramenta unificada, segura e adaptada às nossas necessidades. A plataforma foi construída com foco em uma experiência de usuário fluida e em ferramentas de administração robustas, garantindo que apenas usuários autorizados tenham acesso e que os administradores possam gerenciar a plataforma com facilidade.

---

## ✨ Funcionalidades Principais

* **✨ Interface de Chat Moderna:** UI inspirada nas melhores plataformas do mercado, com histórico de conversa, renderização de mensagens e design responsivo.
* **👤 Gestão de Usuários Completa:** Painel administrativo para criar, visualizar e gerenciar contas de usuários na plataforma.
* **🔐 Autenticação Segura:** Sistema de Login e Cadastro, garantindo que apenas pessoal autorizado acesse a IA.
* **📜 Histórico de Conversas:** Uma sidebar inteligente que salva e exibe o histórico de chats recentes para fácil acesso.
* **🚀 Modelo de IA Customizado:** Integração direta com um modelo de linguagem próprio, construído sobre a base da API da OpenAI, para respostas mais precisas e contextualizadas ao nosso negócio.
* **🎨 Tema Dinâmico e Estilizado:** Interface construída com Material-UI (MUI) e um sistema de tema customizável para consistência visual.

---

## 📸 Screenshots

<p align="center">
  <img src="caminho/para/sua/image_1f0e03.png" alt="Dashboard de Chat" width="45%">
  &nbsp;&nbsp;
  <img src="caminho/para/sua/image_1f244d.png" alt="Sidebar com Histórico" width="45%">
</p>
<p align="center">
  <img src="caminho/para/sua/image_1f0e9b.png" alt="Login Seguro" width="45%">
</p>


---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Descrição |
| :--- | :--- |
| **React.js** | Biblioteca principal para a construção da interface de usuário. |
| **Material-UI (MUI)** | Suíte de componentes React para um design mais rápido e consistente. |
| **React Pro Sidebar**| Componente utilizado para a criação da sidebar customizável. |
| **OpenAI API** | Base para a comunicação com o nosso modelo próprio de inteligência artificial. |
| **React Router**| Para gerenciamento das rotas da aplicação (Login, Dashboard, Admin, etc.). |

---

## 🚀 Como Executar o Projeto

Siga os passos abaixo para configurar e executar o projeto em seu ambiente de desenvolvimento local.

### Pré-requisitos

* [Node.js](https://nodejs.org/en/) (versão 18.x ou superior)
* `npm` ou `yarn`

### Instalação

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/GabsFadel/react-dashboard-page.git](https://github.com/GabsFadel/react-dashboard-page.git)
    ```

2.  **Acesse a pasta do projeto:**
    ```bash
    cd react-dashboard-page
    ```

3.  **Instale as dependências:**
    ```bash
    npm install
    # ou
    yarn install
    ```

4.  **Configure as variáveis de ambiente:**
    Crie um arquivo chamado `.env` na raiz do projeto, copiando o exemplo de `.env.example` (se houver). Adicione suas chaves de API.
    ```env
    REACT_APP_OPENAI_API_KEY=SUA_CHAVE_DA_OPENAI_AQUI
    ```

### Executando a Aplicação

1.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm start
    # ou
    yarn start
    ```

2.  **Abra no navegador:**
    Acesse [`http://localhost:3000`](http://localhost:3000) para ver a aplicação em execução.

---

## 📁 Estrutura de Pastas

A estrutura de pastas do projeto segue o padrão de aplicações React, com uma organização focada em cenas e componentes reutilizáveis.

```
/
├── public/
└── src/
    ├── assets/
    ├── components/   # Componentes reutilizáveis (Header, etc.)
    ├── scenes/       # Páginas principais da aplicação (dashboard, login, team, etc.)
    ├── theme/        # Arquivo de tema (theme.js)
    ├── App.js
    └── index.js
```

---

## 📄 Licença

Este projeto é de uso exclusivo da **[Nome da Sua Empresa]** e possui licença proprietária. A distribuição, cópia ou utilização fora do ambiente da empresa não é permitida.

---

## 🙏 Agradecimentos

* À **Equipe de Sistemas** pelo desenvolvimento e manutenção.
* A todos os colaboradores que participam dos testes e feedbacks.