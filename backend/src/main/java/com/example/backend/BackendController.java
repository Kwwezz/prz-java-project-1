package com.example.backend;


import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;


@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class BackendController {



	// TaskGroup
	// id customerId name createdAt, updatedAt
	//

	// Task
	// id parentId taskGroupId name description plannedEndDate status: (New, In Progress, Completed Cancelled)
	//

	// Operation ...

	private final BackendDatabaseService backendDatabaseService;

	public BackendController(BackendDatabaseService backendDatabaseService) {
		this.backendDatabaseService = backendDatabaseService;
	}

	@GetMapping("/")
	public List<String> index() {
		return backendDatabaseService.getTasksNames();
	}

	@GetMapping("/all")
	public List<Map<String, Object>> allTasks() {
		return backendDatabaseService.getAllTasks();
	}

}
