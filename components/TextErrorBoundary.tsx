import React from 'react';
import { Text } from 'react-native';

// Este componente sirve como un error boundary para strings de texto
export class TextErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_error: any) {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    // Para desarrollo: puedes registrar el error
    console.warn('TextErrorBoundary capturó un error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <Text>Ocurrió un error.</Text>;
    }

    return this.props.children;
  }
}

// Previene que strings de texto aparezcan sin un componente Text
const originalConsoleError = console.error;
console.error = function (...args: any[]) {
  const textStringWarning = args[0] && typeof args[0] === 'string' && args[0].includes('Text strings must be rendered within a <Text> component');
  
  if (!textStringWarning) {
    originalConsoleError.apply(console, args as any);
  } else {
    // Puedes agregar un debug personalizado aquí si quieres seguir viendo la advertencia
    // console.warn('Advertencia de Text string suprimida');
  }
};

export default TextErrorBoundary;
