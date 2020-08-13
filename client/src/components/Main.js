import React from 'react';
import Header from './common/Header.js';
import SidebarApp from './SidebarApp';
import Content from './common/Content';

const Main = () => {
    return(
        <div id="wrapper">
            <Header />
            <SidebarApp />
            <Content />
        </div>
    )
}
export default Main