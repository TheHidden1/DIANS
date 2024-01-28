/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const Profile = () => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [username, setUsername] = useState(Cookies.get("username"));
    const [favorites, setFavorites] = useState<Array<string>>([]);

    const getPlaces = async () => {
        const apiUrl = import.meta.env.VITE_APP_BASE_URL + '/api/v1/user/username/' + username;

        axios.get(apiUrl)
            .then(response => {
                const { name, surname, username, favouritePlaces } = response.data;

                setUsername(username);
                setName(name);
                setSurname(surname);
                setFavorites(favouritePlaces || []);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    useEffect(() => {
        getPlaces();
    }, [username]);

    const readMore = (placeId: string) => {
        window.location.href = '/attraction?id=' + placeId;
    }

    const removeFavorite = async (locationId: string, username: string) => {
        try {
            const apiUrl = `https://mht-back-end-deployment.azurewebsites.net/api/v1/user/remove?placeId=${locationId}&username=${username}`;
            await axios.post(apiUrl);
            getPlaces();
        } catch (error) {
            console.error('Error removing favorite place: ', error);
        }
    }

    const changePassword = () => {
        window.location.href = '/changepassword';
    }

    return (
        <div className='fullPageDiv flex flex-col'>
            <div className='w-full mt-10'>
                <div className='text-lg flex flex-col items-center justify-center'>
                    <img src="https://static.vecteezy.com/system/resources/thumbnails/002/534/006/small/social-media-chatting-online-blank-profile-picture-head-and-body-icon-people-standing-icon-grey-background-free-vector.jpg"
                        style={{ aspectRatio: 1 }}
                        className='w-[128px] sm:w-[192px] mb-3 rounded-lg'
                    />
                    <h1>Name: {name} {surname}</h1>
                    <h1>Username: {username}</h1>
                    <button className='rounded-3xl py-2 px-4 hover:bg-yellow-800 hover:text-white hover:font-semibold active:bg-yellow-600' onClick={changePassword}>Change password</button>
                </div>
            </div>
            <div className='flex justify-center items-center'>
                <h1 className='text-3xl font-semibold mb-2'>Favorite places:</h1>
            </div>
            <div className=' h-1/3 m-auto flex items-center '>
                {favorites.length > 0 ? (
                    <div className='w-full h-[240px]'>
                        <div className='overflow-y-scroll h-4/5' >
                            <ul>
                                {favorites.map((favorite: any) => (
                                    <li key={favorite.id} className='mx-3 border-b border-black p-2 grid grid-cols-2 gap-x-48'>
                                        <h1 className='text-lg mt-[6px]'>{favorite.name}</h1>
                                        <div className='flex justify-evenly'>
                                            <button className='rounded-lg py-2 px-3 w-2/5 hover:bg-yellow-800 hover:text-white active:bg-yellow-600' onClick={() => removeFavorite(favorite.id, username || "")}>Remove</button>
                                            <button className='rounded-lg py-2 px-3 w-3/5 hover:bg-yellow-800 hover:text-white active:bg-yellow-600' onClick={() => readMore(favorite.id)}>Read More</button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ) : (
                    <div className='flex justify-center items-center'>
                        <p className='text-2xl text-yellow-800 font-semibold'>This user has no favorite locations</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Profile;
