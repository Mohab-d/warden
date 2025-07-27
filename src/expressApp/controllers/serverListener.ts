function serverListener(port: number, error?: Error): void {
  if (error) console.error(error);
  console.log(`Server is now listening on port ${port}`);
}
export default serverListener;
