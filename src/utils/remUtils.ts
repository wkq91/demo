export function getHtmlRemSize() {
  let designSize = 1512;
  let html = document.documentElement;
  let clientW = html.clientWidth;
  let htmlRem = (clientW * 100) / designSize;
  return Math.min(htmlRem, 100);
}

export function rem2Px(remSize: number) {
  return getHtmlRemSize() * remSize;
}
