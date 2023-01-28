const apiRequest = async (URL = "", objectOpt = null, errMsg = null) => {
  try {
    const response = await fetch(URL, objectOpt);
    if (!response.ok) throw Error("404.Not Found.");
  } catch (err) {
    errMsg = err.message;
  } finally {
    return errMsg;
  }
};

export default apiRequest;
