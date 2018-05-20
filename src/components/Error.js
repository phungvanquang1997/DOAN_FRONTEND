import React from 'react'
import { Link } from 'react-router-dom'

const Err = () => (
    <div>

        <h4 className="text-center bold size24 margin0auto">
            <img src="https://cdn0.iconfinder.com/data/icons/emoticons-round-smileys/137/Emoticons-14-512.png" className="w250h250"/>
            <p>You dont' have a token , liuliu :(</p>
            <p className="fontcolor">Sign in you will get it</p>
            <Link to="/home/login">Back</Link>
        </h4>

    </div>
)

export default Err
