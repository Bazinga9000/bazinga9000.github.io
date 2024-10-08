export function toCanvasElementImpl(el, Just, Nothing) {
    if (el && el instanceof HTMLCanvasElement) {
      return Just(el);
    } else {
      return Nothing;
    }
}
  