import sveltePreprocess from 'svelte-preprocess';

export default {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: [
    sveltePreprocess({
      replace: [
        [
          /process\.env\.AUTH_BASEURL/g,
          JSON.stringify(process.env.AUTH_BASEURL || ''),
          /process\.env\.API_BASEURL/g,
          JSON.stringify(process.env.API_BASEURL || ''),
        ],
      ],
      postcss: true,
    }),
  ],
};
