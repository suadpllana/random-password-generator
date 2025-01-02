import React from 'react'
import {useState} from "react"

const Generator = () => {

    const [result , setResult] = useState("")
    const [ lowercase, setLowercase] = useState(false)
    const [ uppercase, setUppercase] = useState(false)
    const [ symbols, setSymbols] = useState(false)
    const [ numbers, setNumbers] = useState(false)
    const [passwordLength , setPasswordLength] = useState(8)
    const [isCopied , setIsCopied] = useState(false)
    const [passwordChecker , setPasswordChecker] = useState("")
    const [passwordClass , setClass] = useState("")


    function generatePassword(){
  
       


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
        if(allowedChars === "") {
          alert("Please select one of the fields below")
          return
        }
        if(passwordLength < 8 || passwordLength > 20) {
          alert("Minimum password length is 8 and maximum is 20")
          return
        }


        for(let i = 0; i < passwordLength; i++){
            const index = Math.floor(Math.random() * allowedChars.length)
            password += allowedChars[index]
        }
        setResult(password)
        setIsCopied(false)
    }
    function handleChange(e) {
      setPasswordLength(e.target.value)
    }
    function copy(){
      navigator.clipboard.writeText(result)
      setIsCopied(true)
    }
    function handleChange(password){
      if(password === ""){
        setPasswordChecker("");
        return
      }
      const weakRegex = /^.{0,7}$|^[a-zA-Z]+$|^\d+$/;
      const mediumRegex = /^(?=.*[a-zA-Z])(?=.*\d)|(?=.*[a-zA-Z])(?=.*[@$!%*?&#])|(?=.*\d)(?=.*[@$!%*?&#]).{8,}$/;
      const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{10,}$/;
      if(weakRegex.test(password)){
        setPasswordChecker("Password is weak")
        setClass("weak")
      }
      if(mediumRegex.test(password)){
        setPasswordChecker("Password is medium")
        setClass("medium")
      }
      if(strongRegex.test(password)){
        setPasswordChecker("Password is strong")
        setClass("strong")
      }
    }

  return (
    <div>
        <h1>Random Password Generator</h1>
        <label htmlFor="">Lowercase</label><input onClick={() => setLowercase(prev => !prev)} type="radio" /><br />
        <label htmlFor="">Uppercase</label><input onClick={() => setUppercase(prev => !prev)} type="radio" /><br />
        <label htmlFor="">Symbols</label><input onClick={() => setSymbols(prev => !prev)} type="radio" /><br />
        <label htmlFor="">Numbers</label><input onClick={() => setNumbers(prev => !prev)} type="radio" /><br /><br />
        <label htmlFor="">Password Length: </label><input onChange={(e) => handleChange(e)} type="number" value={passwordLength} min={10} max={20} /><br /><br />
      <button onClick={generatePassword}>Generate Password</button><br /><br />
      <p>Generated Password: {result ? 
      <>
      <span>{result}</span>
      <span onClick={copy} className="copy">📝
        <span className="tooltip">{isCopied ? "Copied" : "Copy"}</span>
        </span>  </>
      
     : ""}</p>

     <h2>Password strength checker</h2>
     <input placeholder="Write password here" type="text" onChange={(e) => handleChange(e.target.value)}/>
     <p className={passwordClass}>{passwordChecker}</p>
    </div>
  )
}

export default Generator
