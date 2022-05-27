import React , {useState , useEffect} from 'react'
import axios from 'axios'
import CustomersForm from './CustomersForm'
import CustomersList from './CustomersList'

const Customers = () => {

    const [Customers, setCustomers] = useState([]);


    const getcustomers = async () => {
       const customerRes =   await axios.get("http://localhost:5000/customer")
       setCustomers(customerRes.data)
       console.log(Customers);
    }

    useEffect(() => {
        getcustomers()
    }, []);

    return (
        <div>
            <CustomersForm  getcustomers={getcustomers} />
            <CustomersList Customers={Customers} />
        </div>
    )
}

export default Customers
