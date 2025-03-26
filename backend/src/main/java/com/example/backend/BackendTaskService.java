

package com.example.backend;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import com.example.backend.interfaces.Task;

import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Map;


@Service
public class BackendTaskService {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public BackendTaskService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }


    public List<Map<String, Object>> getTasks() {
        String selectSqlQuery = """
            SELECT * FROM Tasks;
        """;
        return jdbcTemplate.queryForList(selectSqlQuery);
    }

    public List<Map<String, Object>> getTasksForCustomerId(int id) {
        String selectSqlQuery = """
            SELECT * FROM Tasks
            WHERE customerId = ?;    
        """;
        return jdbcTemplate.queryForList(selectSqlQuery, id);
    }


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
    
        if (task.getId() != 0) {
            return jdbcTemplate.update(updateSqlQuery, task.getName(), task.getDescription(), task.getPlannedEndDate(), task.getStatus(), task.getId());
        }
    
        return jdbcTemplate.update(insertSqlQuery, task.getParentId(), task.getCustomerId(), task.getName(), task.getDescription(), task.getPlannedEndDate(), task.getStatus());
    }

    public int deleteTask(int id) {
        String deleteSqlQuery = """
            DELETE FROM Tasks
            WHERE id = ?;
        """;
        return jdbcTemplate.update(deleteSqlQuery, id);
    }


}
