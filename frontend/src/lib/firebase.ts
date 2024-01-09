import { initializeApp } from 'firebase/app'
import { getMessaging, getToken, onMessage, Messaging, MessagePayload } from 'firebase/messaging'

import {
  FIREBASE_API_KEY,
  FIREBASE_APP_ID,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MEASUREMENT_ID,
  FIREBASE_WEB_PUSH_VAPID_KEY,
} from './env'

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID,
  measurementId: FIREBASE_MEASUREMENT_ID,
}

export const getMessage = (): Messaging => {
  // Firebaseの初期化
  const app = initializeApp(firebaseConfig)

  // Firebase Messagingのセットアップ
  return getMessaging(app)
}

export const requestForToken = (messaging: Messaging) => {
  return getToken(messaging, { vapidKey: FIREBASE_WEB_PUSH_VAPID_KEY })
    .then((currentToken) => {
      if (currentToken) {
        // トークンの取得に成功した場合の処理
        console.log('Current token:', currentToken)
      } else {
        // トークンの取得に失敗した場合の処理
        console.log('No registration token available.')
      }
    })
    .catch((error) => {
      // トークンの取得中にエラーが発生した場合の処理
      console.error('An error occurred while retrieving token. ', error)
    })
}

export const onMessageListener = (messaging: Messaging): Promise<MessagePayload> => {
  return new Promise<MessagePayload>((resolve) => {
    onMessage(messaging, (payload: MessagePayload) => {
      console.log('payload', payload)
      resolve(payload)
    })
  })
}