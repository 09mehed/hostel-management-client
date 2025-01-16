import React, { createContext, useState, useContext } from 'react';

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
