import React from 'react';
import { Route } from 'react-router-dom'

import ApexChart from './components/ApexChart'
import Home from './components/Home'
import Options from './components/Options'

const BaseRouter = () => (
    <div>
        <Route exact path="/" component={Home} />
        <Route exact path="/currencies" component={ApexChart}/>
        <Route exact path="/options" component={Options}/>
    </div>
)

export default BaseRouter;