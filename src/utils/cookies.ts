
export function setCookie(name: string, value: string, days: number) {
  const expirationDate = new Date();
  expirationDate.setTime(expirationDate.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value}; expires=${expirationDate.toUTCString()}; path=/`
}
