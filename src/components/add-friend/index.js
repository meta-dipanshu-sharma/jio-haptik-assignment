import React, { useState } from "react";
import './style.css'

const AddFriend = (props) => {
    const [friend, setFriend] = useState("")

    const handleAddFriend = (e) => {
        if (e.charCode === 13) {
            if (friend) {
                props.handleAddFriend(friend)
                setFriend("")
            } else {
                alert("Please write a name to add as a friend !!")
            }
        }
    }

    return (
        <div className="add-friend">
            <input
                value={friend}
                onChange={e => setFriend(e.target.value)}
                onKeyPress={e => handleAddFriend(e)}
                placeholder="Enter your friend's name">
            </input>
        </div>
    )
}

export default AddFriend;