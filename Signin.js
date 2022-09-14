import { text } from "body-parser";
import React from "react";

function Signin(){
    return(
        <div>
            <form>
                <label>UserName : </label>
                <input type={text} placeholder="Enter Your Username" maxLength={50}/>
                <label>Password : </label>
                <input type={password} placeholder="Enter Your Password"/>
            </form>
        </div>
    );
}
export default Signin