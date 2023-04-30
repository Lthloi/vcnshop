import React, { useEffect, useState } from "react"
import { styled } from '@mui/material/styles'
import CountDown from './countdown_date'

const Notice = () => {
    const time_to_countdown = 432000000 //in ms
    const now_in_ms = new Date().getTime()
    const [totalTimeInMiliseconds, setTimeInMiliseconds] = useState(0)

    useEffect(() => {
        setTimeInMiliseconds(now_in_ms + time_to_countdown)
    }, [time_to_countdown])

    return (
        <NoticeBar id="NoticeBar">
            <TextContainer>
                <Text>
                    The supper sale is comming in
                </Text>
                <CountDown totalTimeInMiliseconds={totalTimeInMiliseconds} />
            </TextContainer>
        </NoticeBar>
    )
}

export default Notice

const NoticeBar = styled('div')({
    display: 'flex',
    background: '#f0f0f0',
    padding: '5px 0',
    color: 'black',
    overflow: 'hidden',
})

const TextContainer = styled('div')({
    display: 'flex',
    alignItems: 'center',
    margin: 'auto',
    columnGap: '10px',
})

const Text = styled('p')({
    margin: '0',
    fontFamily: '"Montserrat", "sans-serif"',
    fontSize: '0.9em',
    fontWeight: 'bold',
})