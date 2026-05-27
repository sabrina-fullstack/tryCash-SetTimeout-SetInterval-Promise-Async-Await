const BASE_URL = "https://infos-israel.news/wp-json/wp/v2";

export const CATEGORIES = [
  { id: "all", name: "À la une", slug: null, icon: "🇮🇱" },
  { id: 3, name: "Actualité en Israël", slug: "israel", icon: "🇮🇱" },
  { id: 5, name: "Actualité monde", slug: "international", icon: "🌍" },
  { id: 12, name: "Alerte Info 24/24", slug: "alerte-info-24-24", icon: "🚨" },
  { id: 8, name: "France / Europe", slug: "france", icon: "🇫🇷" },
  { id: 1, name: "Général", slug: "uncategorized", icon: "📰" },
  { id: 15, name: "Antisémitisme", slug: "antisemitisme-2", icon: "✡️" },
  { id: 18, name: "Judaïsme", slug: "judaisme", icon: "✡️" },
  { id: 20, name: "Désinformation", slug: "desinformation", icon: "📢" },
  { id: 22, name: "Opinions", slug: "opinions", icon: "💬" },
  { id: 25, name: "7 octobre", slug: "7-octobre", icon: "🕯️" },
];

export async function fetchPosts({
  categoryId = null,
  page = 1,
  perPage = 10,
  search = "",
} = {}) {
  let url = `${BASE_URL}/posts?_embed&per_page=${perPage}&page=${page}&orderby=date&order=desc`;

  if (categoryId && categoryId !== "all") {
    url += `&categories=${categoryId}`;
  }
  if (search) {
    url += `&search=${encodeURIComponent(search)}`;
  }

  const response = await fetch(url);
  if (!response.ok) throw new Error("Erreur réseau");

  const totalPages = parseInt(response.headers.get("X-WP-TotalPages") || "1");
  const posts = await response.json();

  return { posts: posts.map(formatPost), totalPages };
}

export async function fetchPost(id) {
  const response = await fetch(`${BASE_URL}/posts/${id}?_embed`);
  if (!response.ok) throw new Error("Article introuvable");
  const post = await response.json();
  return formatPost(post);
}

function formatPost(post) {
  const featuredImage =
    post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
    post._embedded?.["wp:featuredmedia"]?.[0]?.media_details?.sizes?.medium
      ?.source_url ||
    null;

  const categoryName = post._embedded?.["wp:term"]?.[0]?.[0]?.name || "Général";

  const excerpt = post.excerpt?.rendered
    ? post.excerpt.rendered.replace(/<[^>]*>/g, "").trim()
    : "";

  return {
    id: post.id,
    title:
      post.title?.rendered
        ?.replace(/&#8217;/g, "'")
        .replace(/&amp;/g, "&")
        .replace(/&#8220;/g, '"')
        .replace(/&#8221;/g, '"') || "",
    excerpt,
    content: post.content?.rendered || "",
    date: post.date,
    link: post.link,
    featuredImage,
    categoryName,
    slug: post.slug,
  };
}

export function formatDate(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diff = Math.floor((now - date) / 1000);

  if (diff < 60) return "À l'instant";
  if (diff < 3600) return `Il y a ${Math.floor(diff / 60)} min`;
  if (diff < 86400) return `Il y a ${Math.floor(diff / 3600)}h`;
  if (diff < 172800) return "Hier";

  return date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
