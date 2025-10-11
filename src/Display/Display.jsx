import Symbol from "./Symbol/Symbol.jsx";
import styles from "./Display.module.css";

function Display({Str}) {
    const normalized = Str.padEnd(12, ' ').substring(0, 12);

    const chars = normalized.split('').map((char, index) => (
        <Symbol symbolStr={char} key={index} />
    ));

    return(
        <div className={styles.display}>
            {/* <svg className={styles.svgBackground} viewBox="0 0 1500 600" >
                <rect x="0" y="60" width="1500" height="500" rx="120"/>
            </svg> */}
            <div className={styles.symbolsContainer}>
                {chars}
            </div>
        </div>
    );
}

export default Display