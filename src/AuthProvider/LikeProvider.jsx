import React, { createContext, useState, useContext } from 'react';
import useMenu from '../hooks/useMenu';

export const LikeContext = createContext();

export const LikeProvider = ({ children }) => {
    const [likeCount, setLikeCount] = useState(0);

    const incrementLike = () => {
        setLikeCount((prevCount) => prevCount + 1);
    };

    return (
        <LikeContext.Provider value={{ likeCount, incrementLike }}>
            {children}
        </LikeContext.Provider>
    );
};
