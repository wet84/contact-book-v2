import React, { Component } from 'react'
import ContactList from './contactList/ContactList'
import ContactForm from './contactForm/ContactForm'
import './contactBook.scss';

const TEXT_LOADING = "loading...";

export default class ContactBook extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            data:[],
            loading: false,
            getContact:{
                id: '',
                name: '',
                username: '',
                phone: '',
            },
        };
    }
    
    componentDidMount() {
        this.setState({loading: true})
        const URL = 'https://jsonplaceholder.typicode.com/users'; 
        fetch(URL,{method: 'GET'})
            .then(response => response.json())
            .then(
            (result) => {
                this.setState({
                    data: result,
                    loading: false
                })
            },
            
            (error) => {
                this.setState({
                    loading: true,
                    error
                });
            }
        )
    }

    addNewContact = (newContact) => {

        if(newContact.id !== ''){
            const updateData = this.state.data.map(item => {
                if(item.id === newContact.id){
                    return newContact
                }
                return item
            })

            this.setState({
                ...this.state.data,
                data: updateData
            });
        } else {
            newContact.id = Date.now();
            this.setState({
                ...this.state.data,
                data: [...this.state.data, newContact]
            });
        }

        const URL = 'https://jsonplaceholder.typicode.com/users'; 
        fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(newContact)
        })
        .then(response => console.log("result.message", response))
        .catch(error => console.error(error))

    };

    selectedContact = (id) => {
        this.setState({
            getContact: this.state.data.find((contact) => id === contact.id ),
        })
    }

    deleteContact = (id) => {
        this.setState({
            data: this.state.data.filter((contact) => id !== contact.id),
        });
    };

    clearForm = (empty) => {
        console.log("empty:", empty);
        this.setState({
            getContact:{
                ...this.state.getContact,
                id: empty.id,
                name: empty.name,
                username: empty.username,
                phone: empty.phone,
            }
        })
    }

    render() {
        const {data, loading, getContact } = this.state;
        return (
            <div className="contact-book">
                <div className="contact-list-area">
                    {
                        loading ? TEXT_LOADING : <ContactList 
                            data={data}
                            onSelected={this.selectedContact}
                            deleteItem={this.deleteContact}
                        />
                    }
                </div>
                <div className="contact-form-area">
                    <ContactForm
                        getContact={getContact}
                        addNewContact={this.addNewContact}
                        clearForm={this.clearForm}
                    />
                </div>
            </div>
        )
    }
}
