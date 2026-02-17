function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
      <p>Щось пішло не так:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Спробувати знову</button>
    </div>
  );
}
export default ErrorFallback;