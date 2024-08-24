'use client'

import { firestore } from "@/firebase";
import getStripe from '@/utils/get-stripe'
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Typography, AppBar, Grid, Box, Button, Toolbar } from "@mui/material";

export default function Home() {
    const handleSubmit = async () => {
        const checkoutSession = await fetch('/api/checkout_sessions', {
            method: 'POST',
            headers: { origin: 'http://localhost:3000' },
        })
        const checkoutSessionJson = await checkoutSession.json()

        const stripe = await getStripe()
        const { error } = await stripe.redirectToCheckout({
            sessionId: checkoutSessionJson.id,
        })

        if (error) {
            console.warn(error.message)
        }
    }


    return (
        <Box>
            <AppBar position="static" sx={{ bgcolor: 'primary.main' }}>
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Flashcard SaaS
                    </Typography>
                    <SignedOut>
                        <Button color="inherit" href="/sign-in">Login</Button>
                        <Button color="inherit" href="/sign-up">Sign Up</Button>
                    </SignedOut>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                </Toolbar>
            </AppBar>
            <Box sx={{ textAlign: 'center', my: 4 }}>
                <Typography variant="h2" component="h1" gutterBottom>
                    Welcome to myFlashCards
                </Typography>
                <Typography variant="h5" component="h2" gutterBottom>
                    The easiest way to create flashcards from your text.
                </Typography>
                <Button variant="contained" color="primary" sx={{ mt: 2, mr: 2 }} href="/generate">
                    Get Started
                </Button>
                <Button variant="outlined" color="primary" sx={{ mt: 2 }}>
                    Learn More
                </Button>
            </Box>
            <Box sx={{ my: 6 }}>
                <Typography variant="h4" component="h2" gutterBottom>Features</Typography>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={4}>
                        <Typography variant="h6" gutterBottom>Easy Text Input</Typography>
                        <Typography>
                            Simply enter your text and wait! As easy as it gets.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Typography variant="h6" gutterBottom>Flashcard Generation</Typography>
                        <Typography>
                            Our AI algorithm will generate the best flashcards for you.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Typography variant="h6" gutterBottom>Accessibility</Typography>
                        <Typography>
                            Accessible Anywhere Anytime!
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{ my: 6, textAlign: 'center' }}>
                <Typography variant="h4" component="h2" gutterBottom>Pricing</Typography>
                <Grid container spacing={4} justifyContent="center">
                    <Grid item xs={12} md={4}>
                        <Box sx={{
                            p: 3,
                            border: '1px solid',
                            borderColor: 'grey.300',
                            borderRadius: 2,
                            boxShadow: 3,
                            textAlign: 'center',
                        }}>
                            <Typography variant="h5" gutterBottom>Individual</Typography>
                            <Typography variant="h5">$5 / month</Typography>
                            <Typography>
                                Access to basic features and limited storage
                            </Typography>
                            <Button variant="contained" color="primary" sx={{ mt: 2 }}>Choose Basic</Button>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Box sx={{
                            p: 3,
                            border: '1px solid',
                            borderColor: 'grey.300',
                            borderRadius: 2,
                            boxShadow: 3,
                            textAlign: 'center',
                        }}>
                            <Typography variant="h5" gutterBottom>Pro</Typography>
                            <Typography variant="h5">$10 / month</Typography>
                            <Typography>
                                Access to advanced features and large storage
                            </Typography>
                            <Button variant="contained" color="primary" sx={{ mt: 2 }}>Choose Pro</Button>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Box sx={{
                            p: 3,
                            border: '1px solid',
                            borderColor: 'grey.300',
                            borderRadius: 2,
                            boxShadow: 3,
                            textAlign: 'center',
                        }}>
                            <Typography variant="h5" gutterBottom>Business</Typography>
                            <Typography variant="h5">$25 / month</Typography>
                            <Typography>
                                Latest models and storage support with Scaling
                            </Typography>
                            <Button variant="contained" color="primary" sx={{ mt: 2 }}>Choose Business</Button>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}