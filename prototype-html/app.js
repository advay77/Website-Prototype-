// Shared chrome + interactions for the DISCOVER prototype.
const SUMMIT_DATE = new Date("2027-09-21T08:30:00-04:00"); // placeholder until DISCOVER confirms

const NAV = [
  ["professionals.html", "For Professionals", "pro"],
  ["sponsors.html", "For Companies", "co"],
  ["summit.html", "Summit 2027", "summit"],
  ["about.html", "About", "about"],
];

const page = document.body.dataset.page;

document.body.insertAdjacentHTML(
  "afterbegin",
  `<div class="announce"><b>DISCOVER Summit 2027</b> · 11th annual · September 2027, New Jersey · Early-bird passes open<a href="summit.html#tickets">Get your pass</a></div>
  <header class="site"><div class="wrap">
    <a class="logo" href="index.html" aria-label="DISCOVER home"><img src="assets/img/discover-logo.png" alt="DISCOVER Supply Chain"></a>
    <nav class="main">${NAV.map(([h, t, k]) => `<a href="${h}" class="${k === page ? "active" : ""}">${t}</a>`).join("")}<a class="btn btn-primary nav-cta" href="summit.html#tickets">Get Summit pass →</a></nav>
    <div class="head-cta"><a class="login" href="#">Member login</a><a class="btn btn-primary" href="summit.html#tickets">Get Summit pass <span class="arr">→</span></a>
    <button class="burger" aria-label="Menu"><span></span><span></span><span></span></button></div>
  </div></header>`
);

document.body.insertAdjacentHTML(
  "beforeend",
  `<footer class="site"><div class="wrap">
    <div class="top">
      <div><span class="logo-box"><img src="assets/img/discover-logo.png" alt="DISCOVER"></span>
        <p style="margin-top:22px;max-width:320px">A not-for-profit, cross-industry network building the next generation of supply chain leaders. Since 2017.</p></div>
      <div><h5>For professionals</h5><ul><li><a href="professionals.html">Membership</a></li><li><a href="professionals.html#chats">Career Development Chats</a></li><li><a href="professionals.html#employer">Get your employer to pay</a></li><li><a href="summit.html">Summit 2027</a></li></ul></div>
      <div><h5>For companies</h5><ul><li><a href="sponsors.html">Why sponsor</a></li><li><a href="sponsors.html#tiers">Sponsorship tiers</a></li><li><a href="sponsors.html#prospectus">Download prospectus</a></li><li><a href="sponsors.html#host">Host the Summit</a></li></ul></div>
      <div><h5>DISCOVER</h5><ul><li><a href="about.html">Our story</a></li><li><a href="about.html#leaders">Leadership</a></li><li><a href="mailto:info@discover-org.us">info@discover-org.us</a></li><li>800-380-1408</li></ul></div>
    </div>
    <div class="bot"><span>© ${new Date().getFullYear()} DISCOVER Supply Chain · A not-for-profit organization</span><span>Privacy · Terms · Accessibility</span></div>
  </div></footer>`
);

document.querySelector(".burger")?.addEventListener("click", () => document.querySelector("header.site").classList.toggle("open"));

// Route-network background: nodes joined by dashed, flowing routes.
function drawNetwork(el, seed = 7, density = 22) {
  let s = seed;
  const rnd = () => ((s = (s * 9301 + 49297) % 233280) / 233280);
  const W = 1440, H = 800, pts = [];
  for (let i = 0; i < density; i++) pts.push([rnd() * W, rnd() * H]);
  let lines = "", dots = "";
  pts.forEach((p, i) => {
    const near = pts.map((q, j) => [Math.hypot(p[0] - q[0], p[1] - q[1]), j]).sort((a, b) => a[0] - b[0]).slice(1, 3);
    near.forEach(([, j]) => {
      if (j < i) return;
      const q = pts[j], mx = (p[0] + q[0]) / 2, my = (p[1] + q[1]) / 2 - 60;
      lines += `<path d="M${p[0]},${p[1]} Q${mx},${my} ${q[0]},${q[1]}" />`;
    });
    dots += `<circle cx="${p[0]}" cy="${p[1]}" r="${i % 5 === 0 ? 5 : 3}" />`;
  });
  el.innerHTML = `<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice" width="100%" height="100%">
    <defs><radialGradient id="glow${seed}"><stop offset="0" stop-color="#0a72ba" stop-opacity=".55"/><stop offset="1" stop-color="#0a72ba" stop-opacity="0"/></radialGradient></defs>
    <circle cx="${W * 0.78}" cy="${H * 0.3}" r="520" fill="url(#glow${seed})"/>
    <g fill="none" stroke="#5cb8f0" stroke-opacity=".38" stroke-width="1.2" stroke-dasharray="5 8" class="flow">${lines}</g>
    <g fill="#5cb8f0">${dots}</g></svg>`;
}
document.querySelectorAll("[data-net]").forEach((el, i) => drawNetwork(el, +el.dataset.net || i + 3));
const style = document.createElement("style");
style.textContent = `.flow{animation:flow 2.6s linear infinite}@keyframes flow{to{stroke-dashoffset:-26}}`;
document.head.appendChild(style);

// Countdown to the Summit.
function tick() {
  const d = Math.max(0, SUMMIT_DATE - Date.now());
  const v = { days: Math.floor(d / 864e5), hrs: Math.floor(d / 36e5) % 24, min: Math.floor(d / 6e4) % 60, sec: Math.floor(d / 1e3) % 60 };
  document.querySelectorAll("[data-count]").forEach((el) => (el.textContent = String(v[el.dataset.count]).padStart(2, "0")));
}
tick();
setInterval(tick, 1000);

// Demo forms: no data leaves the page.
document.querySelectorAll("form[data-demo]").forEach((f) =>
  f.addEventListener("submit", (e) => {
    e.preventDefault();
    const ok = f.querySelector(".form-ok") || f.parentElement.querySelector(".form-ok");
    if (ok) ok.style.display = "block";
    f.reset();
  })
);

// Scroll reveal (screenshots pass ?static to skip it).
if (location.search.includes("static")) document.querySelectorAll(".reveal").forEach((el) => el.classList.add("in"));
else {
  const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && (e.target.classList.add("in"), io.unobserve(e.target))), { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
}

// Logo marquee: duplicate the track for a seamless loop.
document.querySelectorAll(".marquee .track").forEach((t) => (t.innerHTML += t.innerHTML));

// On phones the tier table becomes one card per tier, built from the same table.
document.querySelectorAll(".tiers").forEach((table) => {
  const heads = [...table.querySelectorAll("thead th")].slice(1);
  const rows = [...table.querySelectorAll("tbody tr")];
  const benefits = rows.filter((r) => r.cells[0].textContent.trim());
  const ctas = rows.find((r) => !r.cells[0].textContent.trim());
  const cards = heads.map((th, i) => {
    const items = benefits
      .map((r) => [r.cells[0].textContent.trim(), r.cells[i + 1].textContent.trim()])
      .filter(([, v]) => v && v !== "—")
      .map(([k, v]) => `<li><span>${v === "✓" ? k : `${k}: <b>${v}</b>`}</span></li>`).join("");
    const cta = ctas?.cells[i + 1]?.innerHTML || "";
    return `<div class="tier-card${th.classList.contains("host") ? " host" : ""}"><span class="nm">${th.querySelector(".nm").textContent}</span><span class="pr">${th.querySelector(".pr").textContent}</span><ul>${items}</ul>${cta}</div>`;
  });
  table.closest(".tiers-wrap").insertAdjacentHTML("afterend", `<div class="tier-cards">${cards.join("")}</div>`);
});
