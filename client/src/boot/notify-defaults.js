import { Notify } from "quasar"

Notify.setDefaults({
   actions: [{ icon: 'close', color: 'white' }],
   group: true,
   message: "Success!",
   position: "top",
   progress: true,
   color: "positive",
   textColor: "white",
   timeout: 2500,
   type: "positive",
})
