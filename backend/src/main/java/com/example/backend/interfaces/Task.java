package com.example.backend.interfaces;

public class Task {

	private int id;
	private Integer parentId;
	private int customerId;
	private String name;
	private String description;
	private String plannedEndDate;
	private String status;
	private String createdAt;
	private String updatedAt;

	public Task() {}

	public Task(int id, Integer parentId, int customerId, String name, String description, 
				String plannedEndDate, String status, String createdAt, String updatedAt) {
		this.id = id;
		this.parentId = parentId;
		this.customerId = customerId;
		this.name = name;
		this.description = description;
		this.plannedEndDate = plannedEndDate;
		this.status = status;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Integer getParentId() {
		return parentId;
	}

	public void setParentId(Integer parentId) {
		this.parentId = parentId;
	}

	public int getCustomerId() {
		return customerId;
	}

	public void setCustomerId(int customerId) {
		this.customerId = customerId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getPlannedEndDate() {
		return plannedEndDate;
	}

	public void setPlannedEndDate(String plannedEndDate) {
		this.plannedEndDate = plannedEndDate;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(String createdAt) {
		this.createdAt = createdAt;
	}

	public String getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(String updatedAt) {
		this.updatedAt = updatedAt;
	}
}
