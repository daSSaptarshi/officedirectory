package com.project.officedirectory.repository;

import java.util.List;

import com.project.officedirectory.model.Personnel;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface PersonnelRepository extends JpaRepository<Personnel, String>
{
    @Query(value = "SELECT p.`id` id, p.`first_name` firstName, p.`last_name` lastName, p.`photo` photo, p.`job_title` jobTitle, p.`email` email, d.`name` department, l.`name` location FROM `personnel` p INNER JOIN `department` d ON p.`department_id` = d.`id` INNER JOIN `location` l ON l.`id` = d.`locationID`", nativeQuery = true)
    public List<Personnel> getAllPersonnel();
}
