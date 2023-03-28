import {NavLink} from "react-router-dom"
import React from "react"
import styled from "styled-components"

const banner = "/Late night Digest.png"



function Home () {

    return (
        <>
            <BannerDiv>
                <Img src={banner} alt="site banner" />
            </BannerDiv>
        </>
    )
}


export default Home

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