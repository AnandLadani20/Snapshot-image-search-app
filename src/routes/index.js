import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import MenuImagePage from '../pages/MenuImagePage'
import SearchImagePage from '../pages/SearchImagePage'
import ImagePage from '../components/ImagePage'
import Error from '../pages/Error'

const index = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<Home />}></Route>
                <Route path='/photos/:queryMenu' element={<MenuImagePage />}></Route>
                <Route path='/search/photos/:querySearch' element={<SearchImagePage />}></Route>
                <Route path='/image/:imageName' element={<ImagePage />}></Route>
                <Route path='*' element={<Error />} />
            </Routes>
        </>
    )
}

export default index