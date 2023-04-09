 import React from 'react'
 import Confetti from 'react-confetti'
 import Die from './die'
 import './tenzies.css'
 import {useState,useEffect} from 'react'
 
 const Tenzies = () => {
    const [newdice,setNewDice] = useState(allNewDice())
    const [tenzies,setTenzies] = useState(false)
    const [count,setCount] = useState(0)
    const [timeSeconds,setTimeSeconds] = useState(0)
    const [timeMinutes,setTimeMinutes] = useState(0)
    // localStorage.clear()
    const time = JSON.parse(localStorage.getItem("time")) || []



    function generateNewDie() {
        const randomNumber = Math.ceil(Math.random()*6)
        let value = []

        while(value.length < randomNumber){
            value.push(randomNumber)
        }

        return {
            value, 
            isHeld:false,
            id : Math.random()*10
        }   
    }

    function allNewDice() {
        const randomNumArray = []

        for(let i=0 ; i<10 ;i++) {
            randomNumArray.push(generateNewDie())
        };
        return (randomNumArray); 
    }


    function rollDice() {
        if(!tenzies){
            setNewDice(oldDice => oldDice.map(die => die.isHeld ? die : generateNewDie()))
            setCount(prevCount => prevCount + 1 )
        }else{
            setTenzies(false)
            setNewDice(allNewDice())
            setCount(0)
        }
      }
    
    function holdDice(id){
        setNewDice(newdice.map(die => die.id === id ? ({
            ...die, 
            isHeld:!die.isHeld
        }) : die 
        ))
      }


   const dices = newdice.map(dice => {
    return <Die 
                key = {dice.id}
                value = {dice.value}
                isHeld = {dice.isHeld}
                holdDice = {() => holdDice(dice.id)}
            />
   })
    

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTimeSeconds(prevTime => prevTime + 1 )
        }, 1000)
        return () => clearInterval(intervalId)
    }, [])

    if(timeSeconds > 59) {
        setTimeMinutes(prev => prev + 1) 
        setTimeSeconds(0)
        }

    useEffect(() => {
    const allHeld = newdice.every(die => die.isHeld)
    const firstValue = newdice[0].value.length
    const allTheSame = newdice.every(dice => dice.value.length === firstValue)

    if(allHeld && allTheSame){
        setTenzies(true)
        const newtime = {timeMinutes,timeSeconds}
        const timeArray = [...time,newtime]
        const sortByMinutes = timeArray.length > 3 ? timeArray.sort((a,b) => (a.timeMinutes - b.timeMinutes )).slice(-4,-1) : timeArray 
        localStorage.setItem("time",JSON.stringify(sortByMinutes))
        setTimeMinutes(0)
        setTimeSeconds(0)
    }
    },[newdice])

   
   return (
     <main>
        {tenzies && <Confetti/>}
        <h1 className='title'>Tenzies</h1>
        <h2 className='time'>{timeMinutes}:{timeSeconds < 10 ?`0${timeSeconds}`:timeSeconds}</h2>
        {   
            tenzies ? <p> Hurray !!! You Won</p> : <p className='instruction'> 
        Roll until all dice are the same. Click each die to freeze 
        it at it's current value between rolls</p>  
        }

        { tenzies ?  <div>
            <h3>Last three Scores</h3>
            <ol>{time.map(alltime => <li key={Math.random()*10000}>{alltime.timeMinutes} : {alltime.timeSeconds}</li>)}</ol></div> : 
        <div className='container'>
            {dices}
        </div>
        }
        <button onClick={rollDice}> { tenzies ? "New Game" : "Roll Dice" }</button>
        {tenzies && <p>Total Number of Rolls {count}</p>}
     </main>
   ) 
 }
 
 export default Tenzies