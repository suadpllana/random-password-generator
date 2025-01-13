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
    function handleChangeChecker(password){
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
      <div className="card-container">
        <div className="card-header">
        <h2 >Random Password Generator</h2>
        </div><br />
        <label className="password-length" htmlFor="">Password Length: <br /></label><input onChange={(e) => handleChange(e)} type="number" defultvalue={passwordLength} min={10} max={20} /><br /><br />
        <div className="conditions-container">
          <div>
          <label htmlFor="">Lowercase</label><input onClick={() => setLowercase(prev => !prev)} type="checkbox" /><br />
          <label htmlFor="">Uppercase</label><input onClick={() => setUppercase(prev => !prev)} type="checkbox" /><br />
          </div>
          <div>
          <label htmlFor="">Symbols</label><input onClick={() => setSymbols(prev => !prev)} type="checkbox" /><br />
          <label htmlFor="">Numbers</label><input onClick={() => setNumbers(prev => !prev)} type="checkbox" /><br /><br />
          </div>
        </div>
       
        
        
      <button onClick={generatePassword}>Generate Password</button><br /><br />
  
      </div>
      {result &&
      <div className="generated-password">
        <>
        <h2>Generated Password: </h2><br />
      <h3>{result}  <span onClick={copy} className="copy">📝
        <span className="tooltip">{isCopied ? "Copied" : "Copy"}</span>
        </span></h3>
    
        </>
      
      </div>
       
      }
     <h2>Password strength checker</h2>
     <input placeholder="Write password here" type="text" onChange={(e) => handleChangeChecker(e.target.value)}/>
     <p className={passwordClass}>{passwordChecker}</p>
    </div>
  )
}

export default Generator
