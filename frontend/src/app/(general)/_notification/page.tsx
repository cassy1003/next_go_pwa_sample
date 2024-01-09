import { useState, useEffect } from 'react'
import { getMessage, requestForToken, onMessageListener } from '@/lib/firebase'

export default function Notification() {
  const [notification, setNotification] = useState({ title: '', body: '' })
  useEffect(() => {
    console.log(notification)
    if (notification?.title) {
      alert('title: ' + notification?.title + '\nbody: ' + notification?.body)
    }
  }, [notification])

  useEffect(() => {
    const message = getMessage()
    requestForToken(message)

    onMessageListener(message)
      .then((payload) => {
        setNotification({ title: payload?.notification?.title ?? 'あ', body: payload?.notification?.body ?? 'い' })
      })
      .catch((err) => console.log('failed: ', err))
  }, [])

  return <div />
}