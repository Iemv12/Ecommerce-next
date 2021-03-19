import { useState } from 'react'
import { Form, Button} from 'semantic-ui-react'

export default function Login({showRegisterForm}) {
    return (
        <Form className="login-form">
            <Form.Input name="name" type="text"/>
            <button onClick={showRegisterForm}>Register</button>
        </Form>
    )
}
