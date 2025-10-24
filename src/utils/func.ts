export const generatePath = (path: string) => {
  const formattedPath = path.split("/").slice(1);
  let currentPath = "";
  const hrefPath = [];
  for (const content of formattedPath) {
    currentPath += "/";
    currentPath += content;
    hrefPath.push(currentPath);
  }
  return [formattedPath, hrefPath];
}

export const formatRank = (rank: number) => {
  if (rank > 5) {
    return rank + "th";
  } else {
    let stars = "";
    for (let i = 0; i < rank; i++) {
      stars += "★";
    }
    return stars;
  }
}
