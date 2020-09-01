import React, { useState } from 'react';
import _ from 'lodash';
import Moment from 'moment';
import NumberFormat from 'react-number-format';
import accountType from '../../constants/accountType';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import { Table, Card, Select, Row, Col, Input, Form, Button } from 'antd';

const { Option } = Select;
const ID_LENH_MUA = 2;
const ID_LENH_BAN = 1;

const ID_CHO_KHOP = 1;
const ID_DA_KHOP = 2;
const ID_DA_HUY = 3;

export default function Withdrawal(props) {
    const { tradingAcc, withdrawalReq } = props;
    const [body, setBody] = useState(
        {
            MaTKGD: '',
            TenChuThe: '',
            TenNganHang: '',
            SoTKNH: '',
            TenChiNhanh: '',
            SoTien: '',
        });

    const handleWithdrawal = () => {
        withdrawalReq(body);
        setBody({
            MaTKGD: '',
            TenChuThe: '',
            TenNganHang: '',
            SoTKNH: '',
            TenChiNhanh: '',
            SoTien: '',
        })
    }

    return (
        <div className="container-scroller">
            <Header />
            <div className="container-fluid page-body-wrapper">
                <div className="main-panel">
                    <div className="content-wrapper">
                        <div className="page-header">
                            <h3 className="page-title">Rút tiền</h3>
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item" aria-current="page">Tài khoản giao dịch</li>
                                    <li className="breadcrumb-item active" aria-current="page"> Rút tiền </li>
                                </ol>
                            </nav>
                        </div>
                        <div className="row">
                            <div className="col-12 grid-margin">
                                <div className="card">
                                    <div className="card-body">
                                        <Card>
                                        <Form labelCol={{ span: 8 }}>
                                                <Row>
                                                    <Col span={12} offset={6}>
                                                        <Form.Item label="Số hiệu TKGD">
                                                            <Select
                                                                value={body.MaTKGD}
                                                                onChange={val => setBody({ ...body, MaTKGD: val })}
                                                            >
                                                                {
                                                                    _.map(tradingAcc, o => {
                                                                        return (
                                                                            <Select.Option key={o.trading_acc_id} value={o.trading_acc_id} ><NumberFormat value={o.trading_acc_id} displayType="text" format="### ### ###" /></Select.Option>
                                                                        )
                                                                    })
                                                                }
                                                            </Select>
                                                        </Form.Item>
                                                    </Col>
                                                    <Col span={12} offset={6}>
                                                        <Form.Item label="Tên chủ thẻ (không dấu)">
                                                            <Input
                                                                value={body.TenChuThe}
                                                                onChange={e => setBody({ ...body, TenChuThe: e.target.value.toUpperCase() })}
                                                            />
                                                        </Form.Item>
                                                    </Col>
                                                    <Col span={12} offset={6}>
                                                        <Form.Item label="Tên ngân hàng ">
                                                            <Input
                                                                value={body.TenNganHang}
                                                                onChange={e => setBody({ ...body, TenNganHang: e.target.value.toUpperCase() })}
                                                            />
                                                        </Form.Item>
                                                    </Col>
                                                    <Col span={12} offset={6}>
                                                        <Form.Item label="Số TK ngân hàng">
                                                            <NumberFormat
                                                                customInput={Input}
                                                                value={body.SoTKNH}
                                                                onValueChange={val => setBody({ ...body, SoTKNH: val.value })}
                                                            />
                                                        </Form.Item>
                                                    </Col>
                                                    <Col span={12} offset={6}>
                                                        <Form.Item label="Tên chi nhánh">
                                                            <Input
                                                                value={body.TenChiNhanh}
                                                                onChange={e => setBody({ ...body, TenChiNhanh: e.target.value.toUpperCase() })}
                                                            />
                                                        </Form.Item>
                                                    </Col>
                                                    <Col span={12} offset={6}>
                                                        <Form.Item label="Số tiền">
                                                            <NumberFormat
                                                                customInput={Input}
                                                                thousandSeparator
                                                                suffix="VND"
                                                                value={body.SoTien}
                                                                onValueChange={val => setBody({ ...body, SoTien: val.floatValue })}
                                                            />
                                                        </Form.Item>
                                                    </Col>
                                                </Row>
                                                <Row justify="center" >
                                                    <Col span={12}>
                                                    <Form.Item>
                                                            <Button
                                                                block={true}
                                                                size="large"
                                                                type="primary"
                                                                shape="round"
                                                                onClick={() => handleWithdrawal()}
                                                            >Rút tiền</Button>
                                                        </Form.Item>
                                                    </Col>
                                                </Row>
                                            </Form>
                                        </Card>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}