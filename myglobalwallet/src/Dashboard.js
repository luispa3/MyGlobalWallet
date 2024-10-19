import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
    const profile = JSON.parse(sessionStorage.getItem('profile') ?? "");
    const [shares, setShares] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');


    useEffect(() => {
        const userId = profile?.userID;

        // Llamar al endpoint de shares
        const fetchShares = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/shares/get/user/${userId}`);
                setShares(response.data);
            } catch (err) {
                setError('Error al cargar las acciones');
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchShares();
        } else {
            setError('No se encontró el ID del usuario.');
            setLoading(false);
        }
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div style={{ padding: '20px' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1>MyGlobalWallet</h1>
                <h2>Hi{profile?.userName ? ", "+profile.userName : ""}</h2>
            </header>
            <h2>My Shares</h2>
            <table style={{ width: '100%', border: '1px solid black', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th style={{ border: '1px solid black', padding: '8px' }}>Share</th>
                        <th style={{ border: '1px solid black', padding: '8px' }}>Units</th>
                        <th style={{ border: '1px solid black', padding: '8px' }}>Investment</th>
                        <th style={{ border: '1px solid black', padding: '8px' }}>Buy Price</th>
                        <th style={{ border: '1px solid black', padding: '8px' }}>Actual Price</th>
                        <th style={{ border: '1px solid black', padding: '8px' }}>Benefits</th>
                        <th style={{ border: '1px solid black', padding: '8px' }}>Application</th>
                    </tr>
                </thead>
                <tbody>
                    {shares.length > 0 ? (
                        shares.map((share) => (
                            <tr key={share.id}>
                                <td style={{ border: '1px solid black', padding: '8px' }}>{share.Acronym}</td>
                                <td style={{ border: '1px solid black', padding: '8px' }}>{share.Units}</td>
                                <td style={{ border: '1px solid black', padding: '8px' }}>{share.Investment}{share.Currency}</td>
                                <td style={{ border: '1px solid black', padding: '8px' }}>{share.BuyPrice}{share.Currency}</td>
                                <td style={{ border: '1px solid black', padding: '8px' }}>{share.ActualPrice}{share.Currency}</td>
                                <td style={{ border: '1px solid black', padding: '8px' }}>{(share.ActualPrice-share.BuyPrice)*share.Units}{share.Currency}</td>
                                <td style={{ border: '1px solid black', padding: '8px' }}>{share.App}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" style={{ textAlign: 'center', border: '1px solid black', padding: '8px' }}>
                                You currently hold no active shares.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Dashboard;
