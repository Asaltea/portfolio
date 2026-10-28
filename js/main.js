/* ==========================================================================
   Logique du site. Normalement, pas besoin de modifier ce fichier :
   tout le contenu se trouve dans js/data.js.
   ========================================================================== */
(function () {
  "use strict";

  const $ = (sel, root = document) => root.querySelector(sel);
  const esc = (s = "") =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /* ---------- Profil ---------- */
  $("[data-prenom]").textContent = PROFIL.prenom;
  $("[data-titre]").textContent = PROFIL.titre;
  $("[data-accroche]").textContent = PROFIL.accroche;
  $("[data-stage]").textContent = PROFIL.stage;
  $("[data-nom]").textContent = PROFIL.nomComplet;
  $("[data-annee]").textContent = new Date().getFullYear();
  if (PROFIL.cv) {
    const cv = $("[data-cv]");
    cv.href = PROFIL.cv;
    cv.setAttribute("download", "");
    cv.hidden = false;
  }

  /* ---------- Compétences ---------- */
  const skillGroup = (g, cls) => `
    <div class="skill-group ${cls}">
      <h3>${esc(g.titre)}</h3>
      <p class="note">${esc(g.note)}</p>
      <ul class="chips">${g.items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>
    </div>`;
  $("[data-competences]").innerHTML =
    skillGroup(COMPETENCES.informatique, "info") + skillGroup(COMPETENCES.transferables, "com");

  /* ---------- Projets ---------- */
  const ordreCat = Object.keys(CATEGORIES);
  const projets = PROJETS.slice().sort(
    (a, b) => ordreCat.indexOf(a.categorie) - ordreCat.indexOf(b.categorie)
  );
  const grid = $("[data-grid]");
  const filtersEl = $("[data-filters]");
  const countEl = $("[data-count]");
  let filtreActif = "tous";

  const codeVignette = `<pre><span class="k">const</span> projet = {
  titre: <span class="s">"${"Ce portfolio"}"</span>,
  stack: [<span class="s">"HTML"</span>, <span class="s">"CSS"</span>, <span class="s">"JS"</span>],
};</pre>`;

  function carte(p) {
    const media = p.image
      ? `<div class="card-media"><img src="${esc(p.image)}" alt="" loading="lazy"></div>`
      : `<div class="card-media code" aria-hidden="true">${p.id === "portfolio" ? codeVignette : `<pre><span class="k">// </span>${esc(p.titre)}</pre>`}</div>`;
    const ctx = [p.contexte, p.annee].filter(Boolean).join(", ");
    return `
      <li>
        <article class="card ${p.categorie === "dev" ? "is-dev" : ""}">
          <button class="card-open" data-open="${esc(p.id)}" aria-haspopup="dialog">
            ${media}
            <div class="card-body">
              ${ctx ? `<p class="card-ctx">${esc(ctx)}</p>` : ""}
              <h3 class="card-title">${esc(p.titre)}</h3>
              <p class="card-resume">${esc(p.resume)}</p>
              <ul class="tags">${(p.tags || []).map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
            </div>
          </button>
        </article>
      </li>`;
  }

  const emplacementLibre = `
    <li>
      <div class="card-empty">
        <strong>Prochain projet web</strong>
        <span>Cet emplacement accueillera mes prochains projets de développement réalisés au CNAM.</span>
      </div>
    </li>`;

  function rendreFiltres() {
    const compte = (cat) => (cat === "tous" ? projets.length : projets.filter((p) => p.categorie === cat).length);
    const onglets = [["tous", "Tous les projets"], ...Object.entries(CATEGORIES)];
    filtersEl.innerHTML = onglets
      .map(
        ([cle, label]) => `
        <button class="filter ${cle}" role="tab" data-filter="${cle}"
          aria-selected="${cle === filtreActif}" aria-controls="grille-projets">
          ${esc(label)} <span class="n">${compte(cle)}</span>
        </button>`
      )
      .join("");
  }

  function rendreGrille() {
    grid.id = "grille-projets";
    let html = "";
    if (filtreActif === "tous") {
      ordreCat.forEach((cat) => {
        const liste = projets.filter((p) => p.categorie === cat);
        if (!liste.length && cat !== "dev") return;
        html += `<li class="cat-heading" role="presentation">${esc(CATEGORIES[cat])}</li>`;
        html += liste.map(carte).join("");
        if (cat === "dev") html += emplacementLibre;
      });
      countEl.textContent = `${projets.length} projets`;
    } else {
      const liste = projets.filter((p) => p.categorie === filtreActif);
      html = liste.map(carte).join("");
      if (filtreActif === "dev") html += emplacementLibre;
      countEl.textContent = `${liste.length} projet${liste.length > 1 ? "s" : ""}`;
    }
    grid.innerHTML = html;
  }

  filtersEl.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-filter]");
    if (!btn) return;
    filtreActif = btn.dataset.filter;
    filtersEl.querySelectorAll("[data-filter]").forEach((b) =>
      b.setAttribute("aria-selected", String(b.dataset.filter === filtreActif))
    );
    rendreGrille();
    history.replaceState(null, "", filtreActif === "tous" ? "#projets" : `#${filtreActif}`);
  });

  // Navigation au clavier entre les onglets (flèches gauche/droite)
  filtersEl.addEventListener("keydown", (e) => {
    if (!["ArrowLeft", "ArrowRight"].includes(e.key)) return;
    const tabs = [...filtersEl.querySelectorAll("[data-filter]")];
    const i = tabs.indexOf(document.activeElement);
    if (i < 0) return;
    const next = tabs[(i + (e.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length];
    next.focus();
    next.click();
  });

  /* ---------- Fiche projet ---------- */
  const modal = $("[data-modal]");
  const modalBody = $("[data-modal-body]");
  let declencheur = null;

  function ouvrir(id) {
    const p = PROJETS.find((x) => x.id === id);
    if (!p) return;
    const images = p.galerie && p.galerie.length ? p.galerie : p.image ? [p.image] : [];
    const ctx = [CATEGORIES[p.categorie], p.contexte, p.annee].filter(Boolean).join(", ");
    modalBody.innerHTML = `
      <h2 id="modal-titre">${esc(p.titre)}</h2>
      <p class="card-ctx">${esc(ctx)}</p>
      ${images.length ? `
        <div class="modal-main"><img src="${esc(images[0])}" alt="Visuel du projet ${esc(p.titre)}" data-main></div>
        ${images.length > 1 ? `<div class="thumbs">${images
          .map((src, i) => `<button data-thumb="${esc(src)}" aria-current="${i === 0}" aria-label="Visuel ${i + 1} sur ${images.length}"><img src="${esc(src)}" alt=""></button>`)
          .join("")}</div>` : ""}` : ""}
      <div class="modal-cols">
        <div>
          <h3>Le projet</h3>
          <p>${esc(p.description || p.resume)}</p>
          ${p.apprentissages ? `<h3>Ce que j’en retiens</h3><p>${esc(p.apprentissages)}</p>` : ""}
        </div>
        <div>
          <h3>Outils et compétences</h3>
          <ul class="tags">${(p.tags || []).map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
          ${p.liens && p.liens.length ? `<h3 style="margin-top:1.25rem">Liens</h3><div class="modal-links">${p.liens
            .map((l) => `<a href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)}</a>`)
            .join("")}</div>` : ""}
        </div>
      </div>`;
    if (typeof modal.showModal === "function") modal.showModal();
    else modal.setAttribute("open", "");
    $("[data-close]").focus();
  }

  grid.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-open]");
    if (!btn) return;
    declencheur = btn;
    ouvrir(btn.dataset.open);
  });

  modalBody.addEventListener("click", (e) => {
    const t = e.target.closest("[data-thumb]");
    if (!t) return;
    $("[data-main]", modalBody).src = t.dataset.thumb;
    modalBody.querySelectorAll("[data-thumb]").forEach((b) => b.setAttribute("aria-current", String(b === t)));
  });

  const fermer = () => modal.close ? modal.close() : modal.removeAttribute("open");
  $("[data-close]").addEventListener("click", fermer);
  modal.addEventListener("click", (e) => { if (e.target === modal) fermer(); });
  modal.addEventListener("close", () => { if (declencheur) declencheur.focus(); });

  /* ---------- Parcours (frise façon git) ---------- */
  const iDepart = PARCOURS.findIndex((e) => e.depart);
  $("[data-parcours]").innerHTML = PARCOURS.map((e, i) => {
    const estCom = e.branche === "com";
    // Ligne communication : présente du premier au dernier élément (les acquis restent)
    const comCls = ["lane", "com", "on", i === 0 ? "from-mid" : "", i === PARCOURS.length - 1 ? "to-mid" : ""].join(" ");
    // Ligne informatique : démarre à la réorientation
    let infoCls = "lane info";
    if (iDepart >= 0 && i >= iDepart) {
      infoCls += " on";
      if (i === iDepart) infoCls += " from-mid fork";
      if (i === PARCOURS.length - 1) infoCls += " to-mid";
    }
    const node = (cls = "") => `<span class="node ${cls}"></span>`;
    const ref = estCom
      ? `<span class="ref com">communication</span>`
      : e.courant
      ? `<span class="ref head">HEAD → informatique</span>`
      : `<span class="ref info">informatique</span>`;
    return `
      <li class="commit">
        <span class="${comCls}" aria-hidden="true">${estCom ? node() : ""}</span>
        <span class="${infoCls}" aria-hidden="true">${!estCom ? node(e.courant ? "head" : "") : ""}</span>
        <div class="commit-body">
          <p class="commit-title">${esc(e.titre)} ${ref}</p>
          <p class="commit-detail">${esc(e.detail)}</p>
        </div>
      </li>`;
  }).join("");

  /* ---------- Contact ---------- */
  const liens = [];
  if (PROFIL.email) liens.push(`<li><a href="mailto:${esc(PROFIL.email)}">E-mail <span class="mono">${esc(PROFIL.email)}</span></a></li>`);
  if (PROFIL.linkedin) liens.push(`<li><a href="${esc(PROFIL.linkedin)}" target="_blank" rel="noopener">LinkedIn</a></li>`);
  if (PROFIL.github) liens.push(`<li><a href="${esc(PROFIL.github)}" target="_blank" rel="noopener">GitHub</a></li>`);
  if (PROFIL.cv) liens.push(`<li><a href="${esc(PROFIL.cv)}" download>Mon CV (PDF)</a></li>`);
  $("[data-contact]").innerHTML = liens.length
    ? liens.join("")
    : `<li class="contact-missing">Ajoute ton e-mail, LinkedIn et GitHub dans js/data.js pour les afficher ici.</li>`;

  /* ---------- Menu mobile ---------- */
  const toggle = $(".nav-toggle");
  const links = $("#nav-links");
  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  links.addEventListener("click", (e) => {
    if (e.target.closest("a")) { links.classList.remove("open"); toggle.setAttribute("aria-expanded", "false"); }
  });

  /* ---------- Lien de section actif dans le menu ---------- */
  const sections = ["profil", "projets", "parcours", "contact"].map((id) => document.getElementById(id));
  if ("IntersectionObserver" in window) {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((en) => {
        if (!en.isIntersecting) return;
        links.querySelectorAll("a").forEach((a) =>
          a.setAttribute("aria-current", String(a.getAttribute("href") === `#${en.target.id}`))
        );
      }),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => s && obs.observe(s));
  }

  /* ---------- Démarrage ---------- */
  const depuisUrl = location.hash.slice(1);
  if (CATEGORIES[depuisUrl]) {
    filtreActif = depuisUrl;
    setTimeout(() => document.getElementById("projets").scrollIntoView(), 0);
  }
  rendreFiltres();
  rendreGrille();
})();
