import http from "../http-common";

class EmployeeDataService {
  getAll() {
    return http.get("/employee");
  }

  get(id) {
    return http.get(`/employee/${id}`);
  }

  create(data) {
    return http.post("/employee", data);
  }

  update(id, data) {
    console.log(data);
    return http.put(`/employee/${id}`, data);
  }

  delete(id) {
    return http.delete(`/employee/${id}`);
  }  

//   findByTitle(title) {
//     return http.get(`/tutorials?title=${title}`);
//   }
}

export default new EmployeeDataService();