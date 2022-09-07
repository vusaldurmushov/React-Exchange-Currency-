import React, { useState } from 'react'
import "./card.css"
import dollar from "../assets/image/dollar1.svg"
import euro from "../assets/image/euro1.svg"
import rubl from "../assets/image/rubl1.svg"
import tl from "../assets/image/tl1.svg"
import arrows from "../assets/image/arrows.svg"

function Card({ data }) {
    const commons = ["USD", "RUB", "TRY", "EUR"]
    const [rate, setRate] = useState({
        from: "",
        to: ""
    })
    const [error, setError] = useState({
        from: "",
        to: ""
    })
    const [input, setInput] = useState("")
    const [result, setResult] = useState({})

    const setValue = (e) => {
        const { name, value } = e.target
        setRate({ ...rate, [name]: value })
        setError({ ...error, [name]: "" })
    }

    const exchangeItem = () => {
        if (rate.from.length < 1) {
            setError({ ...error, from: "Choose Currency" })
        }
        else if (rate.to.length === 0) {
            setError({ ...error, to: "Choose Currency" })
        } else {
            fetch(`https://v6.exchangerate-api.com/v6/c6ba42697f9447f9e7cf8b2c/latest/${rate.from}`)
                .then(res => res.json())
                .then(a => {
                    let obj = {
                        [rate.to]: (a.conversion_rates[rate.to] * input).toFixed(2)
                    }
                    commons.map(e => {
                        obj[e] = (a.conversion_rates[e] * input).toFixed(2)
                    })

                    setResult(obj)
                })
        }
    }
    console.log(result)


    return (



        <div className="body">

            <div className="main">
                <div className="select">



                    <select style={{ cursor: "pointer" }} name="from" onChange={(e) => setValue(e)} defaultValue="">
                        <option value="" disabled>Choose Currency</option>
                        {
                            Object.keys(data).map((index, key) => (

                                <option key={key} value={index}>{index}</option>
                            ))
                        }
                    </select>

                    {
                        error.from.length > 0 ?
                            <span className='errors'>{error.from}</span> : ""
                    }

                    <span><i className="fa-solid fa-right-left"></i></span>
                    <select style={{ cursor: "pointer" }} name="to" onChange={(e) => setValue(e)} defaultValue="">
                        <option value="" disabled>Choose Currency</option>

                        {
                            Object.keys(data).map((index, key) => (

                                <option key={key} value={index}>{index}</option>
                            ))
                        }

                    </select>
                    {
                        error.to.length > 0 ?
                            <span className='error' >{error.to}</span> : ""
                    }



                </div>

                <div className="amount">
                    <p>Amount</p>
                    <div className="cal">
                        <div className="cal1">
                            <input type="number" onChange={(e) => setInput(e.target.value)} />
                        </div>
                        <div className="cal2">
                            <button onClick={() => exchangeItem()}> <img style={{ cursor: "pointer" }} src={arrows} alt="" /> </button>
                        </div>

                    </div>
                    <p>{result[rate.to]}{[rate.to]}</p>

                </div>

                <div className="other">
                    <div className="other-img">
                        <img src={dollar} alt="" />
                    </div>
                    <span>Dollar</span>
                    <span>{result.USD}</span>
                </div>
                <div className="other">
                    <div className="other-img">
                        <img src={euro} alt="" />
                    </div>
                    <span>Euro</span>
                    <span>{result.EUR}</span>
                </div>
                <div className="other">
                    <div className="other-img">
                        <img src={tl} alt="" />
                    </div>
                    <span>Tl</span>
                    <span>{result.TRY}</span>
                </div>
                <div className="other">
                    <div className="other-img">
                        <img src={rubl} alt="" />
                    </div>
                    <span>Rubl</span>
                    <span>{result.RUB}</span>
                </div>





            </div>

        </div>

    )
}

export default Card