package com.project.officedirectory.service;

import java.util.List;

import com.project.officedirectory.model.Location;
import com.project.officedirectory.repository.LocationRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LocationService {

    @Autowired
    LocationRepository locationRepository;

    public List<Location> getAllLocation()
    {
        return locationRepository.findAll();
    }
    
}
