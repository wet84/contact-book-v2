import React, { Component } from 'react'
import ContactListItem from './contactsListItem/ContactListItem';
import './contactList.scss';

export default class ContactList extends Component {

    render() {
        const { onSelected, deleteItem } = this.props;
        return (
            <table className="contacts-list">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Username</th>
                        <th>Phone</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody >
                    {this.props.data.map((contact) => (
                        <ContactListItem
                            contact={contact}
                            key={contact.id}
                            onSelectedContact={onSelected}
                            deleteItem={deleteItem}
                        ></ContactListItem>
                    ))}
                </tbody>
            </table>
        )
    }
}
