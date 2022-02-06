import api from "./instance";

export const createPostRequest = async (
  link,
  form,
  setUpdate = () => {},
  setFetch = () => {},
  dispatch = () => {},
  cb = () => {}
) => {
  setFetch(true);
  try {
    const { data } = await api.post(link, form);
    if (data === "OK") {
      dispatch(data);
      setUpdate(Date.now());
    } else if (data.type === "error") dispatch(data);
    cb(null, data);
  } catch (err) {
    dispatch(err);
    cb(err);
  }
  setFetch(false);
};

export const createPutRequest = async (
  link,
  form,
  setUpdate = () => {},
  setFetch = () => {},
  dispatch = () => {},
  cb = () =>{}
) => {
  setFetch(true);
  try {
    const { data } = await api.put(link, form);
    if (data === "OK") {
      dispatch(data);
      setUpdate(Date.now());
    } else if (data.type === "error") dispatch(data);
    cb(null, data);
  } catch (err) {
    dispatch(err);
    cb(err);
  }
  setFetch(false);
};

export const createGetRequest = async (
  link,
  setData = () => {},
  setFetch = () => {},
  dispatch = () => {}
) => {
  setFetch(true);
  try {
    const { data } = await api.get(link);
    if (data.type !== "error") {
      setData(data);
    }
  } catch (err) {
    dispatch(err);
  }
  setFetch(false);
};

export const createDeleteRequest = async (
  link,
  setData = () => {},
  setFetch = () => {},
  dispatch = () => {}
) => {
  setFetch(true);
  try {
    const { data } = await api.delete(link);
    if (data.type !== "error") {
      setData(data);
    }
  } catch (err) {
    dispatch(err);
  }
  setFetch(false);
};
