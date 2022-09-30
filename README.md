# ISS

500 International Space Station

## Getting Started

### Prerequisites

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/)
- [pnpm](https://pnpm.io/)

### Installation

Clone the repository.

```bash
git clone https://github.com/mateuszaliyev/iss.git
# or
git clone git@github.com:mateuszaliyev/iss.git
```

Go to the project directory.

```bash
cd iss
```

Install dependencies.

```bash
pnpm install
```

Generate
[Prisma](https://www.prisma.io/docs/concepts/components/prisma-client/working-with-prismaclient/generating-prisma-client)
types.

```bash
pnpm prisma:build
```

Rename [`.env.example`](./.env.example) file to `.env` and replace the
placeholder values with your environment variables.

Push the state of your Prisma schema file to the database.

```bash
pnpm prisma:push
```

## Usage

Run the development server.

```bash
pnpm dev
```

Lint code with ESLint.

```bash
pnpm lint
```

Build application for production.

```bash
pnpm build
```

Start production server.

```bash
pnpm start
```

## Authors

- Konrad Bochenek ([@Kazan1520](https://github.com/Kazan1520))
- Mariusz Dąbrowski ([@marioooo0o](https://github.com/marioooo0o))
- Mateusz Aliyev ([@mateuszaliyev](https://github.com/mateuszaliyev))
- Mateusz Herda ([@mherda64](https://github.com/mherda64))

## License

[MIT](./LICENSE)
