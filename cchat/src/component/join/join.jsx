import React, { useState } from 'react';
import './Join.css';
import logos from "../../images/logos.jpg";
import { Link } from 'react-router-dom';

let user;

const sendUser = () => {
    user = document.getElementById('joininput').value;
    document.getElementById('joininput').value = "";
}

const Join = () => {
    const [name, setName] = useState("");
    return (
        <div className="JoinPage">
            <div className="JoinContainer">
                <img src={logos} alt="..." /> 
                <h1> C CHAT</h1>
                <input onChange={(e) => setName(e.target.value)} placeholder='Enter Your Name' type="text" id='joininput' />
                <Link onClick={(e) => !name ? e.preventDefault() : null} to="/chat"> <button onClick={sendUser} className='joinbtn'>Login</button> </Link>
            </div>
        </div>
    );
}
export default Join;
export { user };