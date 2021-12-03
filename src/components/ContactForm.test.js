import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<ContactForm />)
});

test('renders the contact form header', ()=> {
    render(<ContactForm />)
    const header = screen.queryByText(/contact form/i);
    expect(header).toBeInTheDocument();
    expect(header).toBeTruthy();
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm />)
    const firstName = screen.getByLabelText(/first name/i);
    userEvent.type(firstName, 'lia');
    const errorMessage = await screen.findAllByTestId('error');
    expect(errorMessage).toBeTruthy();
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />)
    const button = screen.getByRole('button');
    userEvent.click(button);
    const firstNameError = await screen.findAllByTestId('error');
    expect(firstNameError).toBeTruthy();
    const emailError = await screen.findAllByTestId('error');
    expect(emailError).toBeTruthy();
    const lastNameError = await screen.findAllByTestId('error');
    expect(lastNameError).toBeTruthy();
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm />)
    const firstName = screen.getByLabelText(/first name/i);
    userEvent.type(firstName, 'firstname');
    const lastName = screen.getByLabelText(/last name/i);
    userEvent.type(lastName, 'lastname');
    const button = screen.getByRole('button');
    userEvent.click(button);
    const emailError = await screen.findAllByTestId('error');
    expect(emailError).toBeTruthy();
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm />)
    const email = screen.getByLabelText(/email/i);
    userEvent.type(email, 'email');
    const emailError = await screen.findAllByTestId('error');
    expect(emailError).toBeTruthy();
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm />)
    const firstName = screen.getByLabelText(/first name/i);
    userEvent.type(firstName, 'firstname');
    const email = screen.getByLabelText(/email/i);
    userEvent.type(email, 'email@email.com');
    const button = screen.getByRole('button');
    userEvent.click(button);
    const lastNameError = await screen.getByText(/lastname is a required field/i);
    expect(lastNameError).toBeTruthy();
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm />)
    const firstName = screen.getByLabelText(/first name/i);
    userEvent.type(firstName, 'firstname');
    const lastName = screen.getByLabelText(/last name/i);
    userEvent.type(lastName, 'lastname');
    const email = screen.getByLabelText(/email/i);
    userEvent.type(email, 'email@email.com');
    const button = screen.getByRole('button');
    userEvent.click(button);
    expect(firstName).toBeInTheDocument();
    expect(lastName).toBeInTheDocument();
    expect(email).toBeInTheDocument();
});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm />)
    const firstName = screen.getByLabelText(/first name/i);
    userEvent.type(firstName, 'firstname');
    const lastName = screen.getByLabelText(/last name/i);
    userEvent.type(lastName, 'lastname');
    const email = screen.getByLabelText(/email/i);
    userEvent.type(email, 'email@email.com');
    const message = screen.getByLabelText(/message/i)
    userEvent.type(message, 'hello world');
    const button = screen.getByRole('button');
    userEvent.click(button);

    await waitFor (() => {
        const firstNameDisplayed = screen.getByTestId('firstnameDisplay');
        expect(firstNameDisplayed).toBeInTheDocument();
        const lastNameDisplayed = screen.getByTestId('lastnameDisplay');
        expect(lastNameDisplayed).toBeInTheDocument();
        const emailDisplayed = screen.getByTestId('emailDisplay');
        expect(emailDisplayed).toBeInTheDocument();
        const messageDisplayed = screen.getByTestId('messageDisplay');
        expect(messageDisplayed).toBeInTheDocument();
    })
});