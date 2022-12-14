import sveltePreprocess from "svelte-preprocess";

export default {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: [
    sveltePreprocess({
      replace: [
        [
          /process\.env\.AUTH_BASEURL/g,
          JSON.stringify(process.env.AUTH_BASEURL),
        ],
      ],
      postcss: true,
    }),
  ],
};
