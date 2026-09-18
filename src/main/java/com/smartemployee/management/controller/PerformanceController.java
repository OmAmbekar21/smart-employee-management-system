package com.smartemployee.management.controller;

import com.smartemployee.management.entity.Performance;
import com.smartemployee.management.service.PerformanceService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class PerformanceController {
    private final PerformanceService performanceService;

    public PerformanceController(PerformanceService performanceService) {
        this.performanceService = performanceService;
    }


    @GetMapping("/performances")
    public List<Performance> getAllPerformances(){
        return performanceService.getAllPerformances();
    }

    @GetMapping("/performances/{id}")
    public Performance getPerformanceById(@PathVariable Long id) {
        return performanceService.getPerformanceById(id);
    }

    @PostMapping("/performances")
    public Performance createPerformance(@RequestBody Performance performance) {
        return performanceService.createPerformance(performance);
    }

    @DeleteMapping("/performances/{id}")
    public void deletePerformance(@PathVariable Long id) {
        performanceService.deletePerformance(id);
    }
}
