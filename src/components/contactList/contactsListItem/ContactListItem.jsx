import React, { Component } from 'react'
import './contactListItem.scss';

const DELETE = "delete";

export default class ContactListItem extends Component {

    onElementClick = () => {
        this.props.onSelectedContact(this.props.contact.id);
    };

    onDeleteClick = (e) => {
        e.stopPropagation();
        this.props.deleteItem(this.props.contact.id);
    };

    render() {
        const { contact } = this.props;

        return (
            <tr className="table-tr" onClick={this.onElementClick}>
                <td>{contact.name}</td>
                <td>{contact.username}</td>
                <td>{contact.phone}</td>
                <td>
                    <button className="delete-button" onClick={this.onDeleteClick}>{DELETE}</button>
                </td>
            </tr>
        )
    }
}
