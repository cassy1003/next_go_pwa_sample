import { useState, useEffect } from 'react'
import { getMessage, requestForToken, onMessageListener } from '@/lib/firebase'

export default function Notification() {
  const [notification, setNotification] = useState({ title: '', body: '' })
  useEffect(() => {
    if (notification?.title) {
      alert('title: ' + notification?.title + '\nbody: ' + notification?.body)
    }
  }, [notification])

  const requestPermission = async () => {
    try {
      const message = getMessage()

      window.Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          requestForToken(message)
        }

        onMessageListener(message)
          .then((payload) => {
            setNotification({ title: payload?.notification?.title ?? 'あ', body: payload?.notification?.body ?? 'い' })
          })
          .catch((err) => console.error('failed: ', err))
      })
    } catch (error) {
      console.error("Error getting permission or token", error);
    }
  };

  // Tips: iOSでは明示的にユーザーのアクションによって通知を許可する必要がある。
  return <button onClick={requestPermission}>通知を許可する</button>
}