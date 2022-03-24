package com.project.officedirectory.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import com.project.officedirectory.dto.GetAllPersonnelResponse;
import com.project.officedirectory.model.Personnel;
import com.project.officedirectory.service.PersonnelService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/")
@CrossOrigin
public class PersonnelConatroller {

    @Autowired
    PersonnelService personnelService;

    @PostMapping(value="/addPersonnel")
    public Personnel addPersonnel(@RequestBody Personnel entity) {
        personnelService.addPersonnel(entity);
        return entity;
    }

    @GetMapping(value = "/getAllPersonnel")
    public List<GetAllPersonnelResponse> getAllPersonnel()
    {
        return personnelService.getAllPersonnel();
    }

    @DeleteMapping("/deletePersonel/{id}")
    public void deletePersonnel(@PathVariable String id)
    {
        personnelService.deletePersonnel(id);
    }

    @GetMapping(value = "/getAllPersonnelId")
    public List<String> getAllPersonelId()
    {
        return personnelService.getAllPersonnelId();
    }

    @GetMapping(value = "/getPersonnel/{id}")
    public Personnel getPersonneById(@PathVariable String id)
    {
        return personnelService.getPersonnelById(id);
    }
    
    
}
