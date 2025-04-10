export const slugify = (str) => {
  return str
    ?.toLowerCase() // Convert to lowercase
    .replace(/[^a-z0-9 -]/g, "") // Remove non-alphanumeric characters (except spaces and dashes)
    .replace(/\s+/g, "-") // Replace spaces with dashes
    .replace(/-+/g, "-"); // Remove consecutive dashes
};
export const extractSlug = (slugWithId) => {
  const match = slugWithId.match(/-(.+)$/); // get the part after the first dash
  return match ? match[1] : null;
};

export const generateSlugWithId = (id, name) => {
  const slugifiedName = slugify(name);
  return `${id}-${slugifiedName}`; // Combine ID and slugified name with a dash
};
export const extractId = (slugWithId) => {
  const match = slugWithId.match(/^(\d+)-/); // get the leading digits before the first dash
  return match ? match[1] : null;
};
