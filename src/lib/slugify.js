export const slugify = (str) => {
  return str
    .toLowerCase() // Convert to lowercase
    .replace(/[^a-z0-9 -]/g, "") // Remove non-alphanumeric characters (except spaces and dashes)
    .replace(/\s+/g, "-") // Replace spaces with dashes
    .replace(/-+/g, "-"); // Remove consecutive dashes
};
