import React from 'react';

class GlobalErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({ error, errorInfo });
        console.error("Global Uncaught error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{
                    padding: '20px',
                    color: 'white',
                    backgroundColor: '#d32f2f',
                    height: '100vh',
                    fontFamily: 'sans-serif'
                }}>
                    <h1>⚠️ GLOBAL APP CRASH</h1>
                    <p>The application failed to start.</p>
                    <div style={{
                        backgroundColor: 'rgba(0,0,0,0.3)',
                        padding: '10px',
                        borderRadius: '4px',
                        overflow: 'auto',
                        maxHeight: '80vh'
                    }}>
                        <h3>Error:</h3>
                        <pre>{this.state.error && this.state.error.toString()}</pre>
                        <h3>Component Stack:</h3>
                        <pre>{this.state.errorInfo && this.state.errorInfo.componentStack}</pre>
                    </div>
                    <button
                        onClick={() => window.location.reload()}
                        style={{
                            marginTop: '20px',
                            padding: '10px 20px',
                            fontSize: '16px',
                            cursor: 'pointer'
                        }}
                    >
                        Reload Page
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default GlobalErrorBoundary;
