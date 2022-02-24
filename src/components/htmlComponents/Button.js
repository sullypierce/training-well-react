import React from "react"

export const Button = (props) => {
   

    

    return (
                        <button className="btn btn-3 card_button"
                                    onClick={props.clickFunction}
                                    >{props.buttonText}</button>
                   
    )
}