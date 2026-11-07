# Site Personal Divas — guia rápido de edição

Abra `index.html` no navegador para ver o site. Toda a edição é feita em **`js/config.js`** (textos, preços, caminhos das mídias) e nas pastas **`assets/`** (arquivos de foto e vídeo).

## Estrutura de pastas
```
index.html            página inicial
produto.html          página do produto (abre ao clicar no produto)
css/style.css         aparência
js/config.js          >>> ARQUIVO QUE VOCÊ EDITA <<<
js/loja.js, home.js, produto.js   funcionamento (normalmente não mexer)
assets/
  images/
    logo/             logo.png (usada no site) + logomarca-original.jpg
    banner/           banner-01.jpg, banner-02.jpg (+ promo-01.jpg etc., se usar a faixa de promoções)
    products/
      produto-01/ ... produto-06/     foto-1.jpg, foto-2.jpg, foto-3.jpg de cada produto
    testimonials/     cliente-01.jpg, cliente-02.jpg (capa do vídeo), cliente-03.jpg
  videos/
    banner/           coloque aqui vídeos .mp4 de banner
    testimonials/     depoimento-02.mp4
```

## Como trocar cada coisa
- **Fotos de um produto:** substitua `foto-1.jpg`, `foto-2.jpg`, `foto-3.jpg` na pasta do produto (mantenha os nomes). Para usar mais fotos, adicione o arquivo e inclua o caminho na lista `fotos` do produto em `config.js`. A `foto-1` aparece na vitrine.
- **Preços e promoção:** em `config.js`, no produto, edite `preco` e `promo` (use `null` para sem promoção). O selo "-X%" é calculado sozinho; ou escreva um texto em `selo` (ex.: "Black Friday").
- **Nome e descrições:** `nome`, `desc` (vitrine), `descLonga` (página do produto, um texto por parágrafo) e `detalhes` (lista).
- **Banners:** substitua `banner-01.jpg` / `banner-02.jpg` (proporção recomendada ~ 1584×672). Para vídeo: coloque o .mp4 em `assets/videos/banner/` e use `tipo: "video"`, `midia: "assets/videos/banner/seu-video.mp4"` (e `poster` opcional).
- **Logomarca:** substitua `assets/images/logo/logo.png` (de preferência PNG com fundo transparente) ou altere `logo` em `config.js`.
- **Depoimentos:** edite a lista `depoimentos` (foto ou vídeo, nome, texto, nota de 1 a 5). Quando o depoimento for real, mude `exemplo` para `false` para sumir a etiqueta "Exemplo fictício".
- **Campanha de promoção:** em `config.js`, `campanha: { ativa: true, texto: "...", link: "#produtos" }` mostra uma faixa rosa no topo de todas as páginas. A faixa de 3 ofertas abaixo do banner usa a lista `promos` (vazia = escondida).
- **Site oficial:** quando for publicar de verdade, coloque `demo: false` para remover a faixa de "site de demonstração".

## Importante
- A sacola é apenas simulação local; ainda não existe finalização de compra/pagamento.
- Os caminhos dos arquivos diferenciam o nome exato (maiúsculas/minúsculas, sem acentos nem espaços é o mais seguro).
