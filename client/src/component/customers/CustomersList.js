import React from 'react'

const CustomersList = ({ Customers }) => {

    const rederCustomers = () => {
        return Customers.map((customer, index) => {
            return <li key={index}>{customer.name}</li>
        })
    }


    return (
        <div>
            <ul>
                {rederCustomers()}
            </ul>

        </div>
    )
}

export default CustomersList
