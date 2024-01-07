import Box from '@mui/material/Box'

export default function Home() {
  const sample = []
  for (let i = 1; i <= 10; i++) {
    sample.push(
      <Box sx={{ m: 10 }} key={i}>
        hoge: {i}
      </Box>
    )
  }
  return (
    <> { sample } </>
  )
}
