import "./app.postcss";
import App from "./App.svelte";
import {writable } from "svelte/store";


export const count = writable(0);
const app = new App({
  target: document.getElementById("app"),
});
export default app;
