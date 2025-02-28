import { useEffect } from "react";
import { Form, Input, Flex, Checkbox, Button, ConfigProvider } from "antd";
import { useLocation, useNavigate, Link } from "react-router";

const Login = ({ onLogin }) => {
    const [form] = Form.useForm();
    const location = useLocation();
    // console.log(location)
    const navigate = useNavigate();
    const from = location.state?.from || "/";

    // Khi component mount, kiểm tra localStorage để điền lại thông tin nếu có
    useEffect(() => {
        const savedCredentials = JSON.parse(localStorage.getItem("rememberedUser"));
        if (savedCredentials) {
            form.setFieldsValue({
                phoneNumber: savedCredentials.phoneNumber,
                password: savedCredentials.password,
                remember: true
            });
        }
    }, [form]);

    const loginUser = (phoneNumber, password, remember) => {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const user = users.find(user => user.phoneNumber === phoneNumber && user.password === password);
        
        if (!user) {
            alert("Số điện thoại hoặc mật khẩu không đúng!");
            return false;
        }

        // Nếu chọn "Ghi nhớ", lưu số điện thoại và mật khẩu vào localStorage
        if (remember) {
            localStorage.setItem("rememberedUser", JSON.stringify({ phoneNumber, password }));
        } else {
            localStorage.removeItem("rememberedUser");
        }

        // Lưu trạng thái đăng nhập vào Session Storage
        onLogin(user);
        alert("Đăng nhập thành công!");
        navigate(from, { replace: true });
        return true;
    };

    return ( 
        <div className="login-container">
            <h1>Đăng nhập tài khoản</h1>
            <Form 
                form={form}
                className="login-form-container"
                labelCol={{ span: 10 }}
                layout="vertical"
                onFinish={(values) => {
                    loginUser(values.phoneNumber, values.password, values.remember);
                }}
            >
                <Form.Item 
                    name="phoneNumber" 
                    label="Số điện thoại"
                    rules={[
                        { required: true, message: "Bạn cần nhập số điện thoại" }
                    ]}
                >
                    <Input placeholder="Nhập số điện thoại" />
                </Form.Item>

                <Form.Item 
                    name="password" 
                    label="Mật khẩu"
                    rules={[
                        { required: true, message: "Bạn cần nhập mật khẩu" }
                    ]}
                >
                    <Input.Password placeholder="Nhập mật khẩu" />
                </Form.Item>

                <Form.Item>
                    <Flex justify="space-between" align="center">
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Ghi nhớ</Checkbox>
                        </Form.Item>
                        <Link to="/forgot-password" style={{ color: "#d60019" }}>Quên mật khẩu?</Link>
                    </Flex>
                </Form.Item>

                <Form.Item>
                    <ConfigProvider theme={{ token: { colorPrimary: '#d60019' } }}>
                        <Button 
                            block 
                            type="primary" 
                            htmlType="submit" 
                            style={{marginBottom: "1em" }}
                        >
                            Đăng nhập
                        </Button>
                    </ConfigProvider>    
                    Chưa có tài khoản? <Link to="/signup" style={{ color: "#d60019" }}>Đăng ký ngay!</Link>
                </Form.Item>
            </Form>
        </div>
    );
};
 
export default Login;
