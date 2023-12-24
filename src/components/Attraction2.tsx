import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import useUserComments from "./Comments";
import useStarRating from './Rating';
import useBookmark from './Favorites';
import { parseNumbers } from "xml2js/lib/processors";


interface ObjectData {
    id: string,
    name: string,
    category: string,
    description: string,
    rating: number,
    reviewList: Comment[];
}
interface Comment {
    id: number;
    username: string;
    body: string;
    rating: number;
    location: {
        id: number;
        name: string;
        type: string;
        len: number;
        lat: number;
        description: string;
    };
}

const Attraction: React.FC = () => {
    const [objectData, setObjectData] = useState<ObjectData | null>(null);
    const [commentInput, setCommentInput] = useState<string>('');
    const [username] = useState<string | undefined>(Cookies.get("username"));

    const { postUserComment } = useUserComments();
    const { rating, hoveredRating, handleStarClick, handleStarHover, } = useStarRating();
    const { isBookmarked, toggleBookmark } = useBookmark(username || '', objectData);

    const id = window.location.href.split("?id=")[1];
    const combinedClassName = `h-6 w-6 mt-4 hover:fill-yellow ${isBookmarked ? 'fill-yellow' : ''}`;

    const getObject = async () => {
        try {
            const response = await axios.get<ObjectData>(`https://mht-back-end-deployment.azurewebsites.net/api/v1/objects/id/${id}`);
            setObjectData(response.data);
        } catch (error) {
            console.error("Error fetching location data: ", error);
        }
    };
    useEffect(() => {
        getObject();
    }, [id]);

    const writeReview = async () => {
        try {
            await postUserComment(commentInput, rating, parseNumbers(id));
            handleStarClick(0);
            setCommentInput('');
            await getObject();  // Wait for getObject to complete
        } catch (error) {
            console.error("Error writing review: ", error);
        }
    }

    const clearInput = async () => {
        handleStarClick(0);
        setCommentInput('');
    }

    // Function to render star ratings with various increments based on the average rating
    const renderStarRating = (averageRating: number) => {
        const stars = Array.from({ length: 5 }, (_, index) => index + 1);

        return (
            <div className="flex space-x-1">
                {stars.map((star) => {
                    const isFilled = star <= Math.round(averageRating);

                    return (
                        <svg
                            key={star}
                            xmlns="http://www.w3.org/2000/svg"
                            fill={isFilled ? 'yellow' : 'none'}
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6 cursor-pointer"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                            />
                        </svg>
                    );
                })}
            </div>
        );
    };

    return (
        <div className='fullPageDiv flex flex-col'>
            <div className='flex flex-row h-1/2 mr-16'>
                <div className='w-1/2'>
                    <div className='font-semibold text-yellow-800 flex flex-col items-center justify-center m-2 mt-32 space-y-4'>
                        <h1 className="text-3xl">Location: {(objectData?.name)}</h1>
                        <h1 className="text-2xl">
                            Type: {(objectData?.category ?? '').charAt(0).toUpperCase() + (objectData?.category ?? '').slice(1)}
                        </h1>
                        <h1 className="text-xl max-w-[66%] ml-7">
                            Description: {(objectData?.description ?? '').charAt(0).toUpperCase() + (objectData?.description ?? '').slice(1)}
                        </h1>

                        <div>
                            <div>Average Rating: {objectData?.rating}</div>
                            <div>{renderStarRating(objectData?.rating || 0)}</div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col m-2 mt-36 h-[400px]">
                    <div className="flex flex-col">
                        <input
                            placeholder="Write your thoughts..."
                            value={commentInput}
                            onChange={(e) => setCommentInput(e.target.value)}
                            className="rounded-3xl w-[500px] m-2 bg-transparent placeholder-black border-black p-4"
                        />
                        <div className="flex justify-center">
                            <div className="flex space-x-1 mt-4">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <svg
                                        key={star}
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill={star <= (hoveredRating || rating) ? "yellow" : "none"}
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-6 h-6 cursor-pointer"
                                        onClick={() => handleStarClick(star)}
                                        onMouseEnter={() => handleStarHover(star)}
                                        onMouseLeave={() => handleStarHover(0)}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                                        />
                                    </svg>
                                ))}
                            </div>
                            <button
                                type="submit"
                                onClick={clearInput}
                                className="m-2 mt-1 bg-transparent rounded-3xl p-5 hover:bg-yellow-700 hover:font-semibold active:bg-yellow-600"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                onClick={writeReview}
                                className="m-2 mt-1 bg-transparent rounded-3xl py-2.5 px-5 hover:bg-yellow-700 hover:font-semibold active:bg-yellow-600"
                            >
                                Comment
                            </button>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                strokeWidth={1.5}
                                stroke='currentColor'
                                className={combinedClassName}
                                onClick={toggleBookmark}
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    d='M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z'
                                />
                            </svg>
                        </div>
                    </div>

                </div>

            </div>

            <div className="flex justify-center mt-[-80px] items-center flex-col">
                <h1 className="text-3xl font-semibold mb-4 text-yellow-800">Reviews</h1>
                <div className='overflow-y-scroll m-2 w-[50%] h-1/2'>
                    {objectData?.reviewList?.map((comment) => (
                        <div key={comment.id} className='border-b border-black p-2'>
                            <div className="flex w-full">
                                <div className="w-1/2 pr-2">
                                    <div>
                                        Name: {comment.username}
                                    </div>
                                </div>
                                <div className="w-1/2 pl-2">
                                    <div>
                                        Rating: {renderStarRating(comment.rating || 0)} <br />
                                    </div>
                                </div>
                            </div>
                            <div className="w-full mt-2">
                                <div>
                                    {comment.body}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>


        </div>

    );
}

export default Attraction;
