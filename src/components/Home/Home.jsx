import React from 'react';
import Slider from '../Slider/Slider';
import Room from '../Room/Room';
import Meals from '../../Pages/Meals/Meals';
import Membership from '../../Pages/MemberShip/MemberShip';

const Home = () => {
    return (
        <div>
           <Slider></Slider>
           <Meals></Meals>
           <Membership></Membership>
           <Room></Room>
        </div>
    );
};

export default Home;