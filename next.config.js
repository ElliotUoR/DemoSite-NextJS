const path = require('path')
const webpack = require('webpack')
var symlink = require('gulp-sym')


/*
how to build: wasm is annoying on server building and always renders in wrong place. Therefore best way
to build is turn 'cleanDistDir' to 'true' and 'npm run build'. This will fail, it will say missing wasm in static/wasm/x.wasm
Now turn 'cleanDistDir' to 'false' and move the wasm in the /server/ file to the location it was missing. 
'Npm run build' and it will successfully build

there could be a build issue with gulp sym and framer motion this was mentioned on installation
lodash.template  <4.5.0
Severity: critical
Prototype Pollution in lodash - https://github.com/advisories/GHSA-jf85-cpcp-j695
No fix available
node_modules/lodash.template
  gulp-util  >=1.1.0
  Depends on vulnerable versions of lodash.template
  node_modules/gulp-util
    gulp-sym  *
    Depends on vulnerable versions of gulp-util
    node_modules/gulp-sym

    ( via npm audit)

*/

module.exports = {
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true
  },
  basePath: '/DemoSite-NextJS',
  cleanDistDir: true,
  webpack: (config, { isServer }) => {
    config.experiments = { asyncWebAssembly: true };
    
    if (isServer) {
      config.output.webassemblyModuleFilename =
        './../static/wasm/[modulehash].wasm';
    } else {
      config.output.webassemblyModuleFilename =
        'static/wasm/[modulehash].wasm';
    }

    return config;
  },
  }

  



/*


mkdir -p .next/server/chunks/static/wasm \
&& mkdir -p .next/server/static \
&& cd .next/server/static \
&& ln -s ../chunks/static/wasm wasm




*/

/*

if (isServer) {
      config.output.webassemblyModuleFilename =
        './../static/wasm/[modulehash].wasm';
    } else {
      config.output.webassemblyModuleFilename =
        'static/wasm/[modulehash].wasm';
    }

config.plugins.push(
  new (class {
    apply(compiler) {
      compiler.hooks.afterEmit.tapPromise(
        'SymlinkWebpackPlugin',
        async (compiler) => {
          if (isServer) {
            const from = path.join(compiler.options.output.path, '../static');
            const to = path.join(compiler.options.output.path, 'static');
            
            /*
            try {
              await access(from);
              console.log(`${from} already exists`);
              return;
            } catch (error) {
              if (error.code === 'ENOENT') {
                // No link exists
              } else {
                throw error;
              }
            }


            await symlink(to, from, 'junction');
            console.log(`created symlink ${from} -> ${to}`);
          }
        },
      );
    }
  })(),
);


*/