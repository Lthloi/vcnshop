import React, { useRef, useState } from "react"
import { styled } from '@mui/material/styles'

const RenderTimeDisplay = (time_value, desc) => {
    return (
        <TimeWrapper>
            <TimeValue>{time_value}</TimeValue>
            <Desc>{desc}</Desc>
        </TimeWrapper>
    )
}

const time_to_countdown_in_ms = 432000000

const Notice = () => {
    const now_in_ms = new Date().getTime()
    const [now, setNow] = useState(now_in_ms)

    const total_time_in_ms = useRef(now_in_ms + time_to_countdown_in_ms)

    const countdown_in_ms = total_time_in_ms.current - now
    const days = Math.floor(countdown_in_ms / (1000 * 60 * 60 * 24))
    const hours = Math.floor((countdown_in_ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((countdown_in_ms % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((countdown_in_ms % (1000 * 60)) / 1000)

    if (countdown_in_ms > 0) setTimeout(() => { setNow(new Date().getTime()) }, 1000)

    return (
        <NoticeBar id="NoticeBar">
            <TextContainer>
                <Text>
                    The supper sale is comming in
                </Text>
                <CountDownDateDisplay>
                    {RenderTimeDisplay(days, 'Days')}
                    <Seperate>:</Seperate>
                    {RenderTimeDisplay(hours, 'Hours')}
                    <Seperate>:</Seperate>
                    {RenderTimeDisplay(minutes, 'Minutes')}
                    <Seperate>:</Seperate>
                    {RenderTimeDisplay(seconds, 'Seconds')}
                </CountDownDateDisplay>
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

const CountDownDateDisplay = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
}))

const TimeWrapper = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    columnGap: '10px',
})

const TimeValue = styled('div')({
    fontFamily: 'nunito',
    fontSize: '0.9em',
})

const Desc = styled('span')({
    fontFamily: 'nunito',
    fontSize: '0.9em',
})

const Seperate = styled('span')({
    margin: '0 10px',
    fontFamily: 'nunito',
})