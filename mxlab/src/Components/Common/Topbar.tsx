import React from 'react';
import { Search , Bell } from 'lucide-react';
import type { TopbarProps } from '../../services/types';
const Topbar:React.FC<TopbarProps> = ({username}) => {
    return (
        <header className='w-full h-16 bg-white shadow-md flex items-center justify-between px-6 sticky top-0 z-50'>
            <div className='flex items-center w-1/4 bg-white rounded border-1 border-gray-200 px-3 py-2'>
            <Search className='w-5 h-5 text-gray-500 mr-2 ' />
            <input type='text' placeholder='Rechercher les demandes , les interventions ...' className='bg-transparent outline-none text-sm 
            w-full text-gray-700 placeholder-gray-400 ' />
            </div>
            <div className='flex items-center gap-6'>
                <button className='relative'>
                <Bell className='w-6 h-6 text-gray-600 hover: text-blue-600 transition-colors'/>
                <span className='absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center'>
                    1
                </span>
                </button>
                <div className='flex items-center gap-2'>
                    
                    <span className='font-medium text-gray-700'>{username}</span>
                </div>
            </div>
        </header>
    )
}
export default Topbar;