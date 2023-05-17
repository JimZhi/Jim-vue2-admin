const { defineConfig } = require("@vue/cli-service");
const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}

const isProd = process.env.NODE_ENV === "production";

const cdn = {
  css: [],
  js: [],
  externals: {
    // vue: "Vue",
    // "vue-router": "VueRouter",
    // vuex: "Vuex",
    // axios: "axios",
  },
};

module.exports = defineConfig({
  transpileDependencies: true,

  productionSourceMap: false, // 取消生产环境source map 加速生产环境构建
  publicPath: "./",
  outputDir: "dist",
  lintOnSave: !isProd, // 测试环境开启lint

  devServer: {
    // static: ["public"],
    port: 8999,
    open: true,
    compress: true, // 本地开发的时候，启动服务也会被压缩
    historyApiFallback: true,
    allowedHosts: "auto",
    // 当出现编译错误或警告时，在浏览器中显示全屏覆盖
    client: {
      overlay: {
        warnings: false,
        errors: true,
      },
    },

    proxy: {
      "/api": {
        target: "http://localhost:9000",
        pathRewrite: {
          "^/api": "",
        },
        changeOrigin: true,
      },
    },
  },

  configureWebpack: {
    resolve: {
      alias: {
        "@": resolve("src"),
      },
    },
    // cdn引入无需单独打包
    externals: isProd ? cdn.externals : {},
  },
  chainWebpack(config) {
    // if (isProd) {
    console.log(config, 1);
    //   // 为生产环境修改配置...
    // } else {
    //   console.log(config, 2);
    //   // 为开发环境修改配置...
    // }
  },
});
