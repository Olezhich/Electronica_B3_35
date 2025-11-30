import Symbol from "./Symbol/Symbol.jsx";
import styles from "./Display.module.css";

function Display({Str}) {
    const chars = (Str) =>{
        let i = 0;
        let symbols = [];
        while(i < Str.length && symbols.length < 12){
            let char = Str[i];
            i++;
            if(Str[i] === '.' || Str[i] === 'm'){
                char += Str[i];
                i++;
            }
            symbols.push(char);
        }
        while (symbols.length < 12) {
            symbols.push(' ');
        }
        return(symbols);
    };

    const symbols = chars(Str);

    const DisplayChars = symbols.map((part, idx) => (
        <Symbol symbolStr={part} key={idx} />
    ));

    return(
        <div className={styles.display}>
            <div className={styles.symbolsContainer}>
                {DisplayChars}
            </div>
            <svg className={styles.svgBackground} viewBox='0 0 300 100'>
                <rect width="100%" height="100%" rx="20" ry="20" />
            </svg>
        </div>
    );
}

export default Display