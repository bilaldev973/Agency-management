module.exports = {
  images: {
    domains: ['images.unsplash.com'], // Allow Unsplash images
  },
  webpack(config, { isServer }) {
    // Apply babel loader to all files
    config.module.rules.push({
      test: /\.js$/,
      exclude: /(node_modules)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['next/babel'],
          plugins: [
            '@babel/plugin-proposal-private-methods', // Add private fields support
            '@babel/plugin-proposal-class-properties'  // Add class properties support
          ]
        }
      }
    });

    return config;
  }
};
