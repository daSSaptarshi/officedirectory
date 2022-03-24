package com.project.officedirectory.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table(name = "location")
@Data
public class Location {

    @Id
    private int id;
    private String name;    
}
