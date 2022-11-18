const handleParam = (e, setSearchParams, param) => {
  const paramValue = e.target.value;
  const params = { param: paramValue };
  setSearchParams(params);
};

export default handleParam;
