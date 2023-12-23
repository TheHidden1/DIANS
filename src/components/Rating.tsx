import { useState } from 'react';

const useStarRating = () => {
    const [rating, setRating] = useState<number>(0);
    const [hoveredRating, setHoveredRating] = useState<number>(0);

    const handleStarClick = (clickedStar: number) => {
        setRating(clickedStar);
    };

    const handleStarHover = (hoveredStar: number) => {
        setHoveredRating(hoveredStar);
    };

    return {
        rating,
        hoveredRating,
        handleStarClick,
        handleStarHover,
    };
};

export default useStarRating;
