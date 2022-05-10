import React from 'react';


const Footer = (props) => {

    const time = new Date();
    return (
        <footer className="footer">
            Total: {props.length} {props.length === 1 ? "Item" : "Items"}
            <p>Copywrite &copy; {time.getFullYear()}</p>
        </footer>
    );
};

export default Footer;