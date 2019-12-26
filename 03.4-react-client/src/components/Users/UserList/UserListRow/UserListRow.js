import React from 'react';

export default (props) => {
    const user = props.user;
    return (
        <tr>
            <td>{user.id}</td>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td className="actions">
                <button onClick={props.showDetailsHandler}>Szczegóły</button>
                <button onClick={props.showEditHandler}>Edytuj</button>
                <button onClick={props.deleteHandler}>Usuń</button>
            </td>
        </tr>
    );
}