'use client'
import React, { useEffect, useState } from "react";
import type { MenuProps } from "antd";
import { Dropdown, Flex } from "antd";
import Image from "next/image";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { DownOutlined } from '@ant-design/icons';


const items: MenuProps["items"] = [
    // {
    //     key: "1",
    //     label: "Cấu hình chung",
    // },
    {
        key: "2",
        label: "Đổi mật khẩu",
    },
    {
        key: "3",
        label: "Đăng xuất",
    },
];

const Account: React.FC = () => {
    const router = useRouter();
    const [profile, setProfile] = useState();

    useEffect(() => {
        // const profile = localStorage.getItem('profile');
        // setProfile(JSON.parse(profile))
    }, [])

    const onClick = (event: any) => {
        console.log('onChange', event)
        if(event.key === '3') {
            deleteCookie('token');
            router.refresh()
            
        }
    }

    return (
        <Dropdown menu={{ items, onClick }} placement="bottomRight">
            <Flex align="center" style={{ height: "100%" }}>
                <Image
                    src={require("./images/avatar.jpg")}
                    width={32}
                    height={32}
                    alt="avatar"
                    style={{borderRadius: 24}}
                />
                <span className="alp-header-fullName">{profile?.FullName}</span>
                <DownOutlined style={{paddingLeft: 12}} />
            </Flex>
        </Dropdown>
    )
};

export default Account;
