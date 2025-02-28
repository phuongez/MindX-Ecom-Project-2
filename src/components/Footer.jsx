import { Button } from "antd";

const Footer = () => {
    return ( 
        <footer>
            <div className="upper-footer">
                <div className="footer-company">
                    <h2>Hệ thống Phone Store</h2>
                    <Button className="footer-btns" type="link">Giới thiệu Phone Store</Button>
                    <Button className="footer-btns" type="link">Trung tâm sửa chữa & bảo hành (09:00 - 19:00)</Button>
                    <Button className="footer-btns" type="link">Trung tâm bảo hành chính hãng</Button>
                    <Button className="footer-btns" type="link">Hợp tác kinh doanh</Button>
                    <Button className="footer-btns" type="link">Tuyển dụng</Button>
                    <Button className="footer-btns" type="link">Khách hàng doanh nghiệp</Button>
                </div>
                <div className="footer-company">
                    <h2>Hướng dẫn mua hàng</h2>
                    <Button className="footer-btns" type="link">Thu cũ đổi mới</Button>
                    <Button className="footer-btns" type="link">Hướng dẫn mua hàng online</Button>
                    <Button className="footer-btns" type="link">Hướng dẫn mua hàng trả góp</Button>
                    <Button className="footer-btns" type="link">Vận chuyển - thanh toán</Button>
                    <Button className="footer-btns" type="link">Chính sách đổi trả / bảo hành</Button>
                    <Button className="footer-btns" type="link">Điều khoản sử dụng</Button>
                </div>
                <div className="footer-contact">
                    <div className="call-centers">
                        <div className="call-center">
                            <p>Tổng đài (9:00 - 21:00)</p>
                            <p>Mua hàng/Khiếu nại</p>
                            <a href="tel:190020qw">
                                <Button>1900.2012</Button>
                            </a>
                        </div>
                        <div className="call-center">
                            <p>Tổng đài (9:00 - 19:00)</p>
                            <p>Bảo hành/Phần mềm</p>
                            <a href="tel:19006979">
                                <Button>1900.6979</Button>
                            </a>
                        </div>
                        
                    </div>
                </div>
            </div>
        </footer>
    );
}
 
export default Footer;