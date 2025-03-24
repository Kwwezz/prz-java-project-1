package com.example.backend;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Map;



@Service
public class BackendDatabaseService {
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public BackendDatabaseService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<String> getTasksNames() {
        String sql = "SELECT name FROM Tasks";
        return jdbcTemplate.queryForList(sql, String.class);
    }

    public List<Map<String, Object>> getAllTasks() {
        String sql = "SELECT * FROM Tasks";
        return jdbcTemplate.queryForList(sql);
    }

}
