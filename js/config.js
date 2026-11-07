/* =====================================================================
   CONFIGURAÇÃO DA LOJA PERSONAL DIVAS
   Este é o ÚNICO arquivo que você precisa editar para trocar textos,
   preços, fotos, vídeos, banners, logomarca, depoimentos e promoções.
   As mídias ficam dentro da pasta "assets" (veja o LEIA-ME.md).
   ===================================================================== */
const SITE = {
  nome: "Personal Divas",
  logo: "assets/images/logo/logo.png",   // troque o arquivo (ou o caminho) para mudar a logomarca
  intro: "Cintas modeladoras pensadas para conforto e para valorizar diferentes corpos.",

  // true = mostra a faixa "site de demonstração" no topo. Use false quando o site for oficial.
  demo: true,

  // ---------------- CAMPANHA DE PROMOÇÃO (faixa no topo do site) ----------------
  // Para ligar uma campanha: ativa: true e escreva o texto. Para desligar: ativa: false.
  campanha: {
    ativa: false,
    texto: "Campanha: [escreva aqui a promoção. Ex.: Frete grátis acima de R$ 199]",
    link: "#produtos"          // para onde a faixa leva ao clicar ("" = sem link)
  },

  // ---------------- BANNERS (carrossel no topo) ----------------
  // tipo: "imagem" ou "video".
  //  - imagem: midia = caminho da imagem (pasta assets/images/banner)
  //  - video : midia = caminho do .mp4 (pasta assets/videos/banner), poster = imagem de capa (opcional)
  // Os banners atuais já têm texto dentro da arte, então titulo/texto/botao ficam vazios.
  // Se preencher "titulo", o texto é escrito por cima da imagem.
  banner: [
    { tipo: "imagem", midia: "assets/images/banner/banner-01.jpg",
      alt: "Banner Personal Divas: silhueta impecável com conforto total",
      titulo: "", texto: "", botao: "", link: "#produtos" },
    { tipo: "imagem", midia: "assets/images/banner/banner-02.jpg",
      alt: "Banner Personal Divas: cinta ampulheta premium",
      titulo: "", texto: "", botao: "", link: "#produtos" }
  ],

  // ---------------- FAIXA DE 3 PROMOÇÕES (abaixo do banner) ----------------
  // Deixe a lista vazia [] para esconder a faixa. Exemplo (copie e preencha):
  // { tag: "Oferta", titulo: "Leve 2 pague 1", texto: "Válido até 30/11", img: "assets/images/banner/promo-01.jpg", link: "#produtos" }
  promos: [],

  // ---------------- CORES E TAMANHOS ----------------
  cores: [
    { id: "cor-1", rotulo: "Bege",  hex: "#d8b9a5" },
    { id: "cor-2", rotulo: "Preto", hex: "#2b1e24" }
  ],
  tamanhos: [
    { id: "tam-1", rotulo: "P"  }, { id: "tam-2", rotulo: "M"  },
    { id: "tam-3", rotulo: "G"  }, { id: "tam-4", rotulo: "GG" },
    { id: "tam-5", rotulo: "XG" }, { id: "tam-6", rotulo: "XGG" }
  ],

  // ---------------- PRODUTOS ----------------
  // preco = preço normal | promo = preço promocional (null = sem promoção)
  // selo  = texto do selo na foto (ex.: "Black Friday"). Se vazio, aparece "-X%" quando houver promo.
  // fotos = lista de fotos (a 1ª aparece na vitrine; todas aparecem na página do produto)
  // desc  = descrição curta (vitrine) | descLonga = parágrafos da página do produto
  // detalhes = lista de itens (material, composição, cuidados...) | indisponivel = ids esgotados
  produtos: [
    { id: "p1", nome: "Produto 01", preco: 129.9, promo: 99.9, selo: "", indisponivel: [],
      fotos: ["assets/images/products/produto-01/foto-1.jpg", "assets/images/products/produto-01/foto-2.jpg", "assets/images/products/produto-01/foto-3.jpg"],
      desc: "Descrição curta do produto 01.",
      descLonga: ["Descrição completa do produto 01. Escreva aqui como ele veste, para quem é indicado e seus diferenciais.", "Você pode usar vários parágrafos."],
      detalhes: ["Material: [preencher]", "Composição: [preencher]", "Cuidados: [preencher]"] },
    { id: "p2", nome: "Produto 02", preco: 149.9, promo: null, selo: "", indisponivel: ["tam-6"],
      fotos: ["assets/images/products/produto-02/foto-1.jpg", "assets/images/products/produto-02/foto-2.jpg", "assets/images/products/produto-02/foto-3.jpg"],
      desc: "Descrição curta do produto 02.",
      descLonga: ["Descrição completa do produto 02."],
      detalhes: ["Material: [preencher]", "Composição: [preencher]", "Cuidados: [preencher]"] },
    { id: "p3", nome: "Produto 03", preco: 119.9, promo: 89.9, selo: "", indisponivel: ["cor-2"],
      fotos: ["assets/images/products/produto-03/foto-1.jpg", "assets/images/products/produto-03/foto-2.jpg", "assets/images/products/produto-03/foto-3.jpg"],
      desc: "Descrição curta do produto 03.",
      descLonga: ["Descrição completa do produto 03."],
      detalhes: ["Material: [preencher]", "Composição: [preencher]", "Cuidados: [preencher]"] },
    { id: "p4", nome: "Produto 04", preco: 159.9, promo: null, selo: "", indisponivel: [],
      fotos: ["assets/images/products/produto-04/foto-1.jpg", "assets/images/products/produto-04/foto-2.jpg", "assets/images/products/produto-04/foto-3.jpg"],
      desc: "Descrição curta do produto 04.",
      descLonga: ["Descrição completa do produto 04."],
      detalhes: ["Material: [preencher]", "Composição: [preencher]", "Cuidados: [preencher]"] },
    { id: "p5", nome: "Produto 05", preco: 139.9, promo: 109.9, selo: "", indisponivel: ["tam-1"],
      fotos: ["assets/images/products/produto-05/foto-1.jpg", "assets/images/products/produto-05/foto-2.jpg", "assets/images/products/produto-05/foto-3.jpg"],
      desc: "Descrição curta do produto 05.",
      descLonga: ["Descrição completa do produto 05."],
      detalhes: ["Material: [preencher]", "Composição: [preencher]", "Cuidados: [preencher]"] },
    { id: "p6", nome: "Produto 06", preco: 169.9, promo: null, selo: "", indisponivel: [],
      fotos: ["assets/images/products/produto-06/foto-1.jpg", "assets/images/products/produto-06/foto-2.jpg", "assets/images/products/produto-06/foto-3.jpg"],
      desc: "Descrição curta do produto 06.",
      descLonga: ["Descrição completa do produto 06."],
      detalhes: ["Material: [preencher]", "Composição: [preencher]", "Cuidados: [preencher]"] }
  ],

  // ---------------- DEPOIMENTOS ----------------
  // tipo: "foto" ou "video". Em vídeo: midia = .mp4 (assets/videos/testimonials), poster = imagem de capa.
  // exemplo: true mostra a etiqueta "Exemplo fictício". Troque para false quando o depoimento for real.
  depoimentosIntro: "Veja o que nossas clientes dizem.",
  depoimentos: [
    { tipo: "foto", midia: "assets/images/testimonials/cliente-01.jpg", alt: "Foto da cliente 1",
      nome: "Nome da cliente 1", texto: "Escreva aqui o depoimento real da cliente.", nota: 5, exemplo: true },
    { tipo: "video", midia: "assets/videos/testimonials/depoimento-02.mp4", poster: "assets/images/testimonials/cliente-02.jpg",
      alt: "Vídeo da cliente 2", legenda: "",
      nome: "Nome da cliente 2", texto: "Escreva aqui o depoimento real da cliente.", nota: null, exemplo: true },
    { tipo: "foto", midia: "assets/images/testimonials/cliente-03.jpg", alt: "Foto da cliente 3",
      nome: "Nome da cliente 3", texto: "Escreva aqui o depoimento real da cliente.", nota: 5, exemplo: true }
  ],

  beneficios: [
    { titulo: "Formas de pagamento", texto: "[Preencher: formas de pagamento aceitas]" },
    { titulo: "Envio", texto: "[Preencher: regras e prazos de envio]" },
    { titulo: "Trocas e devoluções", texto: "[Preencher: política de trocas]" },
    { titulo: "Atendimento", texto: "[Preencher: canais e horário de suporte]" }
  ],

  // WhatsApp da loja (número só com dígitos, com DDI 55 + DDD).
  whatsapp: { numero: "5562999248417", texto: "+55 (62) 9 99248417", mensagem: "Olá! Vim pelo site e gostaria de mais informações." },
  // Cole o link completo do perfil. Ex.: "https://www.instagram.com/SEU_USUARIO"
  redes: { instagram: "#", tiktok: "#" },

  rodape: {
    colunas: [
      { titulo: "Contato", links: [["E-mail: [preencher]", "#"], ["WhatsApp: +55 (62) 9 99248417", "https://wa.me/5562999248417"]] },
      { titulo: "Redes sociais", links: [["Instagram", "#"], ["TikTok", "#"], ["WhatsApp", "https://wa.me/5562999248417"]] },
      { titulo: "Ajuda", links: [["Dúvidas frequentes", "#"], ["Política de privacidade", "#"], ["Trocas e devoluções", "#"], ["Termos de uso", "#"]] }
    ],
    empresa: "[Preencher: razão social, CNPJ e endereço]",
    direitos: "© 2026 Personal Divas. Todos os direitos reservados."
  }
};
