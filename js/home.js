/* Página inicial: banners, promoções, vitrine de produtos e depoimentos. */
(function () {
  const { $, esc, img, preco, selo, compraHTML, bindCompra } = Loja;

  /* Banners (imagem ou vídeo) */
  const slides = SITE.banner; let cur = 0;
  const midia = (s, i) => s.tipo === "video"
    ? `<video muted loop playsinline preload="${i ? "none" : "auto"}" ${s.poster ? `poster="${esc(s.poster)}"` : ""} aria-label="${esc(s.alt)}"><source src="${esc(s.midia)}" type="video/mp4"></video>`
    : img(s.midia, s.alt, "Banner", i > 0);
  $("#heroSlides").innerHTML = slides.map((s, i) => {
    const txt = !!s.titulo;
    return `<div class="slide ${txt ? "" : "pure"}" ${i ? "hidden" : ""} role="group" aria-roledescription="slide" aria-label="${i + 1} de ${slides.length}">
      ${midia(s, i)}
      ${txt ? `<div class="hero-txt"><h1>${esc(s.titulo)}</h1><p>${esc(s.texto)}</p>${s.botao ? `<a class="btn" href="${esc(s.link)}">${esc(s.botao)}</a>` : ""}</div>`
            : (s.link ? `<a class="slide-link" href="${esc(s.link)}" aria-label="${esc(s.alt)}"></a>` : "")}
    </div>`;
  }).join("");
  $("#dots").innerHTML = slides.map((_, i) => `<button class="dot" aria-label="Ir para o slide ${i + 1}"></button>`).join("");
  const show = i => {
    cur = (i + slides.length) % slides.length;
    document.querySelectorAll(".slide").forEach((el, k) => {
      el.hidden = k !== cur;
      const v = el.querySelector("video");
      if (v) { if (k === cur) v.play().catch(() => {}); else v.pause(); }
    });
    document.querySelectorAll(".dot").forEach((d, k) => d.setAttribute("aria-current", k === cur));
  };
  if (slides.length < 2) $("#heroCtl").hidden = true;
  $("#prevSlide").onclick = () => show(cur - 1); $("#nextSlide").onclick = () => show(cur + 1);
  document.querySelectorAll(".dot").forEach((d, k) => d.onclick = () => show(k));
  show(0);

  /* Faixa de promoções (some se a lista estiver vazia) */
  const pr = $("#promos");
  if (!SITE.promos.length) pr.hidden = true;
  else pr.innerHTML = SITE.promos.map(p => `<a class="promo" href="${esc(p.link)}">
    <div><small>${esc(p.tag)}</small><strong>${esc(p.titulo)}</strong><span>${esc(p.texto)}</span></div>
    ${p.img ? img(p.img, "", "Promoção") : ""}</a>`).join("");

  /* Produtos */
  $("#prodLead").textContent = SITE.intro;
  const grid = $("#productGrid");
  grid.innerHTML = SITE.produtos.map(p => {
    const url = "produto.html?id=" + encodeURIComponent(p.id);
    return `<article class="card" data-id="${p.id}">
      <a class="zoom" href="${url}" tabindex="-1" aria-hidden="true">${img(p.fotos[0], p.nome, "Foto do " + p.nome)}${selo(p)}</a>
      <div class="card-b">
        <h3><a href="${url}">${esc(p.nome)}</a></h3>
        <p class="desc"><a href="${url}">${esc(p.desc)}</a></p>
        <p class="price">${preco(p)}</p>
        <a class="ver" href="${url}">Ver fotos e descrição completa →</a>
        <div class="compra">${compraHTML(p)}</div>
      </div></article>`;
  }).join("");
  grid.querySelectorAll(".card").forEach(c => bindCompra($(".compra", c), SITE.produtos.find(x => x.id === c.dataset.id)));

  /* Busca */
  const si = $("#searchInput");
  si.addEventListener("input", () => {
    const t = si.value.trim().toLowerCase(); let n = 0;
    document.querySelectorAll(".card").forEach(c => {
      const p = SITE.produtos.find(x => x.id === c.dataset.id);
      const ok = !t || (p.nome + " " + p.desc).toLowerCase().includes(t); c.hidden = !ok; n += ok;
    });
    $("#searchStatus").textContent = n + " produto(s) encontrado(s).";
  });
  const q = new URLSearchParams(location.search).get("q");
  if (q) { si.value = q; si.dispatchEvent(new Event("input")); }

  /* Depoimentos */
  $("#depLead").textContent = SITE.depoimentosIntro;
  const stars = n => n ? `<p class="stars" aria-label="Avaliação: ${n} de 5">${"★".repeat(n)}${"☆".repeat(5 - n)}</p>` : "";
  $("#testGrid").innerHTML = SITE.depoimentos.map(d => `
    <figure class="tcard">
      ${d.tipo === "video"
        ? `<video controls preload="none" playsinline poster="${esc(d.poster || "")}" aria-label="${esc(d.alt)}"><source src="${esc(d.midia)}" type="video/mp4">${d.legenda ? `<track kind="captions" src="${esc(d.legenda)}" srclang="pt-BR" label="Português" default>` : ""}Seu navegador não reproduz vídeo.</video>`
        : img(d.midia, d.alt, "Foto da cliente")}
      <figcaption>${d.exemplo ? `<span class="tag">Exemplo fictício</span>` : ""}${stars(d.nota)}<blockquote>${esc(d.texto)}</blockquote><cite>${esc(d.nome)}</cite></figcaption>
    </figure>`).join("");
  document.querySelectorAll("#testGrid video").forEach(v => {
    const fail = () => { if (!v.isConnected) return; const f = document.createElement("div"); f.className = "vph"; f.textContent = "Vídeo indisponível"; v.replaceWith(f); };
    v.querySelector("source").addEventListener("error", fail); v.addEventListener("error", fail);
  });

  /* Benefícios */
  $("#benGrid").innerHTML = SITE.beneficios.map(b => `<div class="ben"><h3>${esc(b.titulo)}</h3><p>${esc(b.texto)}</p></div>`).join("");
})();
