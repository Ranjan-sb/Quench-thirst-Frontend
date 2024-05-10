import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";
import { Spinner, Container, Row, Col ,Button } from 'react-bootstrap'
export default function PrivateRoute({ permittedRoles, children }) {
    const { user } = useAuth() 
    if(!user && localStorage.getItem('token')){
        return <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
        <Row>
            <Col>
                <Button
                    color="primary"
                    disabled
                    >
                    <Spinner size="sm">
                    </Spinner>
                    <span>
                        {' '}Loading...
                    </span>
                </Button>
            </Col>
        </Row>
    </Container>
    }


    if(!user) {
        return <Navigate to="/" />
    }

    if(!permittedRoles.includes(user.role)) {
        return <Navigate to="/unauthorized" /> 
    }

    return children
}