package com.example.backend;


import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


class Customer {
    public int id;
    public String name;
    public String email;
    public String createdAt;
	public String updatedAt;
}

class Task {
    public int id;
	public Integer parentId;
	public int customerId;
    public String name;
	public String description;
	public String plannedEndDate;
	public String status;
    public String createdAt;
	public String updatedAt;
}

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class BackendController {


	// Customer
	// id name createdAt, updatedAt


	// Tasks
	// id parentId customerId name description plannedEndDate status: (New, In Progress, Completed Cancelled) createdAt, updatedAt
	//


	private final BackendDatabaseService backendDatabaseService;

	public BackendController(BackendDatabaseService backendDatabaseService) {
		this.backendDatabaseService = backendDatabaseService;
	}

	@GetMapping("/")
	public Map<String, String> index() {
		Map<String, String> response = new HashMap<String, String>();
		response.put("message", "Hello, world!");
		return response;
	}

	@GetMapping("/tasks/{customerId}")
	public List<Map<String, Object>> getTasksForCustomerId(@PathVariable("customerId") int customerId) {
		return backendDatabaseService.getTasksForCustomerId(customerId);
	}

	@PostMapping("/task")
	public Map<String, String> saveTask(@RequestBody Task task) {
		Map<String, String> response = new HashMap<String, String>();

		backendDatabaseService.saveTask(task);
		response.put("message", "ok");
		return response;
	}

	@DeleteMapping("/task/{id}")
	public Map<String, String> deleteTask(@PathVariable("id") int id) {
		Map<String, String> response = new HashMap<String, String>();
		backendDatabaseService.deleteTask(id);
		response.put("message", "ok");
		return response;
	}


	@GetMapping("/customers")
	public List<Map<String, Object>> getCustomers() {
		return backendDatabaseService.getCustomers();
	}

	@PostMapping("/customer")
	public Map<String, String> saveCustomer(@RequestBody Customer customer) {
		Map<String, String> response = new HashMap<String, String>();
		backendDatabaseService.saveCustomer(customer);
		response.put("message", "ok");
		return response;
	}

	@DeleteMapping("/customer/{id}")
	public Map<String, String> deleteCustomer(@PathVariable("id") int id) {
		Map<String, String> response = new HashMap<String, String>();
		backendDatabaseService.deleteCustomer(id);
		response.put("message", "ok");
		return response;
	}

}
