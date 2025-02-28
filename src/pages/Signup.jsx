import { Form, Input, Flex, Checkbox, Button, DatePicker, ConfigProvider } from "antd";
import { useNavigate } from "react-router";


const Signup = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const registerUser = (phoneNumber, name, email, password) => {
        const users = JSON.parse(localStorage.getItem("users")) || [];
      
        // Kiểm tra số điện thoại đã tồn tại chưa
        if (users.some(user => user.phoneNumber === phoneNumber)) {
          alert("Số điện thoại này đã được sử dụng!");
          return false;
        }
      
        // Tạo tài khoản mới
        const newUser = {
          id: `user_${Date.now()}`,
          phoneNumber,
          name,
          email,
          password,
          cart: []
        };
      
        // Lưu vào Local Storage
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
      
        alert("Đăng ký thành công!");
        navigate('/',{ replace: true })
        return true;
      };

    return ( 
        <div className="signup-container">
            <h1>Đăng kí tài khoản</h1>
            <Form 
                className="login-form-container" 
                labelCol={{span: 10}} 
                // wrapperCol={{span: 20}}
                // layout="vertical"
                onFinish={(values)=>{
                    registerUser(values.phoneNumber,values.name,values.email,values.password)
                    form.resetFields()
                }}
                >
                <Form.Item 
                    name="phoneNumber" 
                    label="Số điện thoại"
                    rules={[
                        {required: true,
                         message: "Bạn cần nhập số điện thoại"   
                        }
                    ]}
                >
                    <Input placeholder="Nhập số điện thoại"/>
                </Form.Item>
                <Form.Item 
                    name="name" 
                    label="Tên của bạn"
                    rules={[
                        {required: true,
                         message: "Bạn cần nhập tên của mình"   
                        }
                    ]}
                >
                    <Input placeholder="Nhập tên của bạn"/>
                </Form.Item>
                <Form.Item 
                    name="password" 
                    label="Mật khẩu"
                    rules={[
                        {required: true,
                         message: "Bạn cần nhập mật khẩu"   
                        },
                        {min: 6}
                    ]}
                >
                    <Input.Password placeholder="Nhập mật khẩu"/>
                </Form.Item>
                <Form.Item 
                    name="confirmPassword" 
                    label="Nhập lại mật khẩu"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {required: true,
                         message: "Bạn cần nhập lại mật khẩu"   
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                              if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                              }
                              return Promise.reject(new Error('Mật khẩu nhập lại không khớp!'));
                            },
                          }),
                    ]}
                >
                    <Input.Password placeholder="Nhập lại mật khẩu"/>
                </Form.Item>
                <Form.Item 
                    name="email" 
                    label="Email của bạn"
                    rules={[
                        {type: "email",
                         message: "Bạn cần nhập định dạng email"   
                        }
                    ]}
                >
                    <Input placeholder="Nhập email của bạn"/>
                </Form.Item>
                <Form.Item
                    name="dob"
                    label="Ngày sinh của bạn"
                >
                    <DatePicker type="date" placeholder="Chọn ngày sinh nhật"/>
                </Form.Item>
                <Flex align="center" vertical>
                    <Form.Item
                        name="agreement"
                        valuePropName="checked"
                        rules={[
                        {
                            validator: (_, value) =>
                            value ? Promise.resolve() : Promise.reject('Bạn phải đồng ý với điều khoản'),
                        },
                        ]}
                    >
                        <Checkbox>
                        Tôi đồng ý với <a href="">Điều khoản sử dụng</a>
                        </Checkbox>
                    </Form.Item>
                </Flex>
                <Form.Item>
                    <ConfigProvider theme={{ token: { colorPrimary: '#d60019' } }}>
                        <Button 
                            block
                            type="primary" 
                            htmlType="submit"
                            style={{width: "100%"}}
                        >
                        Đăng kí
                        </Button>
                    </ConfigProvider>    
                    </Form.Item>
            </Form>
        </div>
    );
}
 
export default Signup;