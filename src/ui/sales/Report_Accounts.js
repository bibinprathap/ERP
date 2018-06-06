import React, { Component, PropTypes } from 'react';
import { observer } from 'mobx-react';
import { observable, extendObservable } from 'mobx';
import { InputField, asForm, InputDate, InputSelect, InputCheckbox, InputArea, InputRadio, ImageUpload } from '../../utils';
import Collapse, { Panel } from 'rc-collapse';
import ReactDataGrid from 'react-data-grid';
import { Button, Grid, Row, Col, Tabs, Tab, Glyphicon } from 'react-bootstrap';
import * as constants from '../../constants.js';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import TabPanel, { TabStrip } from 'react-tab-panel';
import ReactDOM from 'react-dom'
import Modal from 'react-bootstrap-modal'
import moment from "moment";

@observer
class Report_Accounts extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const {updateProperty, submitForm, reportdetails} = this.props
        var style_img = {
            backgroundColor: 'white', border: '0px solid white'
        }
       
        var img_src =  'data:image/jpeg;base64,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'
        var Options = [
            { value: 'HO', label: 'Head Office HO' },
            { value: 'MAN', label: 'Manchester Branch MAN' },
            { value: 'KGL', label: 'Kabul Branch' }
        ]
        var Options1 = []
        return (
            <div>
                <h4>Financial Reports</h4>
                <Row>
 
                      <Col xs={3} sm={3} md={3} lg={3} xl={3} style={{ padding: '0' }}>
                        <div className="thumbnail" style={{ border: '0px solid white' }}>
                        <button style={style_img} onClick={window.arreport}>
                                <Col xs={3} sm={3} md={3} lg={3} xl={3}><img src={img_src} width='50px'  /> </Col>
                               <Col xs={9} sm={9} md={9} lg={9} xl={9} style={{ paddingTop: '3%' }}> <div className='caption'  >
                                    <a><p className='textCentre'>Accounts Receivable</p></a>
                                </div>  </Col>
                            </button>
                        </div>
                    </Col>
                    <NotificationContainer />
                      <Col xs={3} sm={3} md={3} lg={3} xl={3} style={{ padding: '0' }}>
                        <div className="thumbnail" style={{ border: '0px solid white' }}>
                            <button style={style_img} onClick={window.apreport}>
                                <Col xs={3} sm={3} md={3} lg={3} xl={3}><img src={img_src} width='50px'  /> </Col>
                               <Col xs={9} sm={9} md={9} lg={9} xl={9} style={{ paddingTop: '3%' }}> <div className='caption'  >
                                    <a><p className='textCentre'>Accounts Payable</p></a>
                                </div>
                             </Col>  </button>
                        </div>
                    </Col>
                      <Col xs={3} sm={3} md={3} lg={3} xl={3} style={{ padding: '0' }}>
                        <div className="thumbnail" style={{ border: '0px solid white' }}>
                            <button style={style_img}  onClick={window.empbalance}>
                                <Col xs={3} sm={3} md={3} lg={3} xl={3}><img src={img_src} width='50px'  /> </Col>
                               <Col xs={9} sm={9} md={9} lg={9} xl={9} style={{ paddingTop: '3%' }}> <div className='caption'  >
                                    <a><p className='textCentre'>Employee Balance Report</p></a>
                                </div>
                             </Col>  </button>
                        </div>
                    </Col>
                      <Col xs={3} sm={3} md={3} lg={3} xl={3} style={{ padding: '0' }}>
                        <div className="thumbnail" style={{ border: '0px solid white' }}>
                            <button style={style_img} onClick={window.statementofaccount}>
                                <Col xs={3} sm={3} md={3} lg={3} xl={3}><img src={img_src} width='50px'  /> </Col>
                               <Col xs={9} sm={9} md={9} lg={9} xl={9} style={{ paddingTop: '3%' }}> <div className='caption'  >
                                    <a><p className='textCentre'>Satement Of Account</p></a>
                                </div>
                             </Col>  </button>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}
Report_Accounts.propTypes =
    {
        reportdetails: PropTypes.shape
            (
            {
                QuoteDate: PropTypes.date,
                customercode: PropTypes.string,
                customername: PropTypes.string,
                phonenumber: PropTypes.object,
                email: PropTypes.string,
                address: PropTypes.string,

            }
            )
    }
export default asForm(Report_Accounts, "reportdetails")