import React, { useState } from "react";
import './style.css'

const FriendMenuBar = (props) => {
    const [searchQuery, setSearchQuery] = useState("")

    const handleSearch = (e) => {
        if (e.charCode === 13) {
            if (searchQuery) {
                e.preventDefault();
                props.handleFriendSearch(searchQuery)
            } else {
                alert("Enter a friend name to search !!")
            }
        }
    }

    const handleSortByFavorites = () => {
        if (props.isFriendListAvailable) {
            props.handleSortByFavorites()
        } else {
            alert("Friend list is empty !!")
        }
    }

    const handleClear = () => {
        if (searchQuery) {
            props.handleClear()
            setSearchQuery("")
        } else {
            alert("Nothing to clear. Search is empty !!")
        }
    }

    return (
        <div className="friend-menu-bar">
            <div className="search-bar">
                <input
                    placeholder="Enter friend name to search" value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    onKeyPress={e => handleSearch(e)}>
                </input>
                <button className="clear-btn" onClick={handleClear}>Clear</button>
            </div>
            <div className="sort-btn">
                <button onClick={handleSortByFavorites}>Sort By Favorite</button>
            </div>
        </div>
    )
}

export default FriendMenuBar;