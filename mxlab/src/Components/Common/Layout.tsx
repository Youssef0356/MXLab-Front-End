import React from 'react';
import type {ReactNode} from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

type LayoutProps = {
    children:ReactNode;
}
const Layout:React.FC <LayoutProps> = ({children}) =>{
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className='flex-1 flex flex-col overflow-hidden'>
        <Topbar username={'Youssef Neji'} />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>

    </div>
  );
}

export default Layout;
