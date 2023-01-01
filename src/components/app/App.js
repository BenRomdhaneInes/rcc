
import React, {useState} from 'react'
import {Routes, Route} from "react-router-dom"
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import Header from '../header/Header';
import Home from '../home/home';
import DetailsPage from '../details-page/details-page';
import './App.css';

const queryClient = new QueryClient()

function App() {
  return (
    <div className="App">
      <Header/>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element = {<Home />} />
          <Route path="/details/:name" element = {<DetailsPage />} />
        </Routes>
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </QueryClientProvider>
      
    </div>
  );
}

export default App;
