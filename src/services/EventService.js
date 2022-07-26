import axios from "axios";

const apiClient = axios.create({
  baseURL: `http://localhost:9112/api`,
  withCredentials: false, // This is the default
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  },
  timeout: 10000
});

export default {
  //   getEvents(perPage, page) {
  //     return apiClient.get("/events?_limit=" + perPage + "&_page=" + page);
  //   },
  getMaterial(id) {
    return apiClient.get("/material/" + id);
  },
  getMaterialByCat(id) {
    return apiClient.get("/materials/cat/" + id);
  },
  getMaterialByCar(id) {
    return apiClient.get("/materials/car/" + id);
  },
  getMaterialByFac(id) {
    return apiClient.get("/materials/fac/" + id);
  },
  getUser(id) {
    return apiClient.get("/users/cod/" + id);
  }
  //   postEvent(event) {
  //     return apiClient.post("/events", event);
  //   }
};
