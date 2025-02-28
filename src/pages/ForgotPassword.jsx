import { useState } from "react";
import { Form, Input, Button, Alert } from "antd";
import { useNavigate } from "react-router";

const ForgotPassword = () => {
    const [form] = Form.useForm();
    const [step, setStep] = useState(1); // Bước 1: Nhập số điện thoại, Bước 2: Nhập mật khẩu mới
    const [currentUser, setCurrentUser] = useState(null);
    const navigate = useNavigate();

    const handlePhoneSubmit = (values) => {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const user = users.find(u => u.phoneNumber === values.phoneNumber);

        if (!user) {
            alert("Số điện thoại chưa được đăng ký!");
            return;
        }

        setCurrentUser(user);
        setStep(2);
    };

    const handleResetPassword = (values) => {
        let users = JSON.parse(localStorage.getItem("users")) || [];
        users = users.map(u => u.phoneNumber === currentUser.phoneNumber ? { ...u, password: values.newPassword } : u);

        localStorage.setItem("users", JSON.stringify(users));
        alert("Mật khẩu đã được cập nhật. Vui lòng đăng nhập lại.");
        navigate("/login");
    };

    return (
        <div className="forgot-password-container">
            <h1>Quên mật khẩu</h1>
            {step === 1 ? (
                <Form form={form} layout="vertical" onFinish={handlePhoneSubmit}>
                    <Form.Item 
                        name="phoneNumber"
                        label="Nhập số điện thoại"
                        rules={[{ required: true, message: "Vui lòng nhập số điện thoại!" }]}
                    >
                        <Input placeholder="Nhập số điện thoại" />
                    </Form.Item>
                    <Form.Item>
                        <Button block type="primary" htmlType="submit" style={{ backgroundColor: "#f77925" }}>
                            Xác nhận
                        </Button>
                    </Form.Item>
                </Form>
            ) : (
                <Form form={form} layout="vertical" onFinish={handleResetPassword}>
                    <Alert message={`Xác nhận số: ${currentUser.phoneNumber}`} type="success" showIcon />
                    <Form.Item 
                        name="newPassword"
                        label="Mật khẩu mới"
                        rules={[{ required: true, message: "Vui lòng nhập mật khẩu mới!" }]}
                    >
                        <Input.Password placeholder="Nhập mật khẩu mới" />
                    </Form.Item>
                    <Form.Item>
                        <Button block type="primary" htmlType="submit" style={{ backgroundColor: "#f77925" }}>
                            Đổi mật khẩu
                        </Button>
                    </Form.Item>
                </Form>
            )}
        </div>
    );
};

export default ForgotPassword;
