# E-commerce Backend 

Um backend robusto para e-commerce desenvolvido com NestJS, Prisma e PostgreSQL, focado em segurança e escalabilidade.

## 🚀 Tecnologias Utilizadas

### Principais Dependências

- **NestJS** (`@nestjs/core`, `@nestjs/common`) - Framework Node.js progressivo para construção de aplicações server-side eficientes e escaláveis
- **Prisma** (`@prisma/client`, `prisma`) - ORM moderno para TypeScript e Node.js que facilita o acesso ao banco de dados
- **PostgreSQL** - Banco de dados relacional robusto e confiável
- **JWT** (`@nestjs/jwt`, `jose`) - Para autenticação e autorização segura
- **Bcrypt** (`bcrypt`) - Para hash seguro de senhas
- **Axios** (`@nestjs/axios`, `axios`) - Cliente HTTP para consumo de APIs externas
- **Class Validator** (`class-validator`, `class-transformer`) - Validação e transformação de dados
- **Cookie Parser** (`cookie-parser`) - Manipulação de cookies HTTP

### Dependências de Desenvolvimento

- **TypeScript** - Linguagem tipada baseada em JavaScript
- **ESLint & Prettier** - Ferramentas de linting e formatação de código
- **Jest** - Framework de testes
- **SWC** - Compilador rápido para TypeScript/JavaScript

## 📋 Pré-requisitos

- Node.js (versão 18 ou superior)
- Docker e Docker Compose
- npm ou yarn

## 🛠️ Como Rodar o Projeto

### 1. Clone o repositório
```bash
git clone https://github.com/wagnerjunr/Ecommerce-Holding-Backend.git
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Configure as variáveis de ambiente
Crie um arquivo `.env` na raiz do projeto com:
```env
DATABASE_URL="postgresql://admin:admin@localhost:5432/ecommerce_devnology?schema=public"
JWT_SECRET="seu-jwt-secret-aqui"
JWT_REFRESH_SECRET="seu-jwt-refresh-secret-aqui"
```

### 4. Inicie o banco de dados com Docker
```bash
docker-compose up -d
```

### 5. Execute as migrações do Prisma
```bash
npx prisma migrate dev
```

### 6. Gere o cliente Prisma
```
npx prisma generate
```
### 7. Inicie a aplicação
```
# Desenvolvimento
npm run start:dev
```
A aplicação estará disponível em http://localhost:3001

## 🏗️ Decisões Técnicas

### 1. Estruturação do Schema e Tecnologias Base

**PostgreSQL**: Escolhido como banco de dados principal por sua robustez e excelente performance para aplicações e-commerce.

**Prisma**: Utilizado como ORM por oferecer:
- Type-safety completa com TypeScript
- Migrações automáticas e versionamento de schema
- Query builder intuitivo e performático

**NestJS**: Framework escolhido por:
- Arquitetura modular e escalável
- Decorators e dependency injection nativos
- Excelente integração com TypeScript
- Ecosystem robusto com guards, interceptors e middlewares

### 2. Sistema de Autenticação Seguro

Implementação de um fluxo de autenticação robusto com:

- **Tokens JWT**: Access tokens de curta duração e refresh tokens de longa duração
- **Cookies HTTP-Only**: Tokens armazenados em cookies seguros para prevenir ataques XSS
- **Refresh Token Rotation**: Refresh tokens são renovados a cada uso, aumentando a segurança
- **Armazenamento Backend**: Refresh tokens são persistidos no banco de dados para controle de sessões

### 3. Middleware de Autenticação

Criação de um middleware personalizado (`auth.middleware.ts`) que:
- Intercepta todas as rotas privadas automaticamente
- Verifica a validade dos tokens antes de processar requisições
- Realiza refresh automático de tokens quando necessário
- Adiciona informações do usuário ao contexto da requisição

### 4. Integração com APIs Externas

Sistema de produtos que consome APIs externas:
- **Produtos Brasileiros e Europeus**: Integração com múltiplas APIs externas
- **Mapeamento de Dados**: Transformação e padronização de dados de diferentes fontes
- **Cache e Performance**: Otimização para reduzir chamadas desnecessárias

### 5. Arquitetura de Pedidos e Endereços

Estrutura otimizada para e-commerce:

**Endereços Vinculados ao Usuário**: 
- Endereços pertencem ao usuário, não ao pedido
- Facilita reutilização e gerenciamento de múltiplos endereços
- Pedidos referenciam endereços via `addressId`

**Gestão de Pedidos**:
- Cada pedido possui itens detalhados com quantidade e preço
- Status de pedido controlado via enum (`PENDING`, `CONFIRMED`, `SHIPPED`, etc.)
- Relacionamentos bem definidos entre usuário, pedido, itens e endereço

### 6. Validação com DTOs

Implementação de Data Transfer Objects para:
- **Validação de Entrada**: Uso de `class-validator` para validar dados recebidos
- **Transformação de Dados**: Conversão automática de tipos com `class-transformer`
- **Documentação Automática**: DTOs servem como documentação viva da API

### 7. Gerenciamento de Cookies

Estrutura segura para manipulação de cookies:
- **HTTP-Only**: Cookies inacessíveis via JavaScript no frontend
- **Secure**: Transmissão apenas via HTTPS em produção
- **SameSite**: Proteção contra ataques CSRF
- **Expiração Controlada**: Diferentes tempos de vida para access e refresh tokens

## 🐳 Docker e Infraestrutura

### Docker Compose
O arquivo `docker-compose.yml` orquestra:
- **PostgreSQL**: Banco de dados principal com persistência de dados
- **Volumes**: Mapeamento para persistir dados do banco
- **Environment**: Configurações de ambiente para desenvolvimento

## 🔒 Segurança

- Senhas hasheadas com bcrypt
- Tokens JWT com expiração controlada
- Cookies HTTP-Only para prevenir XSS
- Validação rigorosa de entrada de dados
- Middleware de autenticação em rotas protegidas

## 📊 Schema do Banco de Dados

O projeto utiliza as seguintes entidades principais:
- **Users**: Usuários do sistema
- **Orders**: Pedidos realizados
- **OrderItems**: Itens de cada pedido
- **Addresses**: Endereços dos usuários

Todas as relações são bem definidas com chaves estrangeiras e constraints apropriadas.

---

**Desenvolvido com ❤️ usando as melhores práticas de desenvolvimento backend**
        
