import React from "react"
import { Button } from "./Button"

export const DeleteModal = (props) => {
   

    

    return (
        props.show ? 
        
            <div className="fixed">
            <p>Are you sure you want to delete this?</p>
            <div>
                <Button clickFunction={() => props.delete(props.item)} text={'Yes'} />
                <Button clickFunction={props.closeModal} text={'No'} />
            </div>
        </div>
        
        : <></>
                        
                        
                    
                   
    )
}