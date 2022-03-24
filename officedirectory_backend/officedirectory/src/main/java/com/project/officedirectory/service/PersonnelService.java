package com.project.officedirectory.service;

import java.util.ArrayList;
import java.util.List;

import com.project.officedirectory.dto.GetAllPersonnelResponse;
import com.project.officedirectory.model.Department;
import com.project.officedirectory.model.Personnel;
import com.project.officedirectory.repository.DepartmentRepository;
import com.project.officedirectory.repository.LocationRepository;
import com.project.officedirectory.repository.PersonnelRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PersonnelService {

    @Autowired
    PersonnelRepository personnelRepository;

    @Autowired
    DepartmentRepository departmentRepository;

    @Autowired
    LocationRepository locationRepository;

    public List<GetAllPersonnelResponse> getAllPersonnel()
    {
        List<GetAllPersonnelResponse> listOfPersonnels =  new ArrayList();
        // listOfPersonnels =  personnelRepository.findAll();
        for(Personnel personnel: personnelRepository.findAll())
        {
            Department department = departmentRepository.findById(personnel.getDepartmentId()).get();
            listOfPersonnels.add(
                GetAllPersonnelResponse.builder()
                .id(personnel.getId())
                .firstName(personnel.getFirstName())
                .email(personnel.getEmail())
                .lastName(personnel.getLastName())
                .jobTitle(personnel.getJobTitle())
                .photo(personnel.getPhoto())
                .department(department.getName())
                .location(locationRepository.findById(department.getLocationId()).get().getName())
                .build()
                
            );
        }
        return listOfPersonnels;
    }

    public Personnel addPersonnel(Personnel personnel)
    {
        return personnelRepository.save(personnel);
    }

    public void deletePersonnel(String id)
    {
        personnelRepository.deleteById(id);
    }

    public List<String> getAllPersonnelId()
    {
        List<String> listOfIds = new ArrayList<>();
        for(Personnel personnel: personnelRepository.findAll())
            listOfIds.add(personnel.getId());
        
        return listOfIds;
    }

    public Personnel getPersonnelById(String id)
    {
        return personnelRepository.findById(id).get();
    }
    
}
