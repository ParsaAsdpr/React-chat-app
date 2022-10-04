import React from 'react';
import {AiFillWechat} from 'react-icons/ai'

const Header = () => {
    return (
        <header className='w-full bg-neutral-800 py-5 fixed top-0 z-50'>
            <nav className='px-10 text-white'>
                <div className='flex flex-row gap-6 text-2xl items-center font-bold'><AiFillWechat className='text-6xl' /> Chat Room</div>
            </nav>
            
        </header>
    );
};

export default Header;