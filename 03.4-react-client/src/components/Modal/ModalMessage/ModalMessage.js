import React from 'react';
import '../modal.css';

export default (props) => {
    const closeHandler = props.closeHandler;
    let header = null;
    if (props.header) {
        header = (<h2>{props.header}</h2>);
    }
    let footer = null;
    if (props.footer) {
        footer = (
            <p>{props.footer}</p>)
    }
    return (
        <div className="modal-background">
            <div className="modal-window">
                <header className="">
                {/* w3-container w3-teal */}
                    {header}
                </header>
                <div className="modal-content">
                    {props.children}
                </div>
                <footer className="">
                {/* w3-container w3-teal */}
                    {footer}
                    <button className="confirmButton" onClick={closeHandler} >OK</button>
                </footer>
            </div>
        </div>
    );

};