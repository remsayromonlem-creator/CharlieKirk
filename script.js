const articles = [
  {
    id: "lebron",
    title: "LeBron James Defies Time Again",
    category: "sport",
    image: "https://placehold.co/800x400/d32f2f/FFF?text=Lebron",
    excerpt: "The King dominates once more in year 21.",
    content: "LeBron James continues to silence critics with another dominant performance...",
    trending: true
  },
  {
    id: "dunks",
    title: "The Season's Best Dunks",
    category: "sport",
    image: "https://placehold.co/800x400/d32f2f/FFF?text=Dunks",
    excerpt: "High-flying moments shaking the league.",
    content: "This season has delivered some of the most jaw-dropping dunks...",
    trending: false
  },
  {
    id: "redcarpet",
    title: "Red Carpet Fashion Chaos",
    category: "ent",
    image: "https://placehold.co/800x400/7b1fa2/FFF?text=Fashion",
    excerpt: "Celebrities push fashion limits again.",
    content: "Fashion critics were stunned after last night’s event...",
    trending: true
  }
];

function render(containerId, filterFn) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = "";

  articles.filter(filterFn).forEach(a => {
    container.innerHTML += `
      <div class="card" onclick="openArticle('${a.id}')">
        <img src="${a.image}">
        <div class="card-body">
          <span class="tag ${a.category}">${a.category.toUpperCase()}</span>
          <h3>${a.title}</h3>
          <p>${a.excerpt}</p>
        </div>
      </div>
    `;
  });
}

function openArticle(id) {
  localStorage.setItem("article", id);
  window.location.href = "article.html";
}

function loadArticle() {
  const id = localStorage.getItem("article");
  const article = articles.find(a => a.id === id);
  if (!article) return;

  document.getElementById("articleContent").innerHTML = `
    <span class="tag ${article.category}">${article.category.toUpperCase()}</span>
    <h1>${article.title}</h1>
    <img src="${article.image}">
    <p>${article.content}</p>
  `;
}

function searchArticles(query) {
  const q = query.toLowerCase().trim();
  const overlay = document.getElementById("searchOverlay");
  const resultsContainer = document.getElementById("searchResults");

  if (!overlay || !resultsContainer) return;

  if (q === "") {
    overlay.style.display = "none";
    return;
  }

  function closeSearch() {
  const overlay = document.getElementById("searchOverlay");
  const input = document.getElementById("searchInput");

  if (overlay) overlay.style.display = "none";
  if (input) input.value = "";
}
  

  const results = articles.filter(a =>
    a.title.toLowerCase().includes(q) ||
    a.excerpt.toLowerCase().includes(q) ||
    a.content.toLowerCase().includes(q)
  );

  resultsContainer.innerHTML = "";

  if (results.length === 0) {
    resultsContainer.innerHTML = `<p>No results found for "${query}".</p>`;
  } else {
    results.forEach(a => {
      resultsContainer.innerHTML += `
        <div class="card" onclick="openArticle('${a.id}')">
          <img src="${a.image}">
          <div class="card-body">
            <span class="tag ${a.category}">${a.category.toUpperCase()}</span>
            <h3>${a.title}</h3>
            <p>${a.excerpt}</p>
          </div>
        </div>
      `;
    });
  }

  overlay.style.display = "flex";
}

document.getElementById("searchInput")?.addEventListener("input", e => {
  const query = e.target.value.trim();

  // If we're NOT on the homepage, redirect
  if (!document.getElementById("articles")) {
    localStorage.setItem("searchQuery", query);
    window.location.href = "index.html";
    return;
  }

  searchArticles(query);
});

render("articles", a => true);
render("trending", a => a.trending);
render("sportsArticles", a => a.category === "sport");
render("entArticles", a => a.category === "ent");
loadArticle();

const savedQuery = localStorage.getItem("searchQuery");

if (savedQuery && document.getElementById("articles")) {
  searchArticles(savedQuery);
  localStorage.removeItem("searchQuery");
}

function toggleInfo() {
  const siteInfo = document.getElementById("siteInfo");
  if (!siteInfo) return;

  siteInfo.style.display =
    siteInfo.style.display === "flex" ? "none" : "flex";
}






