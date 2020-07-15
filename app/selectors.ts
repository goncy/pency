export function isIOSInstagramBrowser() {
  const userAgent = navigator?.userAgent?.toLowerCase();

  return (
    userAgent?.includes("instagram") &&
    (userAgent?.includes("iphone") || userAgent?.includes("ipad"))
  );
}
