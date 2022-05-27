import React, { useState } from 'react'
import axios from 'axios';

const CustomersForm = ({getcustomers}) => {

    const [CustomerName, setCustomerName] = useState("");

    const addNewCustomer = (e) => {

        e.preventDefault();
        console.log(CustomerName);

        try {

            const customerData = {
                name : CustomerName   
            }
            axios.post("http://localhost:5000/customer", customerData)
            getcustomers();

        } catch (err) {
          console.log(`Customer Error : ${err}`);
        }
    }


    return (
        <div>
            <form onSubmit={addNewCustomer}>
                <input type="text"
                    onChange={(e) => setCustomerName(e.target.value)}
                     value = {CustomerName}
                />
                <button>Save New Customer</button>
            </form>
        </div>
    )
}

export default CustomersForm
