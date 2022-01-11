export default {
  parser: 'postcss-scss',
  plugins: {
    autoprefixer: {},
    'postcss-normalize': {
      allowDuplicates: false
    }
  }
};
