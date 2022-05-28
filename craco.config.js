const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': '#e9687e',
              '@border-radius-base': '22px',
              '@height-base': '36px',
              '@btn-border-width': '1.5px',
              '@modal-mask-bg': '#2b1a22cc',
              '@checkbox-border-radius': '4px',
              '@checkbox-size': '24px',
              '@radio-size': '24px'
            },
            javascriptEnabled: true
          }
        }
      }
    }
  ]
};
