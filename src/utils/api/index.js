export function fetchData(path, options) {
  const { headers } = options || {};
  const injectedHeaders = {
    ...headers,
    Accept: 'application/json',
  };

  const injectedOptions = {
    ...options,
    headers: injectedHeaders,
  };

  return fetch(
    `${process.env.REACT_APP_API_DOMAIN}/${path}`,
    injectedOptions
  ).then((res) => res.json()).then((data) => data.data);
}
