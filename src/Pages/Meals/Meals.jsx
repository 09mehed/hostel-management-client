import React, { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import useMenu from '../../hooks/useMenu';
import FoodCard from '../../components/FoodCard/FoodCard';

const Meals = () => {
    const [tabIndex, setTabIndex] = useState(0)
    const [menu] = useMenu()

    const breakFast = menu.filter(item => item.category === 'BreakFast')
    const lunch = menu.filter(item => item.category === 'Lunch')
    const dinner = menu.filter(item => item.category === 'Dinner')
    return (
        <div className='pt-5 w-11/12 mx-auto text-center'>
            <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                <TabList>
                    <Tab>BreakFast</Tab>
                    <Tab>Lunch</Tab>
                    <Tab>Dinner</Tab>
                    <Tab>All Meal</Tab>
                </TabList>

                <TabPanel>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
                        {
                            breakFast.map(item => <FoodCard key={item._id} item={item}></FoodCard>)
                        }
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
                        {
                            lunch.map(item => <FoodCard key={item._id} item={item}></FoodCard>)
                        }
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
                        {
                            dinner.map(item => <FoodCard key={item._id} item={item}></FoodCard>)
                        }
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
                        {
                            menu.map(item => <FoodCard key={item._id} item={item}></FoodCard>)
                        }
                    </div>
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default Meals;