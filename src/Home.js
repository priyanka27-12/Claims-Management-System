import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
 
function Home() {
    const [policies, setPolicies] = useState([]);
 
    useEffect(() => {
        axios.get('http://localhost:8081/home')
            .then(res => setPolicies(res.data))
            .catch(err => console.log(err));
    }, []);
 
    return (
        <div>
            {/* Navigation Bar */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                <span className="navbar-brand">Policy Management System</span>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                    <Link className="nav-link" to="/claim-list" style={{ fontSize: '20px', fontWeight: 'bold', color: 'white' }}>Claim List</Link>
                </li>

                        </ul>
                    </div>
                </div>
            </nav>
 
            {/* Policy Table */}
            <div className='container mt-5'>
                <h2 className='text-center mb-4'>Policy Management</h2>
                <div className="table-responsive">
                    <table className='table table-striped'>
                        <thead className='table-dark'>
                            <tr>
                                <th>Policy ID</th>
                                <th>Policy Type</th>
                                <th>Tenure</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Policy Amount</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {policies.map(policy => (
                                <tr key={policy.PolicyID}>
                                    <td>{policy.PolicyID}</td>
                                    <td>{policy.PolicyType}</td>
                                    <td>{policy.Tenure}</td>
                                    <td>{policy.StartDate}</td>
                                    <td>{policy.EndDate}</td>
                                    <td>{policy.PolicyAmount}</td>
                                    <td>
                                        <Link to={`/terms-and-conditions/${policy.PolicyID}`} className='btn btn-info btn-sm me-1'>Terms and Conditions</Link>
                                        <Link to={`/file-claim/${policy.PolicyID}`} className='btn btn-success btn-sm me-1'>File Claim</Link>

                                        {/* <Link to={`/file-claim/${policy.PolicyID}`} className='btn btn-success btn-sm me-1'>File Claim</Link> */}
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
 
export default Home;
