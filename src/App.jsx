import { useState, useCallback, useEffect, useRef } from 'react'

import './App.css'

function App() {
  const [length,setLength] = useState(8);
  const [numberAllowed,setNumberAllowed] = useState(false);
  const [charAllowed,setCharAllowed] = useState(false);
  const [password,setPassword] = useState("");
  const [copied,setCopied] = useState(false);

  const passwordGenerator = useCallback(()=>{
    let pass="";
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(numberAllowed) str+="0123456789";
    if(charAllowed) str+="`~!@#$%^&*(){}[]|<>,.:;";

    for(let i=1;i<=length;i++){
      const char=parseInt(Math.random()*str.length+1)
      pass += str[char];
    }

    setPassword(pass)

  }, [length, numberAllowed, charAllowed, setPassword])

  useEffect(()=>{
    passwordGenerator();
  },[length,numberAllowed,charAllowed,passwordGenerator])

  //useRef hook
  const passwordRef= useRef(null);

  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select();//selects the entire input
    passwordRef.current?.setSelectionRange(0,9)//selects only upto 9 characters
    window.navigator.clipboard.writeText(password)
    setCopied(true);
    setTimeout(()=>setCopied(false),2000);
  },[password])

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-4 my-8 text-orange-500 bg-gray-700 flex flex-col justify-center'>
        <h1 className='text-4xl text-center text-white mb-4'>Password Generator</h1>
        
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input 
            type="text"
            value={password}
            className='outline-none w-full py-1 px-3 bg-white text-gray-800 placeholder-gray-400'
            placeholder='password'
            readOnly
            ref={passwordRef}
          />
          <button
            className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 bg-blue-700 active:scale-95"
            onClick={copyPasswordToClipboard}
          >{copied? '✔' : 'copy'}</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input
            type="range"
            min={6}
            max={15}
            value={length}
            className='cursor-pointer accent-blue-700'
            onChange={(e)=>{
              setLength(e.target.value)
            }}
            />
            <label>Length : {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input 
            type="checkbox"
            defaultChecked={numberAllowed}
            id="numberInput"
            onChange={()=>{
              setNumberAllowed((prev)=>!prev);
            }}
             />

             <label htmlFor="numberInput">Numbers</label>

             <input 
            type="checkbox"
            defaultChecked={charAllowed}
            id="charInput"
            onChange={()=>{
              setCharAllowed((prev)=>!prev);
            }}
             />

             <label htmlFor="charInput">Special characters</label>

          </div>
        </div>
      </div>
    </>
  )
}

export default App
