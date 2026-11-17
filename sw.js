// Version 2.0.9: Offline-Cache für alle App-Dateien, Online-Aktualisierung mit Fallback.
const CACHE='schwindeltagebuch-v2.0.9';
const ASSETS=['./index.html','./app.js?v=2.0.9','./pdf-export.js?v=2.0.9','./manifest.webmanifest','./icon-192.png','./icon-512.png'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith('schwindeltagebuch-')&&key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
 const request=event.request;
 if(request.method!=='GET'||new URL(request.url).origin!==self.location.origin)return;
 if(request.mode==='navigate'){
  event.respondWith(fetch(request).then(response=>{if(response.ok){const copy=response.clone();caches.open(CACHE).then(cache=>cache.put('./index.html',copy)).catch(()=>{});}return response;}).catch(()=>caches.match('./index.html')));
  return;
 }
 event.respondWith(fetch(request).then(response=>{if(response.ok){const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(request,copy)).catch(()=>{});}return response;}).catch(()=>caches.match(request)));
});

self.addEventListener('message',event=>{if(event.data?.type==='SKIP_WAITING')self.skipWaiting()});
