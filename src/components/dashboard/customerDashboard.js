import OrdersListForCustomer from "../pages/ordersListCustomer";
import RequestForm from "../pages/requestForm";
import RequestListForCustomer from "../pages/requestsListCustomer";

export default function CustomerDashboard(){
    return (
        <div>
            <h3>Customer Dashboard</h3>
            <RequestForm />
            <RequestListForCustomer />
            <OrdersListForCustomer />
        </div>
    )
}