const { DashboardLayout } = require("src/components/dashboard-layout");

const ProductionFinished = () => {
    return ( 
        <div>

        </div>
     );
}
ProductionFinished.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>
 
export default ProductionFinished;