export function getLegendPosition(): "left" | "bottom" {
  if (window.innerWidth >= 800) {
    return "left";
  } else {
    return "bottom";
  }
}
