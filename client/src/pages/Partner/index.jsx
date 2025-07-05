import React from 'react'
import TheatreList from './TheatreList'
import { Tabs } from 'antd'

export default function Partner () {
    const TabItems = [
        {
            key: "1",
            label: "Theatres",
            children: <TheatreList />
        },
    ]
    return (
        <div>
            <h1>Partner Page</h1>
            <Tabs items={TabItems} />
        </div>
        
    )
}