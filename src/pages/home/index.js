import React, { useEffect, useState } from "react";
import FriendRow from "../../components/friend-row";
import AddFriend from "../../components/add-friend";
import FriendMenuBar from "../../components/friend-menu";
import { GrFormNext, GrFormPrevious, GrClose } from 'react-icons/gr';
import './style.css'

const Home = () => {
    const [friendList, setFriendList] = useState([])
    const [searchedFriendList, setSearchedFriendList] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, setTotalPage] = useState(1)
    const [openDeleteModal, setToggleDeleteModal] = useState(false)
    const [deleteItemName, setDeleteItemName] = useState("")

    useEffect(() => {
        const handlePagination = () => {
            const totalItems = searchedFriendList.length ? searchedFriendList.length : friendList.length
            const divider = Math.ceil(totalItems / 4);
            divider ? setTotalPage(divider) : setTotalPage(1)
        }
        handlePagination()
    }, [friendList, searchedFriendList])

    const handlePageUp = () => {
        if (currentPage !== totalPage)
            setCurrentPage((currentPage) => currentPage + 1)
    }

    const handlePageDown = () => {
        if (currentPage !== 1)
            setCurrentPage((currentPage) => currentPage - 1)
    }

    const handleFriendSearch = (value) => {
        const searchedFriend = friendList.find(friend => friend.name === value)
        if (searchedFriend) {
            setSearchedFriendList([searchedFriend])
        } else {
            setSearchedFriendList([])
            alert(`No friend exist with name: ${value}`)
        }
    }

    const handleAddFriend = (value) => {
        const findIndex = friendList.find(friend => friend.name === value)
        if (findIndex) {
            alert(`Friend already exist with name: ${value}`)
        } else {
            const data = { name: value, isFavorite: false }
            setFriendList([...friendList, data])
        }
    }

    const handleSortByFavorites = () => {
        const sortedList = friendList.sort((a, b) => b.isFavorite - a.isFavorite)
        setFriendList([...sortedList])
        setCurrentPage(1)
    }

    const handleDeleteModalToggal = (name) => {
        openDeleteModal ? setDeleteItemName("") : setDeleteItemName(name)
        setToggleDeleteModal(!openDeleteModal)
    }

    const handleDelete = () => {
        const updatedDataCopy = [...friendList]
        const findIndex = updatedDataCopy.findIndex(friend => friend.name === deleteItemName)
        updatedDataCopy.splice(findIndex, 1)
        setFriendList([...updatedDataCopy])
        setSearchedFriendList([])
        handleDeleteModalToggal()
    }

    const handleFavorite = (name) => {
        const updatedDataCopy = [...friendList]
        const findIndex = updatedDataCopy.findIndex(friend => friend.name === name)
        updatedDataCopy[findIndex].isFavorite = !updatedDataCopy[findIndex].isFavorite
        setFriendList([...updatedDataCopy])
    }

    const handleClear = () => {
        setSearchedFriendList([])
    }

    const renderDeleteModal = () => {
        return (openDeleteModal && <div className="delete-modal" >
            <div className="delete-modal-content">
                <div className="delete-modal-body">
                    <p>Are you sure you want to delete this friend?</p>
                    <span onClick={handleDeleteModalToggal}><GrClose /></span>
                </div>
                <div className="delete-modal-footer">
                    <button className="close-btn" onClick={handleDeleteModalToggal}>Cancel</button>
                    <button onClick={handleDelete}>Confirm</button>
                </div>
            </div>
        </div>)
    }

    return (
        <>
            <FriendMenuBar
                handleFriendSearch={handleFriendSearch}
                handleSortByFavorites={handleSortByFavorites}
                handleClear={handleClear}
                isFriendListAvailable={friendList.length}
            />
            <div className="friend-list">
                <div className="friend-heading">Friends List </div>
                <div>
                    <AddFriend
                        handleAddFriend={handleAddFriend}
                    />
                </div>
                <FriendRow
                    friendList={friendList}
                    searchedFriendList={searchedFriendList}
                    handleDelete={handleDeleteModalToggal}
                    handleFavorite={handleFavorite}
                    currentPage={currentPage}
                />
            </div>
            <div className="pagination">
                <div onClick={handlePageDown}><GrFormPrevious /></div>
                <div>{`${currentPage} of ${totalPage}`}</div>
                <div onClick={handlePageUp}><GrFormNext /></div>
            </div>
            {renderDeleteModal()}
        </>
    )
}

export default Home;