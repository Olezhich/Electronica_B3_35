import Symbol from "./Symbol/Symbol.jsx";
import styles from "./Display.module.css";

function Display({Str}) {
    const normalized = Str.padEnd(12, ' ').substring(0, 12);

    const chars = normalized.split('').map((char, index) => (
        <Symbol symbolStr={char} key={index} />
    ));

    return(
        <div className={styles.display}>
            <div className={styles.symbolsContainer}>
                {chars}
            </div>
        </div>
    );
}

export default Display