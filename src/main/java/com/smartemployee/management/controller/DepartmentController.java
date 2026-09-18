package com.smartemployee.management.controller;


import com.smartemployee.management.entity.Department;
import com.smartemployee.management.service.DepartmentService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class DepartmentController {
    private final DepartmentService departmentService;

    public DepartmentController(DepartmentService departmentService) {
        this.departmentService = departmentService;
    }

    @GetMapping("/departments")
    public List<Department> getAllDepartments() {
        return departmentService.getAllDepartments();
    }

    @GetMapping("/departments/{id}")
    public Department getDepartmentById(@PathVariable Long id) {
        return departmentService.getDepartmentById(id);
    }


@PostMapping("/departments")
public Department createDepartment(@RequestBody Department department) {
    return departmentService.createDepartment(department);
}

@PutMapping("/departments/{id}")
public Department updateDepartment(@PathVariable Long id, @RequestBody Department department) {

    return departmentService.updateDepartment(id,department);
}

@DeleteMapping("/departments/{id}")
public void deleteDepartment(@PathVariable Long id) {
    departmentService.deleteDepartment(id);
}
}