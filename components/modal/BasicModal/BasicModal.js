import { Modal, Icon} from 'semantic-ui-react'

export default function BasicModal({show, setShow, title, children, ...rest}) {

    const handlerClose = () => setShow(false)

    return (
        <Modal className="basic-modal" open={show} onClose={handlerClose} {...rest}>
            <Modal.Header>
                <span>{title}</span> <Icon name="close" onClick={handlerClose}/>
            </Modal.Header>
            <Modal.Content>
                {children}
            </Modal.Content>
        </Modal>
    )
}
