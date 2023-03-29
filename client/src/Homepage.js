import {NavLink} from "react-router-dom"
import React, { useState, useEffect } from "react"
import styled from "styled-components"

// const banner = "/Late night Digest.png"



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
                    <Img src="/Late-night-digest.png" alt="site banner" />
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

const Main = styled.div``

const BannerDiv = styled.div`
display: flex;
flex-direction: column;
align-items: center;
height: 20em;
`

const Img = styled.img`
margin-top: 1em;
width: 100%;
`

const BlogDiv = styled.div`

background-color: gray;
`