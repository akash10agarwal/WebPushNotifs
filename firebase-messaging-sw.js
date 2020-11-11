self.addEventListener('install', function(event) {
	console.log("installed");
});

self.addEventListener('activate', function(event) {
  console.log("activated");
});

importScripts('https://www.gstatic.com/firebasejs/4.0.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.0.0/firebase-messaging.js');


/*
 * Customer Specific firebase project settings
 * */
var config = {
	    apiKey: "",
	    authDomain: "push-906.firebaseapp.com",
	    databaseURL: "https://push-906.firebaseio.com",
	    projectId: "push-906",
	    storageBucket: "push-906.appspot.com",
	    messagingSenderId: ""
	  };
		  
firebase.initializeApp(config);
        			
const messaging = firebase.messaging();

var x;

messaging.setBackgroundMessageHandler(function(payload) {
	console.log('[firebase-messaging-sw.js] Received background message payload', payload);

	x=payload;
	
	// Customize notification here
	  const notificationTitle = payload.data.title;
	  
	  const notificationOptions = {
	    body: payload.data.body,
	    icon: payload.data.icon,
	    image: payload.data.image,
	    actions: [
	        { "action": "yes", "title": "Yes", "icon": payload.data.icon },
	        { "action": "no", "title": "No", "icon": payload.data.icon }//icon size 24px x 24px is apt for desktop chrome
	      ],
	    requireInteraction: false,
	    renotify: true,//false always by default 
	    dir: "auto",
	    tag:"tag",
	    timestamp: Date.parse('01 Jan 2000 00:00:00'),
	    
	    sound:"no browser has support for this, anyways put an url for an audio.mp3",
	    silent: false,//only for smartphones from here
	    badge: "https://localhost:9002/sapbasketstorefront/_ui/addons/pushnotificationaddon/responsive/common/images/firebase.png",
	    vibrate: [500,110,500,110,450,110,200,110,170,40,450,110,200,110,170,40,500]    
	  };

	  return self.registration.showNotification(notificationTitle,notificationOptions);
	});

self.addEventListener('notificationclick', function(event) {
	  event.notification.close();
	  event.waitUntil(self.clients.openWindow(x.data.click_action));
	});

/*self.addEventListener('notificationshow', function(event) {
... Do your stuff here.
});
*/

/*self.addEventListener('notificationerror', function(event) {
	  ... Do your stuff here.
	});
*/
/*self.addEventListener('push', function(event) {
	  //console.log('[Service Worker] Push Received.');
	  //console.log('[Service Worker] Push had this data: "${event.data.text()}"');

	  const title = 'Push Codelab';
	  const options = {
	    body: 'Yay it works.',
	    icon: 'images/icon.png',
	    badge: 'images/badge.png'
	  };

	  event.waitUntil(self.registration.showNotification(title, options));
	});
*/
/*You can also do the same with the notificationclose event:

	self.addEventListener('notificationclose', function(event) {
	  ... Do your stuff here.
	});*/
/*
self.addEventListener('fetch', function(event) {

	console.log(event.request.url);

	});*/
