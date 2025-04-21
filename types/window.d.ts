export {}; // ← required for module scoping

declare global {
  interface Window {
    dataLayer: any[];
  }
}