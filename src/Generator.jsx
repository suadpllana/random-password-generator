import React from 'react'
import {useState} from "react"

const Generator = () => {

    const [result , setResult] = useState("")

    function generatePassword(){
        let lowercase = true;
        let uppercase = true;
        let symbols = false;
        let numbers = true
        let passwordLength = 10


        let lowercaseChars = "abcdefghijklmnopqrstuvwxyz"
        let uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        let symbolsChars = "!£$%^&*()_"
        let numbersChars = "0123456789"


        let allowedChars = ""
        let password =  ""

        allowedChars += lowercase ? lowercaseChars : ""
        allowedChars += uppercase ? uppercaseChars : "";
        allowedChars += symbols ? symbolsChars : ""
        allowedChars += numbers ? numbersChars : ""


        for(let i = 0; i < passwordLength; i++){
            const index = Math.floor(Math.random() * allowedChars.length)
            password += allowedChars[index]
        }
        setResult(password)

    }

  return (
    <div>
        <h1>Random Password Generator</h1>
      <button onClick={generatePassword}>Generate Password</button>
      <p>Generated Password: {result}</p>
    </div>
  )
}

export default Generator
