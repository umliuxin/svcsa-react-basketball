/**
 * A function to wrap native fetch with proper API path
 * @returns Promise<any>
 */
export const asyncFetch = async function (path: string) {
  // TODO: figure out how to manage api url in client codes
  const baseURL =
    process.env.REACT_APP_API_DOMAIN ??
    "http://beta-svcsa-api.westus.azurecontainer.io:3030";
  const res = await fetch(`${baseURL}${path}` as string).catch((e) => {
    throw e;
  });
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error(`Failed to fetch data: ${path}`);
  }

  return res.json();
};
