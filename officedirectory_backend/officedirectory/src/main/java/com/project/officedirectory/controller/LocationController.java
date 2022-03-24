package com.project.officedirectory.controller;

import java.util.List;

import com.project.officedirectory.model.Location;
import com.project.officedirectory.service.LocationService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
@RequestMapping("/")
@CrossOrigin
public class LocationController {

    @Autowired
    LocationService locationService;

    @GetMapping(value="/getAllLocation")
    public List<Location> getAllLocations() {
        return locationService.getAllLocation();
    }
    
    
}
