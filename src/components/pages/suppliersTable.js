import DataTable from 'react-data-table-component'

//it is coming from admin dashboard
export default function SuppliersTable({ suppliers, handleApprove, handleRemove, handleShow }) {
    const columns = [
        {
            name: 'Username',
            selector: row => row.userId.username,
            sortable: true
        },
        {
            name: 'Email',
            selector: row => row.userId.email,
            sortable: true
        },
        {
            name: 'License Number',
            selector: row => row.licenseNumber,
            sortable: true
        },
        {
            name: 'Is Approved',
            selector: row => row.isApproved,
            sortable: true,
            cell: row => row.isApproved ? 'Yes' : 'No'
        },
        {
            name: 'Action',
            cell: row => (
                !row.isApproved ? (
                    <>
                        <button onClick={() => handleApprove(row._id)}>Approve</button>
                        <button onClick={() => handleRemove(row._id)}>Reject</button>
                        <button onClick={() => handleShow(row._id)}>Show</button>
                    </>
                ) : (
                    <button onClick={() => handleShow(row._id)}>Show</button>
                )
            )
        }
    ]
    return (
        <DataTable
            title="Suppliers List"
            columns={columns}
            data={suppliers}
            pagination
            highlightOnHover
            striped
            pointerOnHover
            paginationPerPage={5}
            paginationRowsPerPageOptions={[5, 10, 15]}
        />
    )
}