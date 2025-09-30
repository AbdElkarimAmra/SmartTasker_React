export function exctractQueryString(url) {
  const parsedURL = new URL(url);
  const params = new URLSearchParams(parsedURL.search);
  return params;
  
}




