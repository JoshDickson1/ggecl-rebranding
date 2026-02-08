export {}; // make it a module

declare global {
  interface Window {
    Tawk_API?: {
      showWidget?: () => void;
      hideWidget?: () => void;
      // add more methods if you use them
    };
    Tawk_LoadStart?: Date;
  }
}
