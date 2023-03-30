import {NavLink} from "react-router-dom"
import React, { useState, useEffect } from "react"
import styled from "styled-components"
import GlobalStyle from "./GlobalStyles"



function Home () {
    const [mostRecentPost, setMostRecentPost] = useState(null)

useEffect(() => {
    fetch('/api/blogpost/recent')
        .then((res) => res.json())
        .then(data => setMostRecentPost(data.message[0]))
        .catch(error => console.error(error))
}, [])


    return (
        <>
            <Main>
                <BannerDiv>
                    <Img src="/banner.jpg" alt="site banner" />
                </BannerDiv>
                <BlogDiv>
                    {mostRecentPost && (
                        <div>
                            <p>{mostRecentPost.content}</p>
                            <p>{mostRecentPost.date}</p>
                        </div>
                    )}
                </BlogDiv>
            </Main>
        </>
    )
}


export default Home

const Main = styled.div`
display: flex;
flex-direction: column;
border: 2px solid #8DA7BE;
`

const NavBar = styled.div`

`

const BannerDiv = styled.div`

`

const Img = styled.img`
margin-top: 1em;
width: 100%;
`

const BlogDiv = styled.div`
color: white;
background-color: #603601;
`