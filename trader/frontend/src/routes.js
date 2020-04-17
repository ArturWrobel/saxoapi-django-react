import React from 'react';
import { Route } from 'react-router-dom'

import ApexChart from './components/ApexChart'
import FetchData from './components/Data'

const BaseRouter = () => (
    <div>
        <Route exact path="/" component={FetchData} />
        <Route exact path="/chart" component={ApexChart}/>
    </div>
)

export default BaseRouter;