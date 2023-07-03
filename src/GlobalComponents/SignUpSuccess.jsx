import { Result, Button } from "antd";
import { Link } from "react-router-dom";

const SignUpSuccess = () => {
    return (
        <Result
        status="success"
        title="Successfully Signed Up"
        subTitle="You can now login to your account"
        extra={[
            <Link to="/login">
            <Button type="primary">Login</Button>
            </Link>,
        ]}
        />
    );
    }


export default SignUpSuccess;