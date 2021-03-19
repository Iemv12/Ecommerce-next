import { useState } from 'react'
import { Container, Menu, Grid, Icon, Label } from 'semantic-ui-react'
import Link from 'next/link'
import BasicModal from '../../modal/BasicModal'
import Auth from '../../auth'

export default function MenuWeb() {

    const [ showModal, setShowModal ] = useState(false)
    const [ titleModal, setTitleModal ] = useState("Login")

    const onShowModal = () => setShowModal(true)

    const onCloseModal = () => setShowModal(false)

    return (
        <div className="menu">
            <Container>
                <Grid>
                    <Grid.Column className="menu__left" width={6}>
                        <MenuPlatform/>
                    </Grid.Column>
                    <Grid.Column className="menu__right" width={10}>
                        <MenuOptions onShowModal={onShowModal}/>
                    </Grid.Column>
                </Grid>
            </Container>
            <BasicModal show={showModal} setShow={setShowModal} title={titleModal} size="small">
                <Auth setTitleModal={setTitleModal} onCloseModal={onCloseModal}/>
            </BasicModal>
        </div>
    )
}

function MenuPlatform(){
    return (
        <Menu>
            <Link href="/play-station">
                <Menu.Item as="a">
                    PlayStation
                </Menu.Item>
            </Link>
            <Link href="/xbox">
                <Menu.Item as="a">
                    Xbox
                </Menu.Item>
            </Link>
            <Link href="/switch">
                <Menu.Item as="a">
                    Switch
                </Menu.Item>
            </Link>
        </Menu>
    )
}


function MenuOptions({onShowModal}) {
    return(
        <Menu>
            <Menu.Item onClick={()=>onShowModal()}>
                <Icon name="user outline"/>
                Mi Cuenta
            </Menu.Item>
        </Menu>
    )
}