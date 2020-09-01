import React from 'react';
import SearchContainer from '../../containers/SearchContainer';
import MenuContainer from '../../containers/MenuContainer';

const Header = () => {
    return (
        <div className="horizontal-menu">
            <SearchContainer />
            <MenuContainer />
        </div>
    );
};

export default Header;