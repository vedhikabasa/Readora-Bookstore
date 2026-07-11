function getImgUrl(name: string) {
  if (name.startsWith("http://") || name.startsWith("https://")) {
    return name;
  }

  return new URL(`../assets/books/${name}`, import.meta.url).href;
}

export { getImgUrl };