import style from "./index.module.css"

const FilledButton = ({color, text}) => {

    return (
        <div>
            <button className={style.btn} style={{background: color}}>{text}</button>
        </div>
    )
}

export default FilledButton;