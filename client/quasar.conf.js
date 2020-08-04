module.exports = function(ctx) {
   return {
      supportIE: false,
      supportTS: false,
      boot: [
         "axios",
         "notify-defaults"
      ],
      css: [
         "app.scss"
      ],
      extras: [
         "fontawesome-v5",
         "roboto-font", // optional, you are not bound to it
         "material-icons", // optional, you are not bound to it
      ],
      build: {
         vueRouterMode: "history", // available values: 'hash', 'history'
         extendWebpack(cfg) {
         },
      },
      devServer: {
         https: false,
         port: 8080,
         open: true // opens browser window automatically
      },
      framework: {
         iconSet: "material-icons", // Quasar icon set
         lang: "en-us", // Quasar language pack
         all: "auto",
         components: [],
         directives: [],
         plugins: ["Loading","Notify"]
      },
      animations: [],
      ssr: {
         pwa: false
      },
      pwa: {
         workboxPluginMode: "GenerateSW", // 'GenerateSW' or 'InjectManifest'
         workboxOptions: {}, // only for GenerateSW
         manifest: {
            name: "Gojira",
            short_name: "Gojira",
            description: "Minimalist Software Project Management",
            display: "standalone",
            orientation: "portrait",
            background_color: "#ffffff",
            theme_color: "#027be3",
            icons: [
               {
                  src: "statics/icons/icon-128x128.png",
                  sizes: "128x128",
                  type: "image/png"
               },
               {
                  src: "statics/icons/icon-192x192.png",
                  sizes: "192x192",
                  type: "image/png"
               },
               {
                  src: "statics/icons/icon-256x256.png",
                  sizes: "256x256",
                  type: "image/png"
               },
               {
                  src: "statics/icons/icon-384x384.png",
                  sizes: "384x384",
                  type: "image/png"
               },
               {
                  src: "statics/icons/icon-512x512.png",
                  sizes: "512x512",
                  type: "image/png"
               }
            ]
         }
      },
      cordova: {
         id: "com.thirtyfourfame.gojira"
      },
      capacitor: {
         hideSplashscreen: true
      },
      electron: {
         bundler: "packager", // 'packager' or 'builder'
         packager: {},
         builder: {
            appId: "gojira"
         },
         nodeIntegration: true,
         extendWebpack(cfg) {
         }
      }
   }
}
