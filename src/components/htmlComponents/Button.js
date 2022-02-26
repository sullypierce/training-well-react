import React from "react"

export const Button = (props) => {
   

    

    return (
                        <button className={`basis-1/6 border-orange-800 border-2 rounded-xl bg-gradient-to-tr from-orange-400 to-orange-700
                         hover:shadow-2xl m-1 hover:bg-orange-800 hover:text-amber-400 ${props.classes}`}
                                    onClick={props.clickFunction}
                                    >{props.buttonText}</button>
                   
    )
}