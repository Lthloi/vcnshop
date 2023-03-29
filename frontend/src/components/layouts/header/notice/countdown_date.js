import React, { useEffect, useState } from "react"
import { styled } from '@mui/material/styles'

const RenderTimeDisplay = (time_value, desc) => {
    return (
        <TimeWrapper>
            <TimeValue>
                {time_value}
            </TimeValue>
            <Desc>
                {desc}
            </Desc>
        </TimeWrapper>
    )
}

const CountDownDate = ({ totalTimeInMiliseconds }) => {
    const [now_in_ms, setNow] = useState(new Date().getTime())

    const left_in_ms = totalTimeInMiliseconds - now_in_ms
    const days = Math.floor(left_in_ms / (1000 * 60 * 60 * 24))
    const hours = Math.floor((left_in_ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((left_in_ms % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((left_in_ms % (1000 * 60)) / 1000)

    useEffect(() => {
        const timer = setInterval(() => {
            setNow(new Date().getTime())
        }, 1000)
        return () => clearInterval(timer)
    }, [totalTimeInMiliseconds])

    return (
        <CountDownDateDisplay id="CountDownDateDisplay">
            {RenderTimeDisplay(days, 'Days')}
            <Seperate>:</Seperate>
            {RenderTimeDisplay(hours, 'Hours')}
            <Seperate>:</Seperate>
            {RenderTimeDisplay(minutes, 'Minutes')}
            <Seperate>:</Seperate>
            {RenderTimeDisplay(seconds, 'Seconds')}
        </CountDownDateDisplay>
    )
}

export default CountDownDate

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