import React from 'react';
import { render } from '@testing-library/react';
import ErrorBoundary from './ErrorBoundary';

function ProblemChild() {
  throw new Error('Errore di test');
}

test('ErrorBoundary mostra messaggio di errore', () => {
  const { getByText } = render(
    <ErrorBoundary>
      <ProblemChild />
    </ErrorBoundary>
  );
  expect(getByText(/Qualcosa è andato storto/i)).toBeInTheDocument();
});
