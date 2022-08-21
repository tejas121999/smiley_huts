import React, { useState } from 'react';
import '../../layout/css/profile.css';
import ProfileInfo from '../profile/profile_pages/ProfileInfo';
import MyStay from '../profile/profile_pages/MyStay';
import Reviews from '../profile/profile_pages/Reviews';
import Subscription from '../profile/profile_pages/Subscription';
import Setting from '../profile/profile_pages/Setting';

const Profile = () => {
  const [selectedTab, setSelectedTab] = useState('Profile Information');
  let tabs = [
    'Profile Information',
    'MyStays',
    'Reviews and Ratings',
    'Subscriptions',
    'Settings',
  ];
  return (
    <div className=''>
      <div className="grey-background-profile">
        <div className="tabs mobile-responsive-tabs">
          <ul className='mobile-responsive-ul'>
            {tabs.map(tab => {
              return (
                <li
                  onClick={() => setSelectedTab(tab)}
                  className={selectedTab === tab && 'selected-profile'}
                >
                  {tab}
                </li>
              );
            })}
          </ul>
        </div>
        {selectedTab === 'Profile Information' && <ProfileInfo />}
        {selectedTab === 'MyStays' && <MyStay reviews={setSelectedTab} />}
        {selectedTab === 'Reviews and Ratings' && <Reviews />}
        {selectedTab === 'Subscriptions' && <Subscription />}
        {selectedTab === 'Settings' && <Setting />}
      </div>
      <div className='mobile-responsive-tab-ui'>
        {/* {selectedTab === 'Profile Information' && <ProfileInfo />}
        {selectedTab === 'MyStays' && <MyStay reviews={setSelectedTab} />}
        {selectedTab === 'Reviews and Ratings' && <Reviews />}
        {selectedTab === 'Subscriptions' && <Subscription />}
        {selectedTab === 'Settings' && <Setting />}
        <div className="tabs mobile-responsive-tabs">
          <ul className='mobile-responsive-ul'>
            {tabs.map(tab => {
              return (
                <li
                  onClick={() => setSelectedTab(tab)}
                  className={selectedTab === tab && 'selected-profile'}
                >
                  {tab}
                </li>
              );
            })}
          </ul>
        </div> */}
      </div>
    </div>

  );
};

export default Profile;

{
  /* <div className='profile container'>
<nav>
    <div className="nav nav-tabs" id="nav-tab" role="tablist">
        <button className="nav-link nav_text active" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="true">Profile Information</button>
        <button className="nav-link nav_text" id="nav-Stay-tab" data-bs-toggle="tab" data-bs-target="#nav-Stay" type="button" role="tab" aria-controls="nav-Stay" aria-selected="false">My Stay</button>
        <button className="nav-link nav_text" id="nav-Reviews-tab" data-bs-toggle="tab" data-bs-target="#nav-Reviews" type="button" role="tab" aria-controls="nav-Reviews" aria-selected="false">Reviews & Ratings</button>
        <button className="nav-link nav_text" id="nav-Subscription-tab" data-bs-toggle="tab" data-bs-target="#nav-Subscription" type="button" role="tab" aria-controls="nav-Subscription" aria-selected="false">Subscription</button>
        <button className="nav-link nav_text" id="nav-Settings-tab" data-bs-toggle="tab" data-bs-target="#nav-Settings" type="button" role="tab" aria-controls="nav-Settings" aria-selected="false">Settings</button>
    </div>
</nav>
<div className="tab-content" id="nav-tabContent">
    <div className="tab-pane fade show active" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab"><ProfileInfo /></div>
    <div className="tab-pane fade" id="nav-Stay" role="tabpanel" aria-labelledby="nav-Stay-tab"><MyStay /></div>
    <div className="tab-pane fade" id="nav-Reviews" role="tabpanel" aria-labelledby="nav-Reviews-tab"><Reviews /></div>
    <div className="tab-pane fade" id="nav-Subscription" role="tabpanel" aria-labelledby="nav-Subscription-tab"><Subscription /></div>
    <div className="tab-pane fade" id="nav-Settings" role="tabpanel" aria-labelledby="nav-Settings-tab"><Setting /></div>
</div>
</div> */
}
