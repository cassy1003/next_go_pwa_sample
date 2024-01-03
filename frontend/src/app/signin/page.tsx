'use client'
import { Avatar, Link, Grid, Box, Typography, Container } from '@mui/material'
import { Button, TextField, FormControlLabel, Checkbox } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { setCookie, getCookie } from 'cookies-next'

export default async function SignIn() {
  const token = getCookie('token')
  if (token) {
    console.log(token)
    const r = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + '/api/users/role', {
      method: "GET",
      mode: "cors",
      headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json"
      }
    })
    const r2 = await r.json()
    console.log(r2)
  } else {
    console.log("Don't have token")
  }


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const res = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + '/api/login', {
      method: "POST",
      body: new FormData(event.currentTarget)
    })
    const d = await res.json()
    setCookie('token', d.token, {expires: new Date(d.expire)})
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
