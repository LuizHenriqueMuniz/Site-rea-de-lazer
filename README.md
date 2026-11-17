# Espaço Andreluz

Site de divulgação e reservas de uma área de lazer para eventos (aniversários, casamentos, confraternizações) em Rio Preto. O cliente conhece o espaço, vê as fotos e envia o pedido de reserva direto para o WhatsApp do proprietário. Não há pagamento no site: a disponibilidade e as condições são combinadas na conversa.

**Site no ar:** https://espaçoandreluz.com.br

## Funcionalidades

- Página única com as seções: topo, o espaço, comodidades, galeria, localização, contato e rodapé.
- Galeria de fotos com ampliação ao clicar, navegação por setas e teclado e troca de foto deslizando o dedo no celular.
- Formulário de reserva com validação: nome, WhatsApp brasileiro (com máscara e DDD), data que não esteja no passado e tipo de evento obrigatório.
- Botão "Enviar via WhatsApp": abre uma conversa com o número do proprietário e a mensagem já preenchida (link `wa.me`).
- Botão flutuante do WhatsApp, visível em toda a página.
- Prévia do link (título, descrição e foto) ao compartilhar no WhatsApp, Instagram e outras redes.
- Layout responsivo, pensado primeiro para celular, com animações ao rolar a página.

## Tecnologias

- [React](https://react.dev) 19 e TypeScript
- [Vite](https://vite.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [pnpm](https://pnpm.io) como gerenciador de pacotes
- Hospedagem e DNS no [Cloudflare](https://www.cloudflare.com); domínio registrado no [Registro.br](https://registro.br)
- Design criado no Figma

## Estrutura do projeto

```
.
├── public/
│   └── images/        # fotos do site (WebP) e imagem de prévia do link
├── src/
│   ├── imports/       # logo
│   ├── App.tsx        # seções do site e formulário de reserva
│   └── main.tsx       # ponto de entrada
├── index.html         # título, descrição e tags de prévia do link
├── vite.config.ts
├── tsconfig.json
└── package.json
```

## Como rodar localmente

Requisitos: [Node.js](https://nodejs.org) (versão LTS) e pnpm (`npm install -g pnpm`).

```bash
pnpm install        # instala as dependências
pnpm run dev        # servidor local em http://localhost:5173
pnpm run build      # gera a versão de produção na pasta dist
```

Rode `pnpm run build` antes de cada `git push`. Se houver erro de código, ele aparece no seu computador, e não no deploy.

## Configurações principais

| O que | Onde | Observação |
| --- | --- | --- |
| Número do WhatsApp | `WHATSAPP_NUMBER` em `src/App.tsx` | Só dígitos, no formato `55` + DDD + número. Vale para os dois botões. |
| Envio por e-mail | `ENVIO_POR_EMAIL_ATIVO` em `src/App.tsx` | Fica `false` enquanto não existir um backend. Com `true`, aparece o botão "Só enviar mensagem". |
| Fotos da galeria | `GALLERY` em `src/App.tsx` | Cada item tem `src`, `alt` e `span`. |
| Título, descrição e prévia do link | `index.html` | Tags `title`, `description`, `og:*` e `canonical`. |
| Cor dourada | `GOLD` em `src/App.tsx` | Usada em todo o site. |

## Como trocar ou adicionar fotos

1. Converta a foto para WebP e comprima (por exemplo em [squoosh.app](https://squoosh.app)). Meta: até cerca de 300 KB por foto de galeria e 500 KB para a do topo.
2. Use nome em minúsculas, sem espaço e sem acento (`piscina.webp`). O servidor diferencia maiúsculas de minúsculas, e nomes diferentes quebram a imagem só depois de publicado.
3. Coloque o arquivo em `public/images/`.
4. No código, use o caminho a partir da raiz: `src="/images/piscina.webp"`. Não escreva `public` no caminho.

A imagem de prévia do link precisa ser um JPG de verdade (não basta renomear a extensão). Ela é referenciada no `og:image` do `index.html`.

## Publicação (deploy)

O site é publicado no Cloudflare (Workers, com arquivos estáticos), conectado a este repositório do GitHub.

- Cada `git push` na branch `main` dispara um novo build e publica o site em um ou dois minutos.
- Build: `pnpm run build`. O Cloudflare publica a pasta `dist`.
- O acompanhamento dos deploys fica no painel do Cloudflare, em Workers & Pages, no projeto do site.

```bash
git add .
git commit -m "descrição da alteração"
git push
```

Comandos do Git são digitados no terminal, nunca dentro dos arquivos de código.

## Domínio

- O domínio `espaçoandreluz.com.br` está registrado no Registro.br e precisa ser **renovado todo ano**. Mantenha a renovação automática ativa.
- Os servidores de nome (DNS) do domínio apontam para o Cloudflare, que gerencia o DNS e emite o HTTPS automaticamente.
- No projeto do Cloudflare, em Settings → Domains & Routes, estão cadastrados o domínio principal e a versão com `www`.
- O domínio tem cedilha. Nas tags de prévia do link (`og:image`, `og:url`, `canonical`), usa-se a forma técnica `xn--espaoandreluz-lgb.com.br`, que é a mais compatível com WhatsApp e Google.
- Quem digitar o endereço sem o ç não chega ao site, então divulgue sempre como link clicável ou QR code.

## Manutenção

- Ativar a verificação em duas etapas no GitHub, no Cloudflare e no Registro.br.
- Atualizar o número do WhatsApp em `WHATSAPP_NUMBER` se o proprietário trocar de telefone.
- Não colocar senhas nem chaves no repositório. A pasta `node_modules` e os arquivos `.env` estão no `.gitignore`.
- Depois de mudar o título, a descrição ou a imagem de prévia, mande o link no WhatsApp com uma marca no final (como `?v=2`) para ele ler a página de novo, porque guarda a prévia antiga de cada endereço.

## Próximos passos

- Backend de e-mail para o botão "Só enviar mensagem" (função serverless), para o proprietário receber o pedido mesmo se o cliente não concluir o envio no WhatsApp.
- Seção de condições e perguntas frequentes (capacidade, horários, o que está incluso, regras, sinal e cancelamento).
