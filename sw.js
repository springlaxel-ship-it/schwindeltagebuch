// Version 2.1.4 – network-first für App-Code, offline-fähiger Fallback.
const CACHE='schwindeltagebuch-v2.1.4';
const CORE=['./','./index.html','./app.js?v=2.1.4','./pdf-export.js?v=2.1.4','./manifest.webmanifest','./icon-192.png','./icon-512.png'];
self.addEventListener('install',event=>event.waitUntil((async()=>{
 const cache=await caches.open(CACHE);
 await cache.addAll(CORE.map(path=>new Request(path,{cache:'reload'})));
 await self.skipWaiting();
})()));
self.addEventListener('activate',event=>event.waitUntil((async()=>{
 const keys=await caches.keys();
 await Promise.all(keys.filter(k=>k.startsWith('schwindeltagebuch-')&&k!==CACHE).map(k=>caches.delete(k)));
 await self.clients.claim();
})()));
self.addEventListener('fetch',event=>{
 const request=event.request;
 if(request.method!=='GET')return;
 const url=new URL(request.url);
 if(url.origin!==self.location.origin)return;
 if(url.pathname.endsWith('/version.json'))return; // never cache online version checks
 if(request.mode==='navigate'){
  event.respondWith((async()=>{
   try{
    const response=await fetch(request,{cache:'no-store'});
    if(response.ok){const cache=await caches.open(CACHE);await cache.put('./index.html',response.clone());}
    return response;
   }catch(e){return (await caches.match('./index.html'))||Response.error();}
  })());return;
 }
 event.respondWith((async()=>{
  try{
   const response=await fetch(request,{cache:'no-store'});
   if(response.ok){const cache=await caches.open(CACHE);await cache.put(request,response.clone());}
   return response;
  }catch(e){return (await caches.match(request))||Response.error();}
 })());
});
self.addEventListener('message',event=>{if(event.data?.type==='SKIP_WAITING')self.skipWaiting()});
