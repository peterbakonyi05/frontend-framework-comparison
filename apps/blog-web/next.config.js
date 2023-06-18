//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { composePlugins, withNx } = require('@nx/next');

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  async rewrites() {
    // this is needed so that the cookie can be set on the same domain
    // in a production app the api should be under a subdomain or same domain to avod rewrites
    return [
      {
        source: '/api/:path*',
        destination: `${process.env['NX_BLOG_API_BASE_URL']}/api/:path*`, // The :path parameter is used here so will not be automatically passed in the query
      },
    ];
  },
};

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
];

module.exports = composePlugins(...plugins)(nextConfig);
