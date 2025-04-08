// Fetch trending anime/manga
export async function fetchTrending(type = "MANGA") {
  const query = `
    query {
      Page(perPage: 10) {
        media(sort: TRENDING_DESC, type: ${type}) {
          id
          title {
            romaji
            english
          }
          coverImage {
            large
          }
          description
          ${type === "MANGA" ? "volumes" : "episodes"}
        }
      }
    }
  `;

  const response = await fetch("https://graphql.anilist.co", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ query }),
  });

  const data = await response.json();
  return data.data.Page.media;
}

// Fetch search results dynamically
export async function searchAnimeManga(query, type = "MANGA") {
  const searchQuery = `
    query ($search: String) {
      Page(perPage: 15) {
        media(search: $search, type: ${type}) {
          id
          title {
            romaji
            english
          }
          coverImage {
            large
          }
          description
        }
      }
    }
  `;

  const response = await fetch("https://graphql.anilist.co", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ query: searchQuery, variables: { search: query } }),
  });

  const data = await response.json();
  return data.data.Page.media;
}

// Fetch full details of a single anime/manga by ID
export async function fetchAnimeMangaDetails(id) {
  const detailsQuery = `
    query ($id: Int) {
      Media(id: $id) {
        id
        title {
          romaji
          english
        }
        coverImage {
          large
        }
        description
        episodes
        volumes
      }
    }
  `;

  const response = await fetch("https://graphql.anilist.co", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ query: detailsQuery, variables: { id } }),
  });

  const data = await response.json();
  return data.data.Media;
}

