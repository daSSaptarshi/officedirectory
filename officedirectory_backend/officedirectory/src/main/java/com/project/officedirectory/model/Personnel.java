package com.project.officedirectory.model;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table(name = "personnel")
@Data
public class Personnel {

    @Id
    private String id;
    private String firstName;
    private String lastName;
    private String jobTitle;
    private String email;
    private int departmentId;
    private String photo;
    private float jobExp;
    private int salary;
    private LocalDate dateOfJoining;
    private String manageBy;
    private String jobStatus;
    private String records;


    public Personnel()
    {
        this.id = UUID.randomUUID().toString().replace("-", "");
    }


    
}
