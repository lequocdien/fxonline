import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { Card, Form, Input, Select, Col, Row, Button } from 'antd';
import NumberFormat from 'react-number-format';

const { Option } = Select;

const Order = (props) => {
    const { tradingAcc, currencyRate, typeOrder, trader, fetchTraderByTradingAccReq, createOfferReq } = props;

    const [orderForm, setOrderForm] = useState({
        quantity: 1000,
        price: 23500,
        description: '',
        trading_acc_id: 0,
        currency_rate_id: 0,
        type_order_id: 2
    })

    useEffect(() => {
        props.onResetTrader();
    }, [])

    const getNameTypeOrder = type_order_id => {
        return _.find(typeOrder, o => o.type_order_id === type_order_id)?.type_order_name;
    }

    const showContentTypeOrder = (lstTypeOrder) => {
        return _.map(lstTypeOrder, (item, index) => {
            return (
                <Option key={index} value={item.type_order_id}>{item.type_order_name}</Option>
            )
        })
    }

    const showContentCurrencyRate = (lstCurrencyRate) => {
        return _.map(lstCurrencyRate, item => {
            return (
                <Option key={item.currency_rate_id} value={item.currency_rate_id}>{item.name}</Option>
            )
        })
    }

    const showContentTradingAcc = (lstTradingAcc) => {
        return _.map(lstTradingAcc, item => {
            return (
                <Option key={item.trading_acc_id} value={item.trading_acc_id}>
                    <NumberFormat value={item.trading_acc_id} displayType="text" format="### ### ###" />
                </Option>
            )
        })
    }
    
    const onOrder = (e) => {
        e.preventDefault();
        createOfferReq(orderForm);
    }

    return (
        <div className="container-scroller">
            <Header />
            <div className="container-fluid page-body-wrapper">
                <div className="main-panel">
                    <div className="content-wrapper">
                        <div className="page-header">
                            <h3 className="page-title">Đặt Lệnh {getNameTypeOrder(orderForm.type_order_id)}</h3>
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item" aria-current="page">Lệnh giao dịch</li>
                                    <li className="breadcrumb-item active" aria-current="page"> Đặt lệnh </li>
                                </ol>
                            </nav>
                        </div>
                        <div className="row">
                            <div className="col-12 grid-margin">
                                <div className="card">
                                    <div className="card-body">
                                        <Card>
                                            <Form
                                                labelCol={{ span: 6 }}
                                            >
                                                <Row>
                                                    <Col span={12} >
                                                        <Form.Item label="Loại lệnh" >
                                                            <Select
                                                                value={orderForm.type_order_id}
                                                                onChange={(value) => setOrderForm({ ...orderForm, type_order_id: value })}
                                                            >
                                                                {showContentTypeOrder(typeOrder)}
                                                            </Select>
                                                        </Form.Item>
                                                    </Col>
                                                    <Col span={12} >
                                                        <Form.Item label="Số hiệu TKGD" >
                                                            <Select
                                                                value={orderForm.trading_acc_id}
                                                                onChange={(val) => {
                                                                    setOrderForm({ ...orderForm, trading_acc_id: val });
                                                                    fetchTraderByTradingAccReq({ tradingAcc: val });
                                                                }}
                                                            >
                                                                <Option key={0} value={0} >---------</Option>
                                                                {showContentTradingAcc(tradingAcc)}
                                                            </Select>
                                                        </Form.Item>
                                                    </Col>
                                                    <Col span={12} >
                                                        <Form.Item label="Tỷ giá" >
                                                            <Select
                                                                value={orderForm.currency_rate_id}
                                                                onChange={(val) => setOrderForm({ ...orderForm, currency_rate_id: val })}
                                                            >
                                                                <Option value={0} >---------</Option>
                                                                {showContentCurrencyRate(currencyRate)}
                                                            </Select>
                                                        </Form.Item>
                                                    </Col>
                                                    <Col span={12} >
                                                        <Form.Item label="Họ và tên" >
                                                            <Input
                                                                disabled
                                                                value={trader.full_name}
                                                            />
                                                        </Form.Item>
                                                    </Col>
                                                    <Col span={12} >
                                                        <Form.Item label="Khối lượng" >
                                                            <NumberFormat
                                                                customInput={Input}
                                                                thousandSeparator={true}
                                                                value={orderForm.quantity}
                                                                onValueChange={val =>
                                                                    setOrderForm({ ...orderForm, quantity: val.floatValue })
                                                                }
                                                            />
                                                        </Form.Item>
                                                    </Col>
                                                    <Col span={12} >
                                                        <Form.Item label="Ghi chú" >
                                                            <Input
                                                                value={orderForm.description}
                                                                onChange={(e) => setOrderForm({ ...orderForm, description: e.target.value })}
                                                            />
                                                        </Form.Item>
                                                    </Col>
                                                    <Col span={12} >
                                                        <Form.Item label="Giá" >
                                                            <NumberFormat
                                                                suffix={'VND'}
                                                                customInput={Input}
                                                                thousandSeparator={true}
                                                                value={orderForm.price}
                                                                onValueChange={val =>
                                                                    setOrderForm({ ...orderForm, price: val.floatValue })
                                                                }
                                                            />
                                                        </Form.Item>
                                                    </Col>
                                                    <Col span={12} >
                                                    </Col>
                                                    <Col span={12} >
                                                        <Form.Item label="Tổng tiền" >
                                                            <NumberFormat
                                                                suffix={'VND'}
                                                                customInput={Input}
                                                                thousandSeparator={true}
                                                                value={orderForm.price*orderForm.quantity}
                                                                disabled
                                                            />
                                                        </Form.Item>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col span={12} style={{ display: 'flex', justifyContent: 'center' }}>
                                                        <Button
                                                            block={true}
                                                            shape="round"
                                                            type="primary"
                                                            onClick={(e) => onOrder(e)}
                                                        >{getNameTypeOrder(orderForm.type_order_id)}</Button>
                                                        <Button
                                                            block={true}
                                                            shape="round"
                                                            type="ghost"
                                                            style={{ margin: '0 8px' }}
                                                        >Làm mới</Button>
                                                    </Col>
                                                </Row>
                                            </Form>
                                        </Card>
                                        {/* <form
                                            className="form-sample"
                                            onSubmit={onOrder}>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group row">
                                                        <label className="col-sm-3 col-form-label">Loại lệnh</label>
                                                        <div className="col-sm-9">
                                                            <select
                                                                name="isbuy"
                                                                className="form-control"
                                                                value={orderForm.is_buy}
                                                                onChange={onChangeForm}>
                                                                <option value={false}>Mua</option>
                                                                <option value={true}>Bán</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group row">
                                                        <label className="col-sm-3 col-form-label">Số hiệu TKGD</label>
                                                        <div className="col-sm-9">
                                                            <select
                                                                name="tradingAccId"
                                                                className="form-control"
                                                                value={orderForm.tradingAccId}
                                                                onChange={onChangeForm}>
                                                                <option value={0}>--------</option>
                                                                {showContentTradingAcc(tradingAcc)}
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group row">
                                                        <label className="col-sm-3 col-form-label">Tỷ giá</label>
                                                        <div className="col-sm-9">
                                                            <select
                                                                name="currencyRateId"
                                                                className="form-control"
                                                                value={orderForm.currencyRateId}
                                                                onChange={onChangeForm}>
                                                                <option value={0}>--------</option>
                                                                {showContentCurrencyRate(props.currencyRate)}
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group row">
                                                        <label className="col-sm-3 col-form-label">Họ tên KH</label>
                                                        <div className="col-sm-9">
                                                            <input
                                                                className="form-control"
                                                                placeholder=""
                                                                disabled
                                                                value={`${first_name} ${last_name}`}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group row">
                                                        <label className="col-sm-3 col-form-label">Giá</label>
                                                        <div className="col-sm-9">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="0"
                                                                name="price"
                                                                defaultValue={orderForm.price}
                                                                onChange={onChangeForm}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group row">
                                                        <label className="col-sm-3 col-form-label">Ghi chú</label>
                                                        <div className="col-sm-9">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                name="description"
                                                                value={orderForm.description}
                                                                onChange={onChangeForm} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group row">
                                                        <label className="col-sm-3 col-form-label">Khối lượng</label>
                                                        <div className="col-sm-9">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                name="quantity"
                                                                value={orderForm.quantity}
                                                                onChange={onChangeForm} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <button
                                                type="submit"
                                                className="btn btn-primary btn-rounded btn-fw">{orderForm.isbuy ? 'Mua' : 'Bán'}</button>&nbsp;
                                            <button type="reset" className="btn btn-secondary btn-rounded btn-fw">Làm mới</button>
                                        </form> */}
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
};

export default Order;