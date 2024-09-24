
export function setCookie(name: string, value: string, days: number) {
  const expirationDate = new Date();
  expirationDate.setTime(expirationDate.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value}; expires=${expirationDate.toUTCString()}; path=/`
}

export function getCookie(name: string, value: string) {
  return document.cookie.split("; ").find(row => row === `${name}=${value}`)
}
