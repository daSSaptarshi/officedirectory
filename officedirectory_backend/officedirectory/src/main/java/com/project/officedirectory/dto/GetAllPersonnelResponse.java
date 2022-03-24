package com.project.officedirectory.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class GetAllPersonnelResponse {

    private String id;
    private String firstName;
    private String lastName;
    private String photo;
    private String jobTitle;
    private String email;
    private String department;
    private String location;
    
}
