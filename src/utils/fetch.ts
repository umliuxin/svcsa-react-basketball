/**
 * A function to wrap native fetch with proper API path
 * @returns Promise<any>
 */
export const asyncFetch = async function (path: string) {
  const res = await fetch(`${process.env.REACT_APP_API_DOMAIN}${path}` as string).catch(e => {
    throw e;
  });
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
