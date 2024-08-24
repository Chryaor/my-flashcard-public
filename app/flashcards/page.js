import React, { useState, useEffect } from 'react'; // React hooks
import { Container, Grid, Card, CardActionArea, CardContent, Typography, Box } from '@mui/material'; // Material-UI components
import { useUser } from '@clerk/nextjs'; // Replace with your authentication library, e.g., '@clerk/nextjs' or '@auth0/nextjs-auth0'
import { useSearchParams } from 'next/navigation'; // For accessing search parameters in Next.js
import { collection, doc, getDocs } from 'firebase/firestore'; // Firestore functions
import { db } from '../../firebase'; 
import { useRouter } from 'next/router';

export default function Flashcard() {
    const { isLoaded, isSignedIn, user } = useUser()
    const [flashcards, setFlashcards] = useState([])
    const [flipped, setFlipped] = useState({})
    

    const searchParams = useSearchParams()
    const search = searchParams.get('id')

    const handleCardClick = (id) => {
        setFlipped((prev) => ({
            ...prev,
            [id]: !prev[id],
        }))
    }

    useEffect(() => {
        async function getFlashcard() {
            if (!search || !user) return

            const colRef = collection(doc(collection(db, 'users'), user.id), search)
            const docs = await getDocs(colRef)
            const flashcards = []
            docs.forEach((doc) => {
                flashcards.push({ id: doc.id, ...doc.data() })
            })
            setFlashcards(flashcards)
        }
        getFlashcard()
    }, [search, user])
    return (
        <Container maxWidth="md">
            <Grid container spacing={3} sx={{ mt: 4 }}>
                {flashcards.map((flashcard) => (
                    <Grid item xs={12} sm={6} md={4} key={flashcard.id}>
                        <Card>
                            <CardActionArea onClick={() => handleCardClick(flashcard.id)}>
                                <CardContent>
                                    <Box sx={{ 
                                        perspective: '1000px',
                                        '& > div': {
                                            transition: 'transform 0.6s',
                                            transformStyle: 'preserve-3d',
                                            position: 'relative',
                                            width: '100%',
                                            height: '200px',
                                            boxShadow: '0 4px 8px 0 rgba(0,0,0, 0.2)',
                                            transform: flipped[index]? 'rotateY(180deg)' : 'rotateY(0deg)',
                                        },'& > div > div': {
                                            
                                            position: 'absolute',
                                            width: '100%',
                                            height: '100%',
                                            boxShadow: '0 4px 8px 0 rgba(0,0,0, 0.2)',
                                           backfaceVisibility: "hidden",
                                           display: "flex",
                                           justifyContent: "center",
                                           alignItems:"center",
                                           padding: 2,
                                           bocSizing: 'border-box'
                                        },
                                        '& > div > div:nth-of-type(2)':{
                                            transform: 'rotateY(180deg)'
                                        }
                                     }}>
                                        <div>
                                            <div>
                                                <Typography variant="h5" component="div">
                                                    {flashcard.front}
                                                </Typography>
                                            </div>
                                            <div>
                                                <Typography variant="h5" component="div">
                                                    {flashcard.back}
                                                </Typography>
                                            </div>
                                        </div>
                                    </Box>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}