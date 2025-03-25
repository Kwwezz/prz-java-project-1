package com.example.backend;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Map;

import com.example.backend.Customer;

@Service
public class BackendDatabaseService {
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public BackendDatabaseService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }


    public List<Map<String, Object>> getTasksForCustomerId(int id) {
        String selectSqlQuery = """
            SELECT * FROM Tasks
            WHERE customerId = ?;    
        """;
        return jdbcTemplate.queryForList(selectSqlQuery, id);
    }

    // class Task {
    //     public int id;
    //     public int parentId;
    //     public int customerId;
    //     public String name;
    //     public String description;
    //     public String plannedEndDate;
    //     public String status;
    //     public String createdAt;
    //     public String updatedAt;
    // }

    public int saveTask(Task task) {

        String insertSqlQuery = """
            INSERT INTO Tasks (parentId, customerId, name, description, plannedEndDate, status)
            VALUES (?, ?, ?, ?, ?, ?);            
        """;
        
        String updateSqlQuery = """
            UPDATE Tasks 
            SET name = ?, description = ?, plannedEndDate = ?, status = ?
            WHERE id = ?;           
        """;
    
        if (task.id != 0) {
            return jdbcTemplate.update(updateSqlQuery, task.name, task.description, task.plannedEndDate, task.status, task.id);
        }
    
        return jdbcTemplate.update(insertSqlQuery, task.parentId, task.customerId, task.name, task.description, task.plannedEndDate, task.status);
    }

    public int deleteTask(int id) {
        String deleteSqlQuery = """
            DELETE FROM Tasks
            WHERE id = ?;
        """;
        return jdbcTemplate.update(deleteSqlQuery, id);
    }


    public List<Map<String, Object>> getCustomers() {
        String selectSqlQuery = """
            SELECT * FROM Customers;        
        """;
        return jdbcTemplate.queryForList(selectSqlQuery);
    }

    public int saveCustomer(Customer customer) {
        String insertSqlQuery = """
            INSERT INTO Customers (name, email)
            VALUES (?, ?);            
        """;
        String updateSqlQuery = """
            UPDATE Customers 
            SET name = ?, email = ? 
            WHERE id = ?;           
        """;
    
        if (customer.id != 0) {
            return jdbcTemplate.update(updateSqlQuery, customer.name, customer.email, customer.id);
        }
    
        return jdbcTemplate.update(insertSqlQuery, customer.name, customer.email);
    }

    public int deleteCustomer(int id) {
        String deleteSqlQuery = """
            DELETE FROM Customers
            WHERE id = ?;
            DELETE FROM Tasks
            WHERE customerId = ?;
        """;
        return jdbcTemplate.update(deleteSqlQuery, id, id);
    }

}
