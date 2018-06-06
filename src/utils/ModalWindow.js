var Modal = require('react-bootstrap-modal')
import {Button, Panel, Grid, Row, Col, Glyphicon} from 'react-bootstrap';

export default class ShowModalWindow extends React.Component {
 
    render(){
        const Title, Message, ShowOKButton, ShowCancelButton, ShowYesButton, ShowNoButton, ClickedOnButton, IconType, open = this.props;
        var icotp='';
        switch(IconType) {
            case 'W':
                icotp='warning-sign'
                break;
            case 'E':
                icotp:'exclamation-sign'
                break;
            case 'I':
                icotp:'info-sign'
                break;
            case 'Q' :
                icotp:'question-sign'
                break;
            default:
                icotp:''
        }

        let ClickCancel = () => { 
            this.props.open: false ;
            ClickedOnButton: 'C';
        }
        let ClickOK = () => { 
            this.props.open: false ;
            ClickedOnButton: 'O';
        }
        let ClickYes = () => { 
            this.props.open: false ;
            ClickedOnButton: 'Y';
        }
        let ClickNo = () => { 
            this.props.open: false ;
            ClickedOnButton: 'N';
        }
  
        return (
            <Modal 
                show={this.props.open} 
                aria-labelledby="ModalHeader"
            >
                <Modal.Header closeButton>
                    <Modal.Title id='ModalHeader'>{Title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col xs={2} sm={2} md={2} lg={2} xl={2}  style={{padding: 2 +'px '}}>
                             <Glyphicon glyph="edit"/>
                        </Col>
                        <Col xs={1} sm={1} md={1} lg={1} xl={1}  style={{padding: 2 +'px '}}>
                            
                        </Col>
                        <Col xs={9} sm={9} md={9} lg={9} xl={9}  style={{padding: 2 +'px '}}>
            	            <p>{Message}</p>
                        </Col>
                    </Row
                    
                </Modal.Body>
                <Modal.Footer>
                    <button className='btn btn-primary' style={{display: this.props.ShowOKButton=='Y' ? '' : 'none'}} onClick={ClickOK}>OK</button>
                    <button className='btn btn-primary' style={{display: this.props.ShowYesButton=='Y' ? '' : 'none'}} onClick={ClickYes}>Yes</button>
                    <button className='btn btn-default' style={{display: this.props.ShowNoButton=='Y' ? '' : 'none'}} onClick={ClickNo}>No</button>
                    <button className='btn btn-default' style={{display: this.props.ShowCancelButton=='Y' ? '' : 'none'}} onClick={ClickCancel}>Cancel</button>
                </Modal.Footer>
            </Modal>
        )
    }
}
 