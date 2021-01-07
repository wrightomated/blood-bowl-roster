import App from "./App.svelte";
import smoothscroll from 'smoothscroll-polyfill';

// kick off the polyfill!
smoothscroll.polyfill();

const app = new App({
  target: document.body
});

export default app;
