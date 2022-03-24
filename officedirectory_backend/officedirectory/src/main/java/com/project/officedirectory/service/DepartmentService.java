package com.project.officedirectory.service;

import java.util.List;

import com.project.officedirectory.model.Department;
import com.project.officedirectory.repository.DepartmentRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DepartmentService {
    
    @Autowired
    DepartmentRepository departmentRepository;

    public List<Department> getAllDeparments()
    {
        return departmentRepository.findAll();
    }
}
