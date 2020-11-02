$(document).ready(function () {
    // Initialize Firebase
    // TODO: Replace with your project's customized code snippet
    var config = {
        apiKey: "",
        authDomain: "push-906.firebaseapp.com",
        databaseURL: "https://push-906.firebaseio.com",
        projectId: "push-906",
        storageBucket: "push-906.appspot.com",
        messagingSenderId: "987079568654"
    };
 
    firebase.initializeApp(config);
 
    const messaging = firebase.messaging();
 
    if ('serviceWorker' in navigator && 'PushManager' in window) {
        console.log('Service Worker and Push is supported');
 
        navigator.serviceWorker.register('/sapbasketstorefront/_ui/addons/pushnotificationaddon/responsive/common/js/firebase-messaging-sw.js')//.scope()...
            .then(function (registration) {
                
                console.log(registration);
                messaging.useServiceWorker(registration);
 
                messaging.requestPermission().then(function () {
                
                    console.log("Got Permission");
                    
                    return messaging.getToken().then(function (currentToken) {
                      
                        console.log(currentToken);
                        if (currentToken) {
 
                            sendTokenToServer(currentToken);
                                
                           /*$.ajax({
                               url: ACC.config.encodedContextPath + "/notification/gettoken",
                               dataType: "json",
                               type: 'POST',
                               
                               data: {
                                   json: currentToken
                               },
                               success: function( data ) {
                                  alert(data);//
                                  setTokenSentToServer(true);
                               },
                               error:function(response){
                                  alert("Failure"+response.status)
                               }
                           });*/
                        
                        } else {
                            // Show permission request.
                            console.log('No Instance ID token available. Request permission to generate one.');
                            // Show permission UI.
                            ////updateUIForPushPermissionRequired();
                            setTokenSentToServer(false);
                        }
 
                        }).catch(function (err) {
                            console.log('An error occurred while retrieving token. ', err);
                            setTokenSentToServer(false);
                        });
                });
                /*
                .then(function (token) {
                    console.log(token);
                })
                .catch(function (err) {
                    console.log(err);
                });*/
 
                /*navigator.serviceWorker.ready
                    .then(function (serviceWorkerRegistration) {
                        console.log('asd');
                        serviceWorkerRegistration.pushManager.subscribe()
                            .then(function (subscription) {
                                endpoint = subscription.endpoint;
                                console.log('subscription endpoint: ', subscription.endpoint);
                            })
                            .catch(function (e) {
                                console.log(e);
                            });
                    });
                */
 
                // [START receive_message]
                // Handle incoming messages. Called when:
                // - a message is received while the app has focus
                // - the user clicks on an app notification created by a sevice worker
                //   `messaging.setBackgroundMessageHandler` handler.
                messaging.onMessage(function (payload) {
                    console.log("Message received. ", payload);
                    // [START_EXCLUDE]
                    // Update the UI to include the received message.
                    //appendMessage(payload);
                    // [END_EXCLUDE]
                });
                // [END receive_message]
 
 
                // [START refresh_token]
                // Callback fired if Instance ID token is updated.
                messaging.onTokenRefresh(function () {
                    
                 messaging.getToken().then(function (refreshedToken) {
                            
                      console.log('Token refreshed.');
                            // Indicate that the new Instance ID token has not yet been sent to the
                            // app server.
                            setTokenSentToServer(false);
                            /*$.ajax({
                               url: ACC.config.encodedContextPath + "/notification/gettoken",
                               dataType: "json",
                               type: 'POST',
                               
                               data: {
                                   json: refreshedToken
                               },
                               success: function( data ) {
                                  alert(data)
                               },
                               error:function(response){
                                  alert("Failure"+response.status)
                               }
                           });
                            */
                            
                            // Get updated InstanceID token.
                            /*String refreshedToken = FirebaseInstanceId.getInstance().getToken();//try catch...?
                            console.log("Refreshed token: " + refreshedToken);
*/
                            // TODO: Implement this method to send any registration to your app's servers.
                            // Send Instance ID token to app server.
                            if (refreshedToken) {
                                 sendTokenToServer(refreshedToken);
                            }
                            else {
                                // Show permission request.
                                console.log('No Instance ID token available. Request permission to generate one.');
                                // Show permission UI.
                                ////updateUIForPushPermissionRequired();
                                setTokenSentToServer(false);
                            }
                            
                            // [START_EXCLUDE]
                            // Display new Instance ID token and clear UI of all previous messages.
                            //resetUI();
                            // [END_EXCLUDE]
                        })
                        .catch(function (err) {
                            console.log('Unable to retrieve refreshed token ', err);
                            //setTokenSentToServer(false);// 
                        });
                });
                // [END refresh_token]
 
            })
            .catch(function (e) {
                console.error(e);
            })
 
    } else {
        console.log('Service Worker is not supported in this browser.');
    }
});
 
// Send the Instance ID token your application server, so that it can:
// - send messages back to this app
// - subscribe/unsubscribe the token from topics
function sendTokenToServer(currentToken) {
     
    if (!isTokenSentToServer()) {
        console.log('Sending token to server...');
 
        $.ajax({
            url: ACC.config.encodedContextPath + "/notification/gettoken",
            dataType: "json",
            type: 'POST',
            
            data: {
                json: currentToken
            },
            success: function( data ) {
                 alert(data);//
                 setTokenSentToServer(true);//
            },
            error:function(response){
                 alert("Failure"+response.status)
            }
        });
        
        // TODO(developer): Send the current token to your server.
/*        var xhr = new XMLHttpRequest();
 
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                //console.log("wah"); //Outputs a DOMString by default
                setTokenSentToServer(true);//
            }
        };
 
       
        var id_token = {
            "notification": {
                "title": "SAP Basket notification",
               "body": "from unload.js",
                "icon": "https://localhost:9002/sapbasketstorefront/_ui/addons/sapbasketstorefrontAddOn/responsive/common/images/download.png",
                "click_action": "https://localhost:9002"
            },
 
            "to": currentToken
        }
 
        xhr.open('POST', 'https://fcm.googleapis.com/fcm/send');
 
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Authorization', 'key=AIzaSyB6VvEGXdzYlDTkOeWZ23JXHvD37nhzo_k');
 
        xhr.send(JSON.stringify(id_token));//
*/
 
        //setTokenSentToServer(true);//
    } else {
        console.log('Token already sent to server so won\'t send it again ' +
            'unless it changes');
    }
}
 
function isTokenSentToServer() {
    return window.localStorage.getItem('sentToServer') == 1;
}
 
function setTokenSentToServer(sent) {
    window.localStorage.setItem('sentToServer', sent ? 1 : 0);
}
