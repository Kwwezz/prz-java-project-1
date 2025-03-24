package com.example.backend;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BackendController {



	// TaskGroup
	// id customerId name createdAt, updatedAt
	//

	// Task
	// id uuid parentId taskGroupId name plannedEndDate status: (New, In Progress, Completed Cancelled)
	//

	// Operation ...

	@GetMapping("/")
	public String index() {
		return "Greetings from Spring Boot!";
	}

}
