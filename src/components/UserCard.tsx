import React, { useEffect, useState } from "react"

type User = {
    id: number,
    name: string,
    email: string,
    age: number,
    profilePicture: string
}

const UserCard = () => {


    const [searchUser, setSearchUser] = useState<string>('');
    const [users, setUsers] = useState<User[]>();
    const [user, setUser] = useState<User | null>();
    const [error, setError] = useState<string>();

    const fetchUsers = async() => {
        try{
            const response = await fetch('/users.json');
            if (!response.ok) {
                throw new Error
            }
            const data = await response.json();
            setUsers(data.users)
            console.log(users)
        } catch (error) {
            console.log('error: ',error)
        }
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    const handleSearchUser = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchUser(e.target.value)
    }

    const findUser = () => {
        const foundUser = users?.find(u => (
            u.name.toLocaleLowerCase().includes(searchUser.toLocaleLowerCase())
        ))
        if (foundUser) {
            setUser(foundUser)
            setError('')
        } else {
            setUser(null)
            setError("No user found with the given name!")
        }
    }

    return (
        <div className='user-card'>
            <div className='search-section'>
                <label>Enter User Name</label>
                <input type="text" placeholder='Enter user name...' value={searchUser} onChange={handleSearchUser}/>
                <button type='button' onClick={findUser}>Search</button>
            </div>
            <div className='result-section'>
                {error && <p>{error}</p>}
                {user && (
                    <div className="user-info">
                        <img src={user.profilePicture} alt={user.name} className="profile-picture" />
                        <p>ID: {user.id}</p>
                        <p>Name: {user.name}</p>
                        <p>Email: {user.email}</p>
                        <p>Age: {user.age}</p>
                    </div>
                    
                )}
            </div>
        </div>
    )
}

export default UserCard