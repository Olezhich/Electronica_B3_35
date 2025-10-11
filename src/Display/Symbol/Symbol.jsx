import styles from './Symbol.module.css'

import {Dot, ASegment, BSegment, CSegment, 
    DSegment, ESegment, FSegment, GSegment,
} from "./Segment/Segments.jsx";

const SegmentHandler = (symbolStr, allowed) => {
    return (symbolStr && allowed.includes(symbolStr[0]));
}

function Symbol({symbolStr}){
    return(
        <div className={styles.symbol}>
            <Dot isOn={symbolStr && symbolStr.endsWith('.')} />
            <ASegment isOn={SegmentHandler(symbolStr, '02356789')} />
            <BSegment isOn={SegmentHandler(symbolStr, '01234789')} />
            <CSegment isOn={SegmentHandler(symbolStr, '013456789')} />
            <DSegment isOn={SegmentHandler(symbolStr, '0235689')} />
            <ESegment isOn={SegmentHandler(symbolStr, '0268')} />
            <FSegment isOn={SegmentHandler(symbolStr, '045689')} />
            <GSegment isOn={SegmentHandler(symbolStr, '2345689')} />
        </div>
    );
}

export default Symbol