import Box from '@mui/material/Box'

export default function Points() {
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