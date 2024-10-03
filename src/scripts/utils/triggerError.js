function triggerError(message) {
  try {
    throw new Error(message);
  } catch (error) {
    const event = new CustomEvent('error-occurred', {
      detail: { message: error.message },
      bubbles: true,
      composed: true,
    });
    window.dispatchEvent(event);
  }
}

export default triggerError;
