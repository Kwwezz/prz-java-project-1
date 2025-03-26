package com.example.backend;


import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.interfaces.Customer;
import com.example.backend.interfaces.Task;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class BackendController {


	private final BackendCustomerService backendCustomerService;
	private final BackendTaskService backendTaskService;

	public BackendController(
		BackendCustomerService backendCustomerService,
		BackendTaskService backendTaskService
	) {
		this.backendCustomerService = backendCustomerService;
		this.backendTaskService = backendTaskService;
	}

	@GetMapping("/")
	public Map<String, String> index() {
		Map<String, String> response = new HashMap<String, String>();
		response.put("message", "Hello, world!");
		return response;
	}

	@GetMapping("/tasks")
	public List<Map<String, Object>> getTasks() {
		return backendTaskService.getTasks();
	}

	@GetMapping("/tasks/{customerId}")
	public List<Map<String, Object>> getTasksForCustomerId(@PathVariable("customerId") int customerId) {
		return backendTaskService.getTasksForCustomerId(customerId);
	}


	@PostMapping("/task")
	public Map<String, String> saveTask(@RequestBody Task task) {
		Map<String, String> response = new HashMap<String, String>();
		backendTaskService.saveTask(task);
		response.put("message", "ok");
		return response;
	}

	@DeleteMapping("/task/{id}")
	public Map<String, String> deleteTask(@PathVariable("id") int id) {
		Map<String, String> response = new HashMap<String, String>();
		backendTaskService.deleteTask(id);
		response.put("message", "ok");
		return response;
	}


	@GetMapping("/customers")
	public List<Map<String, Object>> getCustomers() {
		return backendCustomerService.getCustomers();
	}

	@PostMapping("/customer")
	public Map<String, String> saveCustomer(@RequestBody Customer customer) {
		Map<String, String> response = new HashMap<String, String>();
		backendCustomerService.saveCustomer(customer);
		response.put("message", "ok");
		return response;
	}

	@DeleteMapping("/customer/{id}")
	public Map<String, String> deleteCustomer(@PathVariable("id") int id) {
		Map<String, String> response = new HashMap<String, String>();
		backendCustomerService.deleteCustomer(id);
		response.put("message", "ok");
		return response;
	}

}
