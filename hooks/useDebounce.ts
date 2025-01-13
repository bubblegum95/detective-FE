const useDebounce = (
  password: any,
  deley: number,
  handler: (password: any) => void
) => {
  const timeID = setTimeout(() => {
    handler(password);
  }, deley);

  return () => clearTimeout(timeID);
};

export default useDebounce;
