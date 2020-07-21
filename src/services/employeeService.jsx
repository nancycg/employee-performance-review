/*
 * Author : Nancy Chauhan
 *
 * This is employee service which is exposing APIs for DB end point mapping and connection.
 * Using config.json for end point URL configuration. 
 */

import http from './httpService';
import { apiUrl } from "../config.json";

const apiEndpoint= apiUrl + "/emp"; 

function employeeUrl(id) {
    return `${apiEndpoint}/${id}`;
}

export function getEmployee(){
    return http.get(apiEndpoint);
};

export function getEmployeeById(empId){
    return http.get(employeeUrl(empId));
};

export function deleteEmployee(empId){
    
    return http.delete(employeeUrl(empId));
}

export function saveEmployee(emp){
      if (emp._id) {
        const body = {...emp};
        delete body._id;
        console.log("PUT : Update");
        return http.put(employeeUrl(emp._id), body);
      }
      console.log("POST : Create");
      return http.post(apiEndpoint, emp);

}
