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

export const fetchImage = async (setImage: React.Dispatch<React.SetStateAction<string>>) => {
  try {
    const res = await fetch("/api/waifu");
    const data = await res.json();
    setImage(data[0].url);
  } catch (error) {
    console.log(error);
  }
}
