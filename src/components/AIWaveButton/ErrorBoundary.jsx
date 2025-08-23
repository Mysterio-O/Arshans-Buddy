import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Error caught by boundary:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return <div>Something went wrong.</div>;
        }

        class ErrorBoundary extends React.Component {
            constructor(props) {
                super(props);
                this.state = { hasError: false, error: null };
            }

            static getDerivedStateFromError(error) {
                return { hasError: true, error };
            }

            componentDidCatch(error, errorInfo) {
                console.error("Error caught by boundary:", error, errorInfo);
            }

            render() {
                if (this.state.hasError) {
                    return (
                        <div className="p-4 bg-red-100 border border-red-400 rounded text-red-700">
                            <h3 className="font-bold">Something went wrong</h3>
                            <details className="mt-2 text-sm">
                                {this.state.error && this.state.error.toString()}
                            </details>
                        </div>
                    );
                }

                return this.props.children;
            }
        }

        return this.props.children;
    }
}

export default ErrorBoundary;