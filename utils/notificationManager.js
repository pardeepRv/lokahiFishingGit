import { firebase, firestore } from '../firebase_config';


const notificationsRef = firestore.collection('notifications');

const fcmURL = 'https://fcm.googleapis.com/fcm/send';
const firebaseServerKey =
'AAAAXUq607k:APA91bET_qRPqYAlV1wT7LSS4bUh0hv3V2aZIW8DYDA2WCbY-6fvt3AKHLT1LtuWPPxTfVEeFfwt0mPtmTPO5roWunUpOwT78XvCRrHAC4KyFg7-z-979Uz_1yKfBMkPr1CgrhdEVL31'



// const handleUserBadgeCount = async (userID) => {
//   const user = await getUserByID(userID);
//   if (user?.badgeCount) {
//     const newBadgeCount = user.badgeCount + 1;
//     updateUser(userID, { badgeCount: newBadgeCount });
//     return newBadgeCount;
//   }
//   return 0;
// };

const sendPushNotification = async (
  toUser,
  title,
  body,
  type,
  metadata = {},
) => {
  console.log('DOES THIS HIT RIGHT HERE?', metadata)
  console.log('DOES THIS HIT RIGHT BODY?', body)
  console.log('DOES THIS HIT RIGHT TYPE?', type)
  console.log('DOES THIS HIT RIGHT TITLE', toUser)
  if (metadata && metadata.outBound && toUser.id == metadata.outBound.id) {
    console.log('DOES THIS HIT RIGHT HERE? 1ST IF' )
    return;
  }
  if (toUser.settings && toUser.settings.push_notifications_enabled == false) {
    console.log('DOES THIS HIT RIGHT HERE? 2ND IF')
    return;
  }
  if (!toUser.tokens) {
    console.log('DOES THIS HIT RIGHT HERE? 3RD IF', toUser.tokens)
    return;
  }

  const notification = {
    toUserID: toUser.id,
    title,
    body,
    metadata,
    toUser: toUser.id,
    type,
    seen: false,
  };
console.log('THIS IS THE NOTIFICATION', notification)
  const ref = await notificationsRef.add({
    ...notification,
    // createdAt: firestore.FieldValue.serverTimestamp(),
  });
  console.log('WHAT IS REF', ref)
  notificationsRef.doc(ref.id).update({ id: ref.id });

  // const userBadgeCount = await handleUserBadgeCount(toUser.id || toUser.userID);
  console.log('does this hit? right before pushNotifications')
  const pushNotification = {
    to: toUser.tokens,
    notification: {
      title: title,
      body: body,
      sound: 'default',
      // badge: userBadgeCount,
    },
    data: { type, toUserID: toUser.id, ...metadata },
    priority: 'high',
  };
  console.log('DOES THIS HIT RIGHT HERE? I HOPE SO')
  fetch(fcmURL, {
    method: 'post',
    headers: new Headers({
      Authorization: 'key=' + firebaseServerKey,
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify(pushNotification),
  });

};


export const notificationManager = {
  sendPushNotification,
};
