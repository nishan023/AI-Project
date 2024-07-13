// babel.config.mjs
export default {
  presets: ['@babel/preset-env', '@babel/preset-react'],
  plugins: [
    [
      'styled-components',
      {
        ssr: true,
        displayName: true,
        preprocess: false,
      },
    ],
  ],
};
