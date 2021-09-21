const functions = require('firebase-functions');
const admin = require ("firebase-admin");
admin.initializeApp();
const firestore = admin.firestore();

const apn = require('apn');

exports.sendPushKitNotificationOnUserUpdate = functions.firestore
.document("users/{userID}/call_data/{callDataID}")
.onWrite((change, context) => {
    const callData = change.after.data();
    if (!callData) {
        console.log("nope b");
        return;
    }
    const callerID = callData.callerID;
    const callType = callData.callType;
    const callStatus = callData.callStatus;
    if (callStatus !== "Receiving") {
        console.log(callStatus);
        console.log("nope c");
        return;
    }

    console.log(context.params);
    console.log(context.params.userID);

    if (callData.groupCall === true) {
        handleNewCall('x', 'y', 'call type');
    } else {
        // 1-1 call
        const recipientID = context.params.userID;
        handleNewCall(callerID, recipientID, callType);
    }
});

exports.initiateChatCall = functions.https.onRequest((request, response) => {
    const callerID = request.body.callerID;
    const recipientIDs = request.body.recipientIDs;
    const callType = request.body.callType;
    const channelName = request.body.channelName;
    const topic = request.body.topic;
    const uuid = request.body.uuid;

    console.log(callerID);
    console.log(recipientIDs);
    console.log(callType);
    const channelID = request.body.channelID;
    recipientIDs.forEach(recipientID => {
        handleNewCall(callerID, recipientID, callType, channelName, topic, uuid);
    });
});

async function handleNewCall(callerID, recipientID, callType, channelName, topic, uuid) {
    console.log("Handling new call between " + callerID + " and " + recipientID + " call type: " + callType);
    firestore
        .collection('users')
        .doc(callerID)
        .get()
        .then(document => {
            const caller = document.data();
            return firestore
                .collection('users')
                .doc(recipientID)
                .get()
                .then(document => {
                    const recipient = document.data();
                    if (recipient.pushKitToken) {
                        return constructAndSendPushKitNotification(caller, recipient, callType, channelName, topic, uuid);
                    }
                    return null;
                });
        })
        .catch(error => {
            console.log(error);
        })
}

async function constructAndSendPushKitNotification(caller, recipient, callType, channelName, topic, uuid) {
    var callerName = caller.firstName + ' ' + caller.lastName;
    if (channelName && channelName.length > 0) {
        callerName = callerName + ' in ' + channelName;
    }
    const payload = {
        callerName: callerName,
        handle: recipient.email || recipient.phone || recipient.phoneNumber,
        uuid: uuid,
        chatType: callType
    };
    return sendPushKitNotification(recipient.pushKitToken, payload, topic);
}

async function sendPushKitNotification(token, payload, topic) {
    const config = {
        production: false, /* change this when in production */
        cert: topic ? (topic + '.pem') : 'voipCert.pem',
        key: topic ? (topic + '.pem') : 'voipCert.pem',
        passphrase: 'insert your password here'
    };

    const apnProvider = new apn.Provider(config);
    const notification = new apn.Notification();

    const recepients = [];
    recepients.push(apn.token(token));

    notification.topic = topic ? topic + '.voip' : 'io.instamobile.chat.swift.voip'; // you have to add the .voip here!!
    notification.payload = payload;

    console.log("Send push notifications to " + token + " topic: " + topic);

    return apnProvider.send(notification, recepients).then((reponse) => {
        console.log(JSON.stringify(reponse));
        return null;
    });
}