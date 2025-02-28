import React, { useState } from "react";
import { Modal, Form, Input, Button, Radio } from "antd";

const CheckoutModal = ({ visible, onClose, onConfirm }) => {
  const [form] = Form.useForm();
  const [paymentMethod, setPaymentMethod] = useState("cash");

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleSubmit = () => {
    form.validateFields()
      .then(values => {
        onConfirm(values);
        form.resetFields(); // Reset form sau khi đặt hàng
      })
      .catch(errorInfo => {
        console.log("Validation Failed:", errorInfo);
      });
  };

  return (
    <Modal
      title="Thông tin giao hàng"
      open={visible}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>Hủy</Button>,
        <Button key="confirm" type="primary" onClick={handleSubmit}>Xác nhận</Button>
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item label="Tên người nhận" name="name" rules={[{ required: true, message: "Vui lòng nhập tên!" }]}>
          <Input />
        </Form.Item>
        
        <Form.Item label="Số điện thoại" name="phone" rules={[
          { required: true, message: "Vui lòng nhập số điện thoại!" },
          { pattern: /^[0-9]{10,11}$/, message: "Số điện thoại không hợp lệ!" }
        ]}>
          <Input />
        </Form.Item>
        
        <Form.Item label="Địa chỉ nhận hàng" name="address" rules={[{ required: true, message: "Vui lòng nhập địa chỉ!" }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Phương thức thanh toán" name="paymentMethod" initialValue="cash">
          <Radio.Group onChange={handlePaymentChange}>
            <Radio value="cash">Tiền mặt</Radio>
            <Radio value="bank">Thẻ ngân hàng</Radio>
          </Radio.Group>
        </Form.Item>

        {paymentMethod === "bank" && (
          <Form.Item label="Số thẻ ngân hàng" name="cardNumber" rules={[
            { required: true, message: "Vui lòng nhập số thẻ!" },
            { pattern: /^[0-9]{16}$/, message: "Số thẻ phải gồm 16 chữ số!" }
          ]}>
            <Input maxLength={16} />
          </Form.Item>
        )}
      </Form>
    </Modal>
  );
};

export default CheckoutModal;
