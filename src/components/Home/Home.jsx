import React from 'react';
import Slider from '../Slider/Slider';
import Room from '../Room/Room';
import Meals from '../../Pages/Meals/Meals';

const Home = () => {
    return (
        <div>
           <Slider></Slider>
           <Meals></Meals>
           <Room></Room>
        </div>
    );
};

export default Home;