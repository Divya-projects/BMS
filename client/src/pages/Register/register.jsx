import { Button, Form, Input, message, Radio } from 'antd'
import { Link, useNavigate  } from 'react-router-dom'
import { RegisterUser } from '../../apicalls/user'

function Register () {
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();

    const onFinish = async (values) => {
        try{
            console.log('doooo', values)
            const res = await RegisterUser(values)
            if (res.success) {
        messageApi.open({
          type: "success",
          content: res.message,
        });
        navigate("/");
      } else {
        messageApi.open({
          type: "error",
          content: res.message,
        });
      }
    } catch (err) {
      messageApi.open({
        type: "error",
        content: err,
      });
    }
    }
    return <>
        <div>
            <header className="App-header">
                <main className="main-area mw-500 text-center px-3">
                    <section className="left-section">
                        <h1>Register to BMS</h1>
                    </section>

                    <section className="right-section">
                        <Form layout="vertical" onFinish={onFinish}>
                            <Form.Item
                                label="Name"
                                htmlFor='name'
                                name='name'
                                className='d-block'
                                rules={[ { required: true, message: 'Name is required'}]}
                            >
                                <Input
                                    id='name'
                                    type='name'
                                    placeholder='Enter your email'
                                ></Input> 
                            </Form.Item>

                            <Form.Item
                                label="Email"
                                htmlFor='email'
                                name='email'
                                className='d-block'
                                rules={[ { required: true, message: 'Email is required'}]}
                            >
                                <Input
                                    id='email'
                                    type='email'
                                    placeholder='Enter your email'
                                ></Input> 
                            </Form.Item>

                            <Form.Item
                                label="Password"
                                htmlFor='password'
                                name='password'
                                className='d-block'
                                rules={[ { required: true, message: 'Password is required'}]}
                            >
                                <Input
                                    id='password'
                                    type='password'
                                    placeholder='Enter your password'
                                ></Input> 
                            </Form.Item>

                            <Form.Item className="d-block">
                                <Button
                                    type="primary"
                                    block
                                    htmlType="submit"
                                    style={{ fontSize: "1rem", fontWeight: "600" }}
                                >
                                Register
                                </Button>
                            </Form.Item>

                            <Form.Item
                                label="Register as a Partner"
                                htmlFor='isAdmin'
                                name='isAdmin'
                                className='d-block text-center'
                                initialValue={"user"}
                            >
                            <div style={{ display: "flex", justifyContent: "start" }}>
                                <Radio.Group name="radiogroup" className="flex-start">
                                    <Radio value={"partner"}>Yes</Radio>
                                    <Radio value={"user"}>No</Radio>
                                </Radio.Group>
                            </div> 
                            </Form.Item>
                        </Form>

                    <div>
                        <p>
                            Already a User? <Link to='/login'>Login Here</Link>
                        </p>
                    </div>
                    </section>
                </main>
            </header>
        </div>
    </>
}
export default Register