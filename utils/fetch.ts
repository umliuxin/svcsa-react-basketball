
/**
 * A function to wrap native fetch with proper API path
 * @returns Promise<any>
 */
export const asyncFetch = async function (path: string, isInApp = false) {
  let res;
  if (isInApp) {
    res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}${path}`).catch(
      (e) => {
        throw e;
      }
    );
  } else {
    // TODO: figure out how to manage api url in client codes
    const baseURL =
      process.env.NEXT_PUBLIC_REACT_APP_API_DOMAIN ??
      "http://beta-svcsa-api.westus.azurecontainer.io:3030";
    res = await fetch(`${baseURL}${path}` as string).catch((e) => {
      throw e;
    });
  }

  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error(`Failed to fetch data: ${path}`);
  }

  return res.json();
};
