import styles from './Segment.module.css'

export function Dot({isOn}){
    return(
        <svg className={`${styles.off} ${isOn ? styles.on : ''}`} viewBox='0 0 100 200'>
            <circle cx='89' cy='190' r='10' />
            <circle cx='90' cy='180' r='10' />
            <polygon points="80,180 100,180 99,190 79,190"/>
        </svg>
    );
}

export function ASegment({isOn}){
    return (
        <svg className={`${styles.off} ${isOn ? styles.on : ''}`} viewBox='0 0 100 200'>
            <polygon points="23,40 27,20 74,20 59,40"/>
        </svg>
    );
}

export function BSegment({isOn}){
    return (
        <svg className={`${styles.off} ${isOn ? styles.on : ''}`} viewBox='0 0 100 200'>
            <polygon points="78,90 90,20 68,60 63,90"/>
        </svg>
    );
}

export function CSegment({isOn}){
    return (
        <svg className={`${styles.off} ${isOn ? styles.on : ''}`} viewBox='0 0 100 200'>
            <polygon points="58,137 75,115 67,180 55,160"/>
        </svg>
    );
}

export function DSegment({isOn}){
    return (
        <svg className={`${styles.off} ${isOn ? styles.on : ''}`} viewBox='0 0 100 200'>
            <polygon points="3,160 52,160 64,180 0,180"/>
        </svg>
    );
}

export function ESegment({isOn}){
    return (
        <svg className={`${styles.off} ${isOn ? styles.on : ''}`} viewBox='0 0 100 200'>
            <polygon points="10,115 25,115 20,148 5,148"/>
        </svg>
    );
}

export function FSegment({isOn}){
    return (
        <svg className={`${styles.off} ${isOn ? styles.on : ''}`} viewBox='0 0 100 200'>
            <polygon points="16,90 22,50 37,50 31,90"/>
        </svg>
    );
}

export function GSegment({isOn}){
    return (
        <svg className={`${styles.off} ${isOn ? styles.on : ''}`} viewBox='0 0 100 200'>
            <path d="M27,100 L35,108 L53,108 L61,100 L53,92 L35,92 Z"/>
        </svg>
    );
}




