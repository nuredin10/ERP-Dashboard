import React, { useState, useEffect } from 'react';
import { DashboardLayout } from "../components/dashboard-layout";



const Finance = () => {
    return (
        <div>
            Finance
        </div>
    );
}

Finance.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Finance;

