import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory

function ClaimForm() {
    const { policyId } = useParams();
    const navigate = useNavigate(); // Replace useHistory with useNavigate
    const [policy, setPolicy] = useState({});
    const [claimAmount, setClaimAmount] = useState('');
    const [reason, setReason] = useState('');

    useEffect(() => {
        // Fetch policy details to pre-fill the form
        axios.get(`http://localhost:8081/policy/${policyId}`)
            .then(res => setPolicy(res.data))
            .catch(err => console.log(err));
    }, [policyId]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (claimAmount > policy.PolicyAmount) {
            alert("Claim amount cannot exceed the policy amount.");
            return;
        }
        // Submit claim logic
        axios.post('http://localhost:8081/claims', { policyId, claimAmount, reason })
            .then(() => {
                alert('Claim submitted successfully');
                navigate('/home'); // Use navigate function instead of history.push
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="container mt-5">
            <h2>File a Claim</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="policyId" className="form-label">Policy ID</label>
                    <input type="text" className="form-control" id="policyId" value={policy.PolicyID || ''} readOnly />
                </div>
                <div className="mb-3">
                    <label htmlFor="policyType" className="form-label">Policy Type</label>
                    <input type="text" className="form-control" id="policyType" value={policy.PolicyType || ''} readOnly />
                </div>
                <div className="mb-3">
                    <label htmlFor="claimAmount" className="form-label">Claim Amount</label>
                    <input type="number" className="form-control" id="claimAmount" value={claimAmount} onChange={e => setClaimAmount(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="reason" className="form-label">Reason for Claim</label>
                    <textarea className="form-control" id="reason" rows="3" value={reason} onChange={e => setReason(e.target.value)}></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Submit Claim</button>
            </form>
        </div>
    );
}

export default ClaimForm;
