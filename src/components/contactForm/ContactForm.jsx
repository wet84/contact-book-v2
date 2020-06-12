import React, { Component } from 'react'
import './contactForm.scss';

const TITLE_FORM = "Form";
const ADD_CONTACT = "Add contact";
const CLEAN_FORM = "clean form";

export default class ContactForm extends Component {
    
    state = {
        values: {
            id: '',
            name: '',
            username: '',
            phone: '',
        },
    };

    static getDerivedStateFromProps(props, state){
        if(props.getContact.id !== state.values.id){
            return {
                values: props.getContact
            };
        }
        return null;
    }

    onInputChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            values: {
                ...this.state.values,
                [name]: value
            },
        });
    };

    onFormSubmit = (e) => {
        const {id, name, username, phone} = this.state.values;
        e.preventDefault();
        
        this.props.addNewContact({
            id: id,
            name: name,
            username: username,
            phone: phone,
        });

        this.props.clearForm({
            id: '',
            name: '',
            username: '',
            phone: '',
        });
        
        this.setState({
            values: {
                ...this.state.values,
                name:'',
                username:'',
                phone:'',
            }
        });
        e.target.reset();
    };

    сlear = () => {
        this.props.clearForm({
            id: '',
            name: '',
            username: '',
            phone: '',
        });

        this.setState({
            values: {
                ...this.state.values,
                id: '',
                name:'',
                username:'',
                phone:'',
            }
        });
    }

    render() {
        const { values } = this.state;
        return (
            <div>
                <div className="contact-form-wrapper">
                    <h2>{TITLE_FORM}</h2>
                    <form className="contact-form" onSubmit={this.onFormSubmit}>
                        <input
                            type="text"
                            name="name"
                            placeholder="Your name"
                            value={values.name}
                            onChange={this.onInputChange}
                        />
                        <input
                            type="text"
                            name="username"
                            placeholder="Your username"
                            value={values.username}
                            onChange={this.onInputChange}
                        />
                        <input
                            type="text"
                            name="phone"
                            placeholder="Your telephone number"
                            value={values.phone}
                            onChange={this.onInputChange}
                        />
                        <input className='button' type="submit" value={ADD_CONTACT}/>
                    </form>

                    <button className="button" onClick={this.сlear}>{CLEAN_FORM}</button>
                </div>
            </div>
        )
    }
}
