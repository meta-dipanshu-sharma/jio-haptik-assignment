import React from "react";
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { RiDeleteBinLine } from 'react-icons/ri';
import './style.css'

const FriendRow = (props) => {
    const { friendList, searchedFriendList, handleFavorite, handleDelete, currentPage } = props
    const currentPageForPagination = currentPage - 1
    const data = searchedFriendList.length ?
        searchedFriendList.slice(currentPageForPagination * 4, currentPageForPagination * 4 + 4) :
        friendList.slice(currentPageForPagination * 4, currentPageForPagination * 4 + 4)

    return (
        <div className="friend-list-table">
            {data.length ? data.map((friend, id) => {
                return <div className="friend-row" key={id}>
                    <div className="friend-detail">
                        <div className="friend-name">{friend.name}</div>
                        <div className="friend-caption">is your friend</div>
                    </div>
                    <div className="friend-action">
                        <div onClick={() => handleFavorite(friend.name)}>
                            {friend.isFavorite ? <AiFillStar /> : <AiOutlineStar />}
                        </div>
                        <div onClick={() => handleDelete(friend.name)}>
                            <RiDeleteBinLine />
                        </div>
                    </div>
                </div>
            }) :
                <div className="friend-row">
                    <div className="no-friend">No friend added</div>
                </div>}
        </div>
    )
}

export default FriendRow;