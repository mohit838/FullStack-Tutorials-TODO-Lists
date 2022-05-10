import React from 'react';


const Header = (props) => {
    return (
        <header className="title">
                {props.title}
        </header>
    );
};

Header.defaultProps = {
    title: "Default Title"
}

export default Header;