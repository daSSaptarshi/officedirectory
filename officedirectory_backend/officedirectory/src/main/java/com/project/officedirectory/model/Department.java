package com.project.officedirectory.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table(name = "department")
@Data
public class Department {

    @Id
    private int id;
    private String name;
    private int locationId;
    
}
