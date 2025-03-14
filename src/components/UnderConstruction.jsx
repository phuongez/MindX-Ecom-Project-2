import { Link } from "react-router";

const UnderConstruction = () => {
    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>🚧 Trang này đang được thực hiện! 🚧</h1>
            <p style={styles.text}>Chúng tôi đang phát triển tính năng này. Vui lòng quay lại sau.</p>
            <Link to="/" style={styles.button}>Quay về trang chủ</Link>
        </div>
    );
};

const styles = {
    container: {
        textAlign: "center",
        padding: "50px",
    },
    heading: {
        fontSize: "28px",
        color: "#d60019",
        marginBottom: "10px",
    },
    text: {
        fontSize: "18px",
        color: "#555",
        marginBottom: "20px",
    },
    button: {
        display: "inline-block",
        padding: "10px 20px",
        backgroundColor: "#d60019",
        color: "#fff",
        textDecoration: "none",
        borderRadius: "5px",
    },
};

export default UnderConstruction;
