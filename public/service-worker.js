if (workbox) {
  console.log(`Workbox is loaded`);
  workbox.precaching.precacheAndRoute(self.__precacheManifest);

  workbox.routing.registerRoute(
    "https://jsonplaceholder.typicode.com/todos/1",
    ({ url, event, params }) => {
      console.log(url, event, params);
      return fetch(event.request)
        .then(response => {
          let clonedResponse = response.clone();
          clonedResponse.json().then(body => {
            self.idb.
              openDB("VueApp", 1).then(db => {
                db.transaction("todos", "readwrite")
                  .objectStore("todos")
                  .put(body);
              });
          });
          return response;
        })
        .catch(err => {
          return self.idb.openDB("VueApp", 1).then(db => {
            return db
              .transaction("todos")
              .objectStore("todos")
              .getAll()
              .then(values => {
                new Response(JSON.stringify(values), {
                  status: 200,
                  statusText: err.toString()
                });
              });
          });
        });
    }
  );
} else {
  console.log(`Workbox didn't load`);
}
