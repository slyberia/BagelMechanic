// src/components/layout/ErrorBoundary.tsx
import * as React from 'react';
import { motion } from 'motion/react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '../ui/Button';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-charcoal flex items-center justify-center p-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md w-full bg-ink border border-white/10 p-12 text-center shadow-2xl"
          >
            <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-8">
              <AlertTriangle className="text-gold" size={32} />
            </div>
            
            <span className="text-gold text-[10px] tracking-[0.4em] uppercase mb-4 block font-medium">System Interruption</span>
            <h1 className="text-3xl font-serif text-text-main mb-6">Technical Refinement in Progress</h1>
            
            <p className="text-text-muted text-sm font-light leading-relaxed mb-10">
              We've encountered a minor structural anomaly. Our engineering team has been notified. 
              Please return to the dashboard to resume your session.
            </p>

            <Button 
              onClick={this.handleReset}
              className="w-full flex items-center justify-center space-x-3"
            >
              <RefreshCw size={16} />
              <span>Return to Dashboard</span>
            </Button>
            
            <div className="mt-12 pt-8 border-t border-white/5">
              <p className="text-[8px] text-white/20 uppercase tracking-widest leading-loose">
                Error Code: {this.state.error?.name || 'GENERIC_FAULT'}<br/>
                Elite Engineering Systems v2.0
              </p>
            </div>
          </motion.div>
        </div>
      );
    }

    return this.props.children;
  }
}
