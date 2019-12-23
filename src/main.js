import Vue from "vue";
import App from "./App.vue";
import { firestorePlugin } from "vuefire";
import "./registerServiceWorker";
import { SchemaSyncHandler } from "./schemasync";

Vue.config.productionTip = false;
SchemaSyncHandler.sync();
new Vue({
  render: h => h(App),
  firestorePlugin
}).$mount("#app");
