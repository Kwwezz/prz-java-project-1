

package com.example.backend;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import com.example.backend.interfaces.Customer;

import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Map;



@Service
public class BackendCustomerService {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public BackendCustomerService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
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
    
        if (customer.getId() != 0) {
            return jdbcTemplate.update(updateSqlQuery, customer.getName(), customer.getEmail(), customer.getId());
        }
    
        return jdbcTemplate.update(insertSqlQuery, customer.getName(), customer.getEmail());
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
