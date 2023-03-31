import {NavLink} from "react-router-dom"
import React, { useState, useEffect } from "react"
import styled from "styled-components"

import LoadingSpinner from "./LoadingSpinner"


const coffee = "./img.jpg"


function Home () {
    const [mostRecentPost, setMostRecentPost] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

useEffect(() => {
    fetch('/api/blogpost/recent')
        .then((res) => res.json())
        .then(data => {
            console.log(data)
            setMostRecentPost(data.message[0]);
            setIsLoading(false);
        })

        .catch(error => console.error(error))
}, [])

const handleClick = () => {
    window.open("https://www.youtube.com/watch?v=xvFZjo5PgG0")
};


    return (
        <>
            <Main>
                {isLoading ? (
                    <LoadingDiv><LoadingSpinner /></LoadingDiv>
                ) : (
                    <ContentDiv>
                        <Nav to="/blog">
                            <BlogDiv>
                                {mostRecentPost && (
                                    <div>
                                        <PostContent>{mostRecentPost.content}</PostContent>
                                        <Posttime>{mostRecentPost.date}</Posttime>
                                    </div>
                                )}
                            </BlogDiv>
                        </Nav>
                        <About>
                            <ImgDiv>
                                <Img src={coffee} />
                            </ImgDiv>
                            <TextDiv>
                                <h1>Late Night Digest</h1>
                                <p>Just our opinions/takes on a variety of different topics and issues.</p>
                                <Button onClick={handleClick}>
                                    Subscribe to our YouTube Channel!
                                </Button>
                            </TextDiv>
                        </About>
                    </ContentDiv>
                )}
            </Main>
        </>
    )
}


export default Home

const Main = styled.div`
display: flex;
flex-direction: column;
height: 90vh;
`

const LoadingDiv = styled.div`
display: flex;
justify-content: center;
`

const Nav = styled(NavLink)`
text-decoration: none;
width: 40%;
height: 5em;
`

const ContentDiv = styled.div`
display: flex;
flex-direction: row;
height: 100%;
`

const BlogDiv = styled.div`
color: white;
background-color: #D0B8A8;
padding: 2em;
flex-grow: 1;
`

const PostContent = styled.p`
font-size: 18px;
color: black;
`

const Posttime = styled.p`
font-size: 12px;
color: black;
`

const About = styled.div`
background-color: #DFD3C3;
width: 60%;
display: flex;
flex-direction: row;
gap: 4em;
justify-content: center;
align-items: center;
`

const ImgDiv = styled.div`

`

const Img = styled.img`
width: 15em;
height: auto;
`

const TextDiv = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`

const Button = styled.button`
border: none;
padding: 2em;
border-radius: 5em;
background-color: #7D6E83;
color: white;
font-size: 15px;
margin-top: 3em;
justify-content: center;
`