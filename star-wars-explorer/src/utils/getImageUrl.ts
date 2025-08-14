export const getImageUrl = (resourceType: string, url: string) => {
  // Extract the ID from the SWAPI URL
  const idMatch = url.match(/\/([0-9]+)\/$/);
  if (!idMatch) return ""; // fallback
  const id = idMatch[1];

  switch (resourceType) {
    case "people":
      return `https://starwars-visualguide.com/assets/img/characters/${id}.jpg`;
    case "planets":
      return `https://starwars-visualguide.com/assets/img/planets/${id}.jpg`;
    case "starships":
      return `https://starwars-visualguide.com/assets/img/starships/${id}.jpg`;
    case "vehicles":
      return `https://starwars-visualguide.com/assets/img/vehicles/${id}.jpg`;
    case "species":
      return `https://starwars-visualguide.com/assets/img/species/${id}.jpg`;
    default:
      return "";
  }
};
