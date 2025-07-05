import React from 'react'
import MovieList from './MovieList'
import TheatreTable from './TheatreTable'
import { Tabs } from 'antd'

export default function Admin () {
    const TabItems = [
        {
            key: "1",
            label: "Movies",
            children: <MovieList />
        },
        {
            key: "2",
            label: "Theatres",
            children: <TheatreTable />
        },
    ]
    return (
        <div>
            <h1>Admin Page</h1>
            <Tabs items={TabItems} />
        </div>
        
    )
}