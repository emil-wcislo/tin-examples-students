import React from 'react';

import '../modal.css';

export default (props) => {
    const confirmHandler = props.confirmHandler;
    const rejectHandler = props.rejectHandler;
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
                <header>
                    {header}
                </header>
                <div className="modal-content">
                    {props.children}
                </div>
                <footer >
                    {footer}
                    <button className="confirmButton" onClick={confirmHandler} >OK</button>
                    <button className="rejectButton" onClick={rejectHandler} >Anuluj</button>
                </footer>
            </div>
        </div>
    );

};