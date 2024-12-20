import { useState, useEffect } from 'react';
import { db } from '../firebase-config';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import styled from 'styled-components';

const AdminContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const RequestsTable = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  overflow: hidden;
`;

const RequestRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr auto;
  padding: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  
  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }
`;

const StatusBadge = styled.span`
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  background: ${props => 
    props.status === 'new' ? '#FFFFFF' :
    props.status === 'in-progress' ? '#FFD700' :
    props.status === 'completed' ? '#90EE90' : '#gray'};
`;

function Admin() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, 'characterRequests'),
      orderBy('timestamp', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const requestsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setRequests(requestsData);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AdminContainer>
      <h1>Character Requests</h1>
      <RequestsTable>
        <RequestRow>
          <strong>Brand</strong>
          <strong>Email</strong>
          <strong>Status</strong>
          <strong>Date</strong>
          <strong>Actions</strong>
        </RequestRow>
        {requests.map(request => (
          <RequestRow key={request.id}>
            <div>{request.brandName}</div>
            <div>{request.email}</div>
            <StatusBadge status={request.status}>
              {request.status}
            </StatusBadge>
            <div>
              {request.timestamp?.toDate().toLocaleDateString()}
            </div>
            <div>
              {request.imageUrl && <a href={request.imageUrl}>View Image</a>}
              {request.voiceUrl && <a href={request.voiceUrl}>View Voice</a>}
            </div>
          </RequestRow>
        ))}
      </RequestsTable>
    </AdminContainer>
  );
}

export default Admin; 