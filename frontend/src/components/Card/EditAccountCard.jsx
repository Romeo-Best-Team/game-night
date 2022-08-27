import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';

export default function EditAccountCard({userInfo, setEdit, edit}){

    const [username, setUsername] = useState(userInfo.username)
    const [email, setEmail] = useState(userInfo.email)

    const updateUser = () => {
        axios
            .put('whoami', {
                username: username,
                email: email
            })
            .then((response) => {
                console.log('this is the response:', response)
                window.location.reload()
            })
            .catch((error) => console.log(error))
    }
    

    const deleteAccount = async (event) => {
        event.preventDefault();
        let res = await axios.delete('/whoami');
        window.location.replace("/")
    }

    const editAccount = () => {
		setEdit(true)
	}

	const cancelButton = () => {
		setEdit(false)
	}

    const editFooter = (
        <span>
            <Button label="Save" icon="pi pi-check" onClick={updateUser}/>
            <Button label="Cancel" icon="pi pi-times" className="p-button-secondary ml-2" onClick={cancelButton}/>
        </span>
	);
	const footer = (
        <span>
            <Button label="Edit Account" icon="pi pi-user-edit" onClick={editAccount}/>
            <Button label="Delete Account" className="p-button-danger" onClick={deleteAccount}/>
        </span>
    );

    return(
        <div>
        {edit ? 
            <div className="center-page">
                <Card title="Your Information" style={{ width: '25rem', marginBottom: '2em' }} footer={editFooter}>
                <Container>
                    <Row>
                        <Col>
                            <span className="ml-2">Username</span>
                            <br></br>
                            <InputText value={username} id="accountUsername" onChange={(e) => setUsername(e.target.value)} />
                        </Col>
                    </Row>
                    <br></br>
                    <Row>
                        <Col>
                            <span className="ml-2">Email</span>
                            <br></br>
                            <InputText value={email} id="accountEmail" onChange={(e) => setEmail(e.target.value)} />
                        </Col>
                    </Row>
                </Container>
                </Card>
            </div>
        : 
            <div className="center-page">
                <Card title="Your Information" style={{ width: '25rem', marginBottom: '2em' }} footer={footer}>
                    <p className="m-0" style={{lineHeight: '1.5'}}>
                        Email: {userInfo.email}
                    </p>
                    <p className="m-0" style={{lineHeight: '1.5'}}>
                        Username: {userInfo.username}
                    </p>
                </Card>
            </div>
        }
        </div>
    )

}