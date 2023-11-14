'use client'
import {FunctionComponent, useEffect, useState} from 'react'

type TimeDifferenceProps = {since: number}

const timeFormatter = new Intl.RelativeTimeFormat('en', {numeric: 'auto'});
const prettifyTimeUnit = (diff: number, type: Intl.RelativeTimeFormatUnit) => {
    const {value} = timeFormatter.formatToParts(diff, type)
        .find(({type}) => type === 'integer') || {value: 0}
    return value + ' ' + type
}

export const TimeDifference: FunctionComponent<TimeDifferenceProps> = ({since}) => {
    const [isMounted, setIsMounted] = useState(false);
    const [difference, setDifference] = useState(Math.round((+new Date() - since) / 1000))

    useEffect(() => {
        setIsMounted(true)
        const interval = setInterval(() => {
            setDifference(Math.round((+new Date() - since) / 1000))
        }, 1000);

        return () => {
            clearInterval(interval)
        }
    },[])

    const prettyTimeDifference = `
      ${prettifyTimeUnit(difference % 60, 'seconds')}, 
      ${prettifyTimeUnit((difference / 60) % 60, 'minutes')} and
      ${prettifyTimeUnit((difference / 60 / 60) , 'hours')}
   `
    return (
        <p>
            Page rendered {isMounted ? `${prettyTimeDifference} ago` : 'just now'}
        </p>
    )
}