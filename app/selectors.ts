export function isIOSInstagramBrowser() {
  const userAgent = navigator?.userAgent?.toLowerCase();

  return userAgent?.includes("instagram") && userAgent?.includes("apple");
}
