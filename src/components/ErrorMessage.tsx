function ErrorMessage(props = { message: '' }) {
  return (
    <h1>Error message: {props.message}</h1>
  )
};

export default ErrorMessage;