import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
 
function Claims() {
    const [claims, setClaims] = useState([]);
 
    useEffect(() => {
        axios.get('http://localhost:8081/claim-info')
            .then(res => setClaims(res.data))
            .catch(err => console.log(err));
    }, []);
 
    return (
        <div>
            {/* Navigation Bar */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <Link className="navbar-brand" to="/">Policy Management System</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ml-auto">
                            {/* You can add navigation links here if needed */}
                        </ul>
                    </div>
                </div>
            </nav>
 
            {/* Claims Table */}
            <div className='container mt-5'>
                <h2 className='text-center mb-4'>Claims Management</h2>
                <div className="table-responsive">
                    <table className='table table-striped'>
                        <thead className='table-dark'>
                            <tr>
                                <th>Claim ID</th>
                                <th>Policy ID</th>
                                <th>Claim Amount</th>
                                <th>Reason</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {claims.map(claim => (
                                <tr key={claim.ClaimID}>
                                    <td>{claim.ClaimID}</td>
                                    <td>{claim.PolicyID}</td>
                                    <td>{claim.ClaimAmount}</td>
                                    <td>{claim.Reason}</td>
                                    <td>
                                        <Link to={`/claim-details/${claim.ClaimID}`} className='btn btn-info btn-sm me-1'>View Details</Link>
                                        {/* You can add more actions here, like approve/reject */}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
 
export default Claims;