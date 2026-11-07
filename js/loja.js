/* Código compartilhado entre as páginas (cabeçalho, rodapé, sacola, compra). Normalmente não precisa editar. */
const Loja = (function () {
  const $ = (s, r = document) => r.querySelector(s);
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const brl = n => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  const PH = label => "data:image/svg+xml;utf8," + encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 500"><rect width="400" height="500" fill="#efe3dc"/><text x="200" y="255" text-anchor="middle" font-family="Georgia,serif" font-size="20" fill="#7a4a55">${label}</text></svg>`);
  document.addEventListener("error", e => {
    const t = e.target;
    if (t.tagName === "IMG" && !t.dataset.fb) { t.dataset.fb = 1; t.src = PH(t.dataset.ph || "Imagem não encontrada"); }
  }, true);
  const img = (src, alt, ph, lazy = true) => `<img src="${esc(src)}" alt="${esc(alt)}" data-ph="${esc(ph)}"${lazy ? ' loading="lazy"' : ""}>`;

  const IS_HOME = document.body.dataset.home === "1";
  const base = IS_HOME ? "" : "index.html";
  const wa = "https://wa.me/" + SITE.whatsapp.numero + "?text=" + encodeURIComponent(SITE.whatsapp.mensagem);
  const preco = p => p.promo ? `<s>${brl(p.preco)}</s> <strong>${brl(p.promo)}</strong>` : `<strong>${brl(p.preco)}</strong>`;
  const selo = p => { const t = p.selo || (p.promo ? "-" + Math.round((1 - p.promo / p.preco) * 100) + "%" : ""); return t ? `<span class="selo">${esc(t)}</span>` : ""; };

  /* ---------- Estrutura comum (topo e rodapé) ---------- */
  const camp = SITE.campanha || {};
  const top = `
<a class="skip" href="#conteudo">Ir para o conteúdo</a>
${SITE.demo ? '<div class="demo-bar" role="note">Site de demonstração: preços, textos e avaliações são fictícios. A sacola é apenas uma simulação local e não processa pedidos nem pagamentos.</div>' : ""}
${camp.ativa ? `<div class="campanha" role="note">${camp.link ? `<a href="${esc(base + camp.link)}">${esc(camp.texto)}</a>` : esc(camp.texto)}</div>` : ""}
<header class="header">
  <div class="topbar"><div class="wrap topbar-in">
    <a href="#" id="accountBtn" class="toplink">Minha conta</a>
    <div class="search" id="searchBox"><label class="sr" for="searchInput">Buscar produtos</label><input id="searchInput" type="search" placeholder="Buscar produtos…"><span aria-hidden="true">🔍</span></div>
    <span class="toplink">R$ (BRL)</span>
  </div></div>
  <div class="wrap header-in">
    <button class="icon-btn menu-toggle" id="menuToggle" aria-expanded="false" aria-controls="nav" aria-label="Abrir menu">☰</button>
    <a href="${base || "#"}${base ? "" : "inicio"}" class="logo" id="logoLink"><img src="${esc(SITE.logo)}" alt="${esc(SITE.nome)}" data-ph="Logomarca"></a>
    <button class="icon-btn cart-btn" id="cartBtn" aria-label="Abrir sacola" aria-controls="cartDrawer">🛍<span class="badge" id="cartCount">0</span></button>
  </div>
  <div class="navbar"><nav id="nav" class="nav wrap" aria-label="Principal">
    <a href="${base}#inicio"${IS_HOME ? ' class="on"' : ""}>Início</a><a href="${base}#produtos">Produtos</a><a href="${base}#depoimentos">Depoimentos</a><a href="#contato">Contato</a>
  </nav></div>
</header>`;
  const bottom = `
<footer class="footer" id="contato">
  <div class="wrap fgrid" id="footGrid"></div>
  <div class="wrap copy" id="footCopy"></div>
</footer>
<div class="overlay" id="overlay" hidden></div>
<aside class="drawer" id="cartDrawer" aria-label="Sacola" aria-hidden="true" tabindex="-1">
  <div class="drawer-h"><h2>Sua sacola</h2><button class="icon-btn" id="closeCart" aria-label="Fechar sacola">✕</button></div>
  ${SITE.demo ? '<p class="notice">Sacola de demonstração: não processa pedidos nem pagamentos.</p>' : ""}
  <ul id="cartList" class="cart-list"></ul>
  <div class="drawer-f"><p class="total">Subtotal <strong id="cartTotal">R$ 0,00</strong></p>
  <button class="btn" disabled>Finalizar compra (indisponível)</button></div>
</aside>
<a class="wa-float" id="waFloat" target="_blank" rel="noopener" aria-label="Falar no WhatsApp" href="${wa}">💬 WhatsApp</a>
<div class="toast" id="toast" role="status" aria-live="polite"></div>`;
  document.body.insertAdjacentHTML("afterbegin", top);
  document.body.insertAdjacentHTML("beforeend", bottom);

  /* ---------- Rodapé ---------- */
  const f = SITE.rodape;
  $("#footGrid").innerHTML = f.colunas.map(c => `<div><h3>${esc(c.titulo)}</h3><ul>${c.links.map(l => `<li><a href="${esc(l[1])}">${esc(l[0])}</a></li>`).join("")}</ul></div>`).join("");
  document.querySelectorAll("#footGrid a").forEach(a => {
    if (a.textContent === "Instagram") a.href = SITE.redes.instagram;
    if (a.textContent === "TikTok") a.href = SITE.redes.tiktok;
    if (a.textContent.startsWith("WhatsApp")) a.href = wa;
    if (/^https?:/.test(a.href)) { a.target = "_blank"; a.rel = "noopener"; }
  });
  $("#footCopy").innerHTML = `<p>${esc(f.empresa)}</p><p>${esc(f.direitos)}</p>`;

  /* ---------- Menu, toast, conta, busca ---------- */
  let tt;
  function toast(m) { const t = $("#toast"); t.textContent = m; t.classList.add("on"); clearTimeout(tt); tt = setTimeout(() => t.classList.remove("on"), 2800); }
  const mt = $("#menuToggle"), nav = $("#nav");
  mt.onclick = () => { const o = nav.classList.toggle("open"); mt.setAttribute("aria-expanded", o); };
  nav.addEventListener("click", e => { if (e.target.tagName === "A") { nav.classList.remove("open"); mt.setAttribute("aria-expanded", false); } });
  $("#accountBtn").onclick = e => (e.preventDefault(), toast("Conta: recurso de demonstração (sem cadastro nesta versão)."));
  if (!IS_HOME) $("#searchInput").addEventListener("keydown", e => {
    if (e.key === "Enter" && e.target.value.trim()) location.href = "index.html?q=" + encodeURIComponent(e.target.value.trim()) + "#produtos";
  });

  /* ---------- Sacola (apenas local) ---------- */
  let cart = [];
  try { cart = JSON.parse(localStorage.getItem("pd-sacola") || "[]"); } catch (e) {}
  const lab = (arr, id) => (arr.find(x => x.id === id) || {}).rotulo || id;
  function addToCart(p, st) {
    const key = [p.id, st.cor, st.tam].join("|"), it = cart.find(i => i.key === key);
    if (it) it.qtd += st.qtd; else cart.push({ key, id: p.id, cor: st.cor, tam: st.tam, qtd: st.qtd });
    renderCart(); toast(p.nome + " adicionado à sacola.");
  }
  function renderCart() {
    try { localStorage.setItem("pd-sacola", JSON.stringify(cart)); } catch (e) {}
    let total = 0, count = 0;
    $("#cartList").innerHTML = cart.length ? cart.map(i => {
      const p = SITE.produtos.find(x => x.id === i.id); if (!p) return "";
      const pr = p.promo || p.preco; total += pr * i.qtd; count += i.qtd;
      return `<li><div><strong>${esc(p.nome)}</strong><br><small>${esc(lab(SITE.cores, i.cor))} · ${esc(lab(SITE.tamanhos, i.tam))} · ${i.qtd} × ${brl(pr)}</small></div>
        <button class="icon-btn" data-rm="${esc(i.key)}" aria-label="Remover ${esc(p.nome)}">✕</button></li>`;
    }).join("") : "<li class='empty'>Sua sacola está vazia.</li>";
    $("#cartTotal").textContent = brl(total); $("#cartCount").textContent = count;
  }
  $("#cartList").addEventListener("click", e => {
    const r = e.target.closest("[data-rm]"); if (r) { cart = cart.filter(i => i.key !== r.dataset.rm); renderCart(); }
  });
  const drawer = $("#cartDrawer"), ov = $("#overlay");
  const openCart = () => { drawer.classList.add("open"); drawer.setAttribute("aria-hidden", "false"); ov.hidden = false; drawer.focus(); };
  const closeCart = () => { drawer.classList.remove("open"); drawer.setAttribute("aria-hidden", "true"); ov.hidden = true; $("#cartBtn").focus(); };
  $("#cartBtn").onclick = openCart; $("#closeCart").onclick = closeCart; ov.onclick = closeCart;
  document.addEventListener("keydown", e => { if (e.key === "Escape" && drawer.classList.contains("open")) closeCart(); });
  renderCart();

  /* ---------- Bloco de compra (cor, tamanho, quantidade) usado na vitrine e na página do produto ---------- */
  function compraHTML(p) {
    const out = id => p.indisponivel.includes(id);
    return `<fieldset><legend>Cor</legend><div class="opts">${SITE.cores.map(c => `
      <label class="opt ${out(c.id) ? "off" : ""}"><input type="radio" name="cor-${p.id}" value="${c.id}" ${out(c.id) ? "disabled" : ""}>
      <span><i class="sw" style="background:${esc(c.hex)}"></i>${esc(c.rotulo)}${out(c.id) ? " (indisponível)" : ""}</span></label>`).join("")}</div></fieldset>
    <fieldset><legend>Tamanho</legend><div class="opts">${SITE.tamanhos.map(t => `
      <label class="opt ${out(t.id) ? "off" : ""}"><input type="radio" name="tam-${p.id}" value="${t.id}" ${out(t.id) ? "disabled" : ""}>
      <span>${esc(t.rotulo)}${out(t.id) ? '<em class="sr"> (indisponível)</em>' : ""}</span></label>`).join("")}</div></fieldset>
    <div class="qty"><span id="ql-${p.id}">Quantidade</span>
      <div role="group" aria-labelledby="ql-${p.id}"><button type="button" class="icon-btn" data-q="-1" aria-label="Diminuir quantidade">−</button><output aria-live="polite">1</output><button type="button" class="icon-btn" data-q="1" aria-label="Aumentar quantidade">+</button></div></div>
    <p class="err" role="alert"></p>
    <button class="btn add" type="button">Adicionar à sacola</button>`;
  }
  function bindCompra(root, p) {
    const st = { cor: null, tam: null, qtd: 1 };
    root.addEventListener("change", e => {
      if (e.target.type !== "radio") return;
      st[e.target.name.startsWith("cor") ? "cor" : "tam"] = e.target.value;
      $(".err", root).textContent = "";
    });
    root.addEventListener("click", e => {
      const q = e.target.closest("[data-q]");
      if (q) { st.qtd = Math.min(10, Math.max(1, st.qtd + +q.dataset.q)); $("output", root).textContent = st.qtd; return; }
      const b = e.target.closest(".add"); if (!b) return;
      if (!st.cor || !st.tam) { $(".err", root).textContent = "Escolha cor e tamanho."; return; }
      addToCart(p, st); b.classList.add("added"); b.textContent = "✓ Adicionado";
      setTimeout(() => { b.classList.remove("added"); b.textContent = "Adicionar à sacola"; }, 1800);
    });
  }

  return { $, esc, brl, img, PH, preco, selo, compraHTML, bindCompra, toast, wa };
})();
