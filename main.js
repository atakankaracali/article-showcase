async function getData() {
  const container = document.querySelector(".container");

  const loading = document.createElement("div");
  loading.className = "loading";
  loading.textContent = "Loading articles...";
  container.appendChild(loading);

  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Fetch failed");

    const data = await response.json();
    container.removeChild(loading);
    return data.data;
  } catch (err) {
    container.removeChild(loading);
    const errorDiv = document.createElement("div");
    errorDiv.className = "error";
    errorDiv.textContent = "Could not load articles.";
    container.appendChild(errorDiv);
    console.error(err);
  }
}

getData().then((articles) => {
  if (!articles) return;

  const container = document.querySelector(".container");
  const articleList = document.createElement("ul");
  articleList.className = "article-list";

  articles.forEach((article) => {
    const listItem = document.createElement("li");
    listItem.className = "article-item";

    const img = document.createElement("img");
    img.src = article.thumbnail || "https://dummyimage.com/300x180/ccc/000&text=No+Image";
    img.alt = article.title;

    const genre = document.createElement("span");
    genre.className = "badge";
    genre.textContent = article.genre || "Unknown";

    const title = document.createElement("h2");
    title.textContent = article.title;

    const description = document.createElement("p");
    description.textContent = article.short_description;

    const publisher = document.createElement("p");
    publisher.textContent = "Publisher: " + (article.publisher || "Unknown");

    const date = document.createElement("p");
    const releaseDate = new Date(article.release_date);
    date.textContent = "Published: " + (isNaN(releaseDate) ? "Unknown" : releaseDate.toLocaleDateString());

    const viewBtn = document.createElement("a");
    viewBtn.href = article.game_url;
    viewBtn.target = "_blank";
    viewBtn.rel = "noopener noreferrer";
    viewBtn.className = "view-button";
    viewBtn.textContent = "View Game";

    listItem.appendChild(img);
    listItem.appendChild(genre);
    listItem.appendChild(title);
    listItem.appendChild(description);
    listItem.appendChild(publisher);
    listItem.appendChild(date);
    listItem.appendChild(viewBtn);

    articleList.appendChild(listItem);
  });

  container.appendChild(articleList);
});