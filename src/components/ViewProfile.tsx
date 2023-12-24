import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const Profile = () => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [username, setUsername] = useState(Cookies.get("username"));
    const [favorites, setFavorites] = useState<Array<string>>([]);

    const getPlaces = async () => {
        const apiUrl = 'https://mht-back-end-deployment.azurewebsites.net/api/v1/user/username/' + username;

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
            <div className='w-full mt-10 mb-[-50px]'>
                <div className='flex flex-col items-center justify-center'>
                    <img src="https://static.vecteezy.com/system/resources/thumbnails/002/534/006/small/social-media-chatting-online-blank-profile-picture-head-and-body-icon-people-standing-icon-grey-background-free-vector.jpg"
                        style={{ aspectRatio: 1 }}
                        className='w-[128px] sm:w-[192px] mb-3 rounded-lg'
                    />
                    <h1>Name: {name} {surname}</h1>
                    <h1>Username: {username}</h1>
                    <button onClick={changePassword}>Change password</button>
                </div>
            </div>
            <div className='w-3/5 h-1/3 m-auto '>
                <div className='flex justify-center items-center'>
                    <h1 className='text-3xl mb-2'>Favorite places:</h1>
                </div>
                <div className='overflow-y-scroll h-4/5' >
                    {favorites.length > 0 ? (
                        <ul>
                            {favorites.map((favorite: any) => (
                                <li key={favorite.id} className='m-2 border-b border-black p-2 grid grid-cols-3 '>
                                    {favorite.name}
                                    <button className='border border-black py-1' style={{ width: "40%" }} onClick={() => removeFavorite(favorite.id, username || "")}>Remove</button>
                                    {/* Pass a callback function to onClick */}
                                    <button className='border border-black py-1' style={{ width: "40%" }} onClick={() => readMore(favorite.id)}>Read More</button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>This user has no favorite locations</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Profile;
