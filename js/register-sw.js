// chequeo si el browser soporta Service Worker

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("../service-worker.js").then((message) => {
        console.log("Service Worker esta ATR!");
    });
} else {
    console.log("Service Worker se trulo - NO SOPORTADO")
}