/* Página do produto: galeria de fotos com zoom, descrição completa e compra. */
(function () {
  const { $, esc, img, preco, selo, compraHTML, bindCompra, wa } = Loja;
  const id = new URLSearchParams(location.search).get("id");
  const p = SITE.produtos.find(x => x.id === id);
  const box = $("#produtoBox");
  if (!p) {
    box.innerHTML = `<p style="padding:3rem 0;text-align:center">Produto não encontrado. <a href="index.html#produtos">Voltar aos produtos</a></p>`;
    return;
  }
  document.title = p.nome + " — " + SITE.nome;
  const fotos = p.fotos.length ? p.fotos : [""];
  box.innerHTML = `
    <nav class="crumb" aria-label="Você está em"><a href="index.html">Início</a> › <a href="index.html#produtos">Produtos</a> › ${esc(p.nome)}</nav>
    <div class="pp-grid">
      <div class="gal">
        <div class="gal-main" id="galMain">${img(fotos[0], p.nome, "Foto do " + p.nome, false)}${selo(p)}</div>
        <div class="thumbs" role="group" aria-label="Fotos do produto">
          ${fotos.map((f, i) => `<button type="button" class="thumb" aria-pressed="${i === 0}" aria-label="Ver foto ${i + 1}" data-i="${i}">${img(f, "", "Foto " + (i + 1))}</button>`).join("")}
        </div>
      </div>
      <div class="pp-info">
        <h1>${esc(p.nome)}</h1>
        <p class="price">${preco(p)}</p>
        <div class="pp-desc">${(p.descLonga && p.descLonga.length ? p.descLonga : [p.desc]).map(t => `<p>${esc(t)}</p>`).join("")}</div>
        ${p.detalhes && p.detalhes.length ? `<ul class="pp-det">${p.detalhes.map(d => `<li>${esc(d)}</li>`).join("")}</ul>` : ""}
        <div class="compra">${compraHTML(p)}</div>
        <a class="wa-link" target="_blank" rel="noopener" href="${wa}">Tirar dúvidas sobre este produto no WhatsApp</a>
      </div>
    </div>`;
  bindCompra($(".compra", box), p);

  /* Galeria: trocar foto + zoom que acompanha o cursor */
  const main = $("#galMain"), mimg = $("img", main);
  box.querySelectorAll(".thumb").forEach(b => b.onclick = () => {
    const src = $("img", b).src;
    mimg.dataset.fb = ""; mimg.src = src;
    box.querySelectorAll(".thumb").forEach(x => x.setAttribute("aria-pressed", x === b));
  });
  main.addEventListener("mouseenter", () => main.classList.add("zooming"));
  main.addEventListener("mouseleave", () => { main.classList.remove("zooming"); mimg.style.transformOrigin = "50% 50%"; });
  main.addEventListener("mousemove", e => {
    const r = main.getBoundingClientRect();
    mimg.style.transformOrigin = ((e.clientX - r.left) / r.width * 100) + "% " + ((e.clientY - r.top) / r.height * 100) + "%";
  });
})();
