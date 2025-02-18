import React from 'react';
import Slider from '../Slider/Slider';
import Room from '../Room/Room';
import Meals from '../../Pages/Meals/Meals';
import Membership from '../../Pages/MemberShip/MemberShip';
import Contact from '../../Pages/Contact/Contact';
import Review from '../../Pages/Review/Review';

const Home = () => {
    return (
        <div>
           <Slider></Slider>
           <Meals></Meals>
           <Membership></Membership>
           <Room></Room>
           <Contact></Contact>
           <Review></Review>
        </div>
    );
};

export default Home;