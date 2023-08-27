import React from "react"

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props)
        this.state = { hasError: false }
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true }
    }

    // do something when error, ex: log error
    componentDidCatch(error, info) {
        console.log('>>> error >>>', error)
        console.log('>>> info >>>', info)
    }

    render() {
        if (this.state.hasError) {
            // Render any custom fallback UI
            return this.props.fallback
        }

        return this.props.children
    }
}

export default ErrorBoundary