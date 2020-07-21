
/**
 * Author: Nancy Chauhan
 * 
 * This is fake employee service.
 * Used to test the client without back end.
 * Simulating the real DB data and all the APIs required.
 * 
 */
const employee = [
  {
    _id: "5b21ca3eeb7f6fbccd471815",
    firstname:"Nancy",
    lastname:"Chauhan",
    department:"IT",
    address:"Delhi 99",
    phone:1234567891,
    rating: 1
  },
  {
    _id: "5b21ca3eeb7f6fbccd471816",
    firstname:"Nancy",
    lastname:"Chauhan",
    department:"IT",
    address:"Delhi 99",
    phone:1234567891,
    rating: 2
  },
  {
    _id: "5b21ca3eeb7f6fbccd471817",
    firstname:"Nancy",
    lastname:"Chauhan",
    department:"IT",
    address:"Delhi 99",
    phone:1234567891,
    rating: 3
  },
  {
    _id: "5b21ca3eeb7f6fbccd471819",
    firstname:"Nancy",
    lastname:"Chauhan",
    department:"IT",
    address:"Delhi 99",
    phone:1234567891,
    rating: 1
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181a",
    firstname:"Nancy",
    lastname:"Chauhan",
    department:"IT",
    address:"Delhi 99",
    phone:1234567891,
    rating: 2
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181b",
    firstname:"Nancy",
    lastname:"Chauhan",
    department:"IT",
    address:"Delhi 99",
    phone:1234567891,
    rating: 3
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181e",
    firstname:"Shirish",
    lastname:"Chauhan",
    department:"IT",
    address:"Delhi 99",
    phone:1234567891,
    rating: 1
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181f",
    firstname:"Sh",
    lastname:"Gupta",
    department:"IT",
    address:"Delhi 99",
    phone:1234567891,
    rating: 2
  },
  {
    _id: "5b21ca3eeb7f6fbccd471821",
    firstname:"Nancy",
    lastname:"Chauhan",
    department:"IT",
    address:"Delhi 99",
    phone:1234567891,
    rating: 2
  }
];

export function getEmployee() {
  return employee;
}

export function getEmployeeById(id) {
  return employee.find(m => m._id === id);
}

export function saveEmployee(emp) {
  let employeeInDb = employee.find(m => m._id === emp._id) || {};
  employeeInDb.firstname = emp.firstname;
  employeeInDb.lastname = emp.lastname;
  employeeInDb.department = emp.department;
  employeeInDb.address = emp.address;
  employeeInDb.phone = emp.phone;
  employeeInDb.rating = emp.rating;
  
  if (!employeeInDb._id) {
    employeeInDb._id = Date.now().toString();
    employee.push(employeeInDb);
  }

  return employeeInDb;
}

export function deleteEmployee(id) {
  let employeeInDb = employee.find(m => m._id === id);
  employee.splice(employee.indexOf(employeeInDb), 1);
  return employeeInDb;
}
