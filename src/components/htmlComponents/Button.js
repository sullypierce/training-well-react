import React from "react"

export const Button = (props) => {
   

    

    return (
                        <button className="basis-1/6 bg-slate-200"
                                    onClick={props.clickFunction}
                                    >{props.buttonText}</button>
                   
    )
}