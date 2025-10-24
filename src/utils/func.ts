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
