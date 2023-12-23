import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const Profile = () => {

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [username, setUsername] = useState(Cookies.get("username"));
    const [favorites, setFavorites] = useState<Array<string>>([]);

    useEffect(() => {
        const apiUrl = 'https://mht-back-end-deployment.azurewebsites.net/api/v1/user/username/' + username;

        axios.get(apiUrl)
            .then(response => {
                const { name, surname, username, favorites } = response.data;

                setUsername(username);
                setName(name);
                setSurname(surname);
                setFavorites(favorites || []);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <div className='fullPageDiv flex flex-col m-2'>
            <div className='flex flex-row h-1/2'>
                <div className='w-1/2'>
                    <div className='flex flex-col items-center justify-center'>
                        <img src="https://static.vecteezy.com/system/resources/thumbnails/002/534/006/small/social-media-chatting-online-blank-profile-picture-head-and-body-icon-people-standing-icon-grey-background-free-vector.jpg"
                            style={{ aspectRatio: 1 }}
                            className='w-[128px] sm:w-[192px] mb-3'
                        />
                        <h1>Name: {name} {surname}</h1>
                        <h1>Username: {username}</h1>
                    </div>
                </div>
                <div className='w-1/2 overflow-y-scroll'>
                    <h1>Favorite places:</h1>
                    {favorites.map((favorite) => (
                        <div>
                            {favorite}
                        </div>
                    ),(
                        <p>This user has no favorite locations</p>
                    ))}
                </div>
            </div>
            <div className='flex'>
                <div className=''>A</div>
            </div>
        </div>
    )
}
export default Profile;