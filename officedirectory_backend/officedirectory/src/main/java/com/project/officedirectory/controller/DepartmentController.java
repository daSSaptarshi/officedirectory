package com.project.officedirectory.controller;

import java.util.List;

import com.project.officedirectory.model.Department;
import com.project.officedirectory.service.DepartmentService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
@CrossOrigin
public class DepartmentController {


    @Autowired
    DepartmentService departmentService;
    
    @GetMapping(value="/getAllDeparment")
    public List<Department> getAllDeparments() {
        return departmentService.getAllDeparments();
    }
    
}
