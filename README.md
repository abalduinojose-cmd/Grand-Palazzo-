# Grand Palazzo, o site

Site do bangalô privativo com piscina e hidromassagem às margens da
represa de Areal, no Rio de Janeiro. Uma página só, feita para virar
conversa no WhatsApp, e já pronta para o Google (mapa do site, dados
estruturados e cartão de compartilhamento).

Você não precisa saber programar para trocar textos e fotos. Este guia
mostra onde cada coisa mora.

## Como trocar os TEXTOS

Todo texto visível mora em três arquivos da pasta `src/content/`. Abra
em qualquer editor (recomendo o [VS Code](https://code.visualstudio.com/),
gratuito), troque o texto entre aspas e salve.

Uma proteção importante: o site confere esses arquivos sozinho. Se algum
texto ficar vazio ou fora do padrão, ele avisa com erro na hora de
publicar, em vez de ir ao ar quebrado. Pode editar sem medo.

### `src/content/site.ts`

| Campo | O que controla |
| --- | --- |
| `SITE_URL` | Endereço definitivo do site (hoje é provisório, confirme antes de publicar) |
| `nome`, `tagline`, `localizacao` | Nome, frase de apresentação e cidade, usados no rodapé e no compartilhamento |
| `distancias` | O tempo "20 min do centro de Areal" |
| `whatsapp` | Número que recebe as reservas. Troque aqui e todos os botões do site mudam de destino |
| `instagram` | Link e arroba |
| `reserva` | Deixe `null` enquanto a reserva for por WhatsApp. Com um link de Airbnb ou Booking, os botões passam a apontar para lá |
| `avaliacao` | Nota e quantidade. Enquanto for `null`, o site não mostra nota nenhuma |
| `manifesto` | O texto grande sobre fundo marrom |
| `home` (mais abaixo) | Todos os títulos e frases da página, seção por seção |

### `src/content/ambientes.ts`

Os seis cantos do bangalô (piscina, hidro, lareira, suíte, deck e café).
Cada um tem `nome` e `essencia`, que é a frase curta que aparece sobre a
foto. A foto de cada ambiente é escolhida no mapa `FOTO`, logo acima da
lista.

### `src/content/faq.ts`

Cada bloco tem `pergunta` e `resposta`. Para adicionar uma nova, copie um
bloco inteiro (das chaves `{` até `},`) e cole antes do fechamento. O
site aceita de 6 a 8 perguntas.

Regra da casa: onde ainda não há informação confirmada (capacidade,
pets, café da manhã), a resposta orienta a perguntar no WhatsApp. Quando
o dado for confirmado, troque por uma afirmação direta.

## Prévia pública

O site está no ar para você ver e mandar para quem quiser:
**https://abalduinojose-cmd.github.io/Grand-Palazzo-/**

É um endereço provisório, de teste. Ele não aparece no Google de
propósito, para não competir com o domínio definitivo quando ele existir.
Para atualizar a prévia depois de mudar algo: `npm run build:pages` e
depois enviar para o GitHub.

## Como trocar as FOTOS e os VÍDEOS

1. Coloque os arquivos novos em `midia/fotos/` ou `midia/videos/`.
2. Abra `scripts/fotos.mjs` e, no mapa `CURADORIA`, aponte o nome do
   arquivo novo para o nome de cena que ele deve ocupar (por exemplo
   `"minha-foto.jpg": "piscina-com-vista.jpg"`).
3. Rode `node scripts/fotos.mjs`. O script redimensiona e otimiza
   sozinho.
4. Se a cena mudou de conteúdo, atualize a descrição (`alt`) dela em
   `src/assets/fotos/index.ts`. Essa descrição é o que o Google e os
   leitores de tela entendem da imagem.

O script faz três coisas além de redimensionar: afia a imagem (as fotos
vieram de post do Instagram e chegam moles), respeita um teto de 620KB
por foto, e aplica recorte ou correção de luz nas que precisam. Essas
correções ficam no mapa `TRATAMENTO`, com o motivo escrito ao lado de
cada uma. O vídeo de fundo da dobra sai de `scripts/videos.mjs`, que usa
só os primeiros segundos do reel do tour, em loop espelhado.

Para trocar qual foto abre o site ou qual entra na galeria, edite os
mapas no fim de `src/assets/fotos/index.ts` (`heroFoto` e `galeria`).

## Como trocar o LOGO

O logo original do cliente está em `arte/logo-original.png`. Para
processar uma versão nova, substitua esse arquivo e rode
`node scripts/logo.mjs`. Ele gera sozinho as três versões que o site
usa: a colorida, só o frontão e a máscara de uma cor (usada no cabeçalho
sobre a foto e no rodapé escuro).

## Cores e fontes

A paleta oficial e as regras de uso estão comentadas no topo de
`src/app/globals.css`. Vale ler antes de mudar qualquer cor: o dourado e
o bege são bonitos mas têm pouco contraste, então só entram em título
grande ou como enfeite, nunca em texto pequeno. O marrom e o café são os
que podem carregar texto.

## Dados pendentes

O arquivo `CONTEUDO-PENDENTE.md`, aqui na raiz, é o checklist do que
falta confirmar. Vale abrir: tem itens que mudam o site (link de
reserva, avaliações, endereço para o mapa) e outros que hoje estão
sendo respondidos com "pergunte no WhatsApp".

## Comandos

Com o [Node.js](https://nodejs.org/) instalado, nesta pasta:

| Comando | O que faz |
| --- | --- |
| `npm install` | Instala as dependências (só na primeira vez) |
| `npm run dev` | Liga o site em modo de edição em `http://localhost:5234` |
| `npm run build` | Gera a versão final e confere se está tudo certo |
| `npm run build:pages` | Atualiza a prévia pública (pasta `docs/`) |
| `node scripts/fotos.mjs` | Processa as fotos de `midia/fotos/` |
| `node scripts/logo.mjs` | Processa o logo de `arte/logo-original.png` |
| `node scripts/videos.mjs` | Remonta o vídeo de fundo da dobra |
