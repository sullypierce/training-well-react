import React from "react"
import { Button } from "./Button"

export const DeleteModal = (props) => {
   

    

    return (
        props.show ? 
        <div className="flex justify-center">
            <div className="fixed flex justify-center flex-row content-center border-2 rounded-md m-2 bg-gradient-to-tr from-red-700 to-purple-700">
                <div className="flex flex-col">
                    <p>Are you sure you want to delete this item?</p>
                    <div className="flex justify-center min-h-3">
                        <Button clickFunction={() => props.delete(props.item)} buttonText={'Yes'}  />
                        <Button clickFunction={props.closeModal} buttonText={'No'} />
                    </div>
                </div>
            </div>
        </div>
        
        : <></>
                        
                        
                    
                   
    )
}