import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { HomeOutlined, LogoutOutlined, ProfileOutlined, UserOutlined } from '@ant-design/icons'
import { hideLoading, showLoading } from "../redux/loaderSlice"
import { GetCurrentUser } from "../apicalls/user"
import { SetUser } from "../redux/userSlice"
import { Layout, Menu, message } from "antd"
import { Header } from "antd/es/layout/layout";


function ProtectedRoute ({ children }) {
    const [messageApi, contextHolder] = message.useMessage()
    const user = useSelector((state) => state.user.user)
    console.log("USER => ", user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // nav bar icons
    const navItems = [
        {
            label: "Home",
            icon: <HomeOutlined />
        },
        {
            label: "User",
            icon: <UserOutlined />
        },
        {
            label: `${user? user.name : ""}`,
            icon: <ProfileOutlined />,
            children: [
                {
                    label: (
                        <span
                           onClick={() => {
                            if (user.role === "admin") {
                                navigate('/admin')
                            } else if (user.role === "partner"){
                                navigate('/partner')
                            }
                            else {
                                navigate('/profile')
                            }
                        }}
                    >
                        My Profile
                        </span>
                    ), 
                    icon: <ProfileOutlined />,
                },
                {
                    label: (
                    <Link
                        to="/login"
                        onClick={() => {
                        localStorage.removeItem("token");
                    }}
                    >
                    Logout
                    </Link>
                    ),
                    icon: <LogoutOutlined />,
                },
            ],
        },
    ]

    const getValidUser = async () => {
        try{
            dispatch(showLoading())
        const res = await GetCurrentUser()
        dispatch(SetUser(res.data))
        dispatch(hideLoading())
        console.log('CURRRRRR USER', res.data)
        }
        catch(e){
            dispatch(SetUser(null))
            message.open({
                type: "error",
                content: e?.res?.data?.message || e.message,
            })
        }
        
    }
    useEffect(() => {
        if (localStorage.getItem("token")) {
            getValidUser()
            console.log('user is fetched', user)
        }else{
            navigate('/login')
        }
    }, [])

    return (
    <div style={{ width: "100%" }}>
      {contextHolder}
      {user && (
        <Layout style={{ margin: 0, padding: 0 }}>
          <Header
            className="d-flex justify-content-between"
            style={{
              position: "sticky",
              top: 0,
              zIndex: 1,
              width: "100%",
              paddingInline: "0px", // or adjust as needed
              backgroundColor: "#001529", // default dark theme
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h3 className="demo-logo text-white m-0" style={{ color: "white" }}>
              Book My Show
            </h3>
            <Menu theme="dark" mode="horizontal" items={navItems} />
          </Header>
          <div style={{ padding: 24, minHeight: "100vh", background: "#fff" }}>
            {children}
          </div>
        </Layout>
      )}
    </div>
  );
}

export default ProtectedRoute