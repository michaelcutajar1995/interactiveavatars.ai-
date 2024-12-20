import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Container, Row, Col } from 'react-bootstrap';

class TokenWaitlist extends React.Component {
    state = {
        email: '',
        walletAddress: '',
        isSubmitting: false
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        this.setState({ isSubmitting: true });
        
        try {
            const response = await axios.post('/api/token-waitlist', {
                email: this.state.email,
                walletAddress: this.state.walletAddress
            });
            
            toast.success('Successfully joined the waitlist!');
        } catch (error) {
            toast.error('Error joining waitlist');
        } finally {
            this.setState({ isSubmitting: false });
        }
    };

    render() {
        return (
            <Container className="py-5">
                <Row className="justify-content-center">
                    <Col md={8} lg={6}>
                        <div className="token-info-card mb-4">
                            <h2>$AIP Token</h2>
                            <p>Join our waitlist to be first in line for our upcoming token launch!</p>
                            {/* Token metrics and info here */}
                        </div>
                        
                        <div className="waitlist-form-card">
                            <form onSubmit={this.handleSubmit}>
                                <h3>Join Token Waitlist</h3>
                                <div className="mb-3">
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="Your Email"
                                        value={this.state.email}
                                        onChange={(e) => this.setState({ email: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Wallet Address (Optional)"
                                        value={this.state.walletAddress}
                                        onChange={(e) => this.setState({ walletAddress: e.target.value })}
                                    />
                                </div>
                                <button 
                                    type="submit" 
                                    className="btn btn-primary w-100"
                                    disabled={this.state.isSubmitting}
                                >
                                    {this.state.isSubmitting ? 'Joining...' : 'Join Waitlist'}
                                </button>
                            </form>
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default TokenWaitlist;