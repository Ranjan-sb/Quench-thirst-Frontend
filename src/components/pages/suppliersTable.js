// import React from 'react'
// export default function SuppliersTable({ suppliers, handleApprove, handleRemove }){
//     return (
//         <table>
//             <thead>
//                 <tr>
//                     <th>Username</th>
//                     <th>Email</th>
//                     <th>License Number</th>
//                     <th>Is Approved</th>
//                     <th>Action</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 {suppliers.map(supplier => (
//                     <tr key={supplier._id}>
//                         <td>{supplier.userId.username}</td>
//                         <td>{supplier.userId.email}</td>
//                         <td>{supplier.licenseNumber}</td>
//                         <td>{supplier.isApproved ? 'Yes' : 'No'}</td>
//                         <td>
//                             {!supplier.isApproved && (
//                                 <>
//                                     <button onClick={() => handleApprove(supplier._id)}>Approve</button>
//                                     <button onClick={() => handleRemove(supplier._id)}>Delete</button>
//                                 </>
//                             )}
//                         </td>
//                     </tr>
//                 ))}
//             </tbody>
//         </table>
//     );
// };

import DataTable from 'react-data-table-component'
//import { Form, Col, Row } from 'react-bootstrap'

export default function SuppliersTable({suppliers,handleApprove,handleDelete}){
    const columns = [
        {
          name: 'Username',
          selector: 'userId.username',
          sortable: true
        },
        {
          name: 'Email',
          selector: 'userId.email',
          sortable: true
        },
        {
          name: 'License Number',
          selector: 'licenseNumber',
          sortable: true
        },
        {
          name: 'Is Approved',
          selector: 'isApproved',
          sortable: true,
          cell: row => row.isApproved ? 'Yes' : 'No'
        },
        {
          name: 'Action',
          cell: row => (
            !row.isApproved && (
              <>
                <button onClick={() => handleApprove(row._id)}>Approve</button>
                <button onClick={() => handleDelete(row._id)}>Delete</button>
              </>
            )
          )
        }
      ];
    
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
      );
    }


