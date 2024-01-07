// import { getCookie } from './cookies-next'

import Box from '@mui/material/Box'

export default function Points() {
  /*
  const token = getCookie('token')
  if (token) {
    const r = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + '/api/users/points', {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      }
    })
    const r2 = await r.json()
    console.log(r2)
  } else {
    console.log('Don't have token')
  }
  */
 const sample = []
 for (let i = 1; i <= 10; i++) {
   sample.push(
     <Box sx={{ m: 10 }} key={i}>
      fuga: {i}
     </Box>
   )
 }
 return (
   <> { sample } </>
 )
}