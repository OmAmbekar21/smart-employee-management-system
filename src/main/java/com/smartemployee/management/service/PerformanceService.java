package com.smartemployee.management.service;

import com.smartemployee.management.entity.Performance;
import com.smartemployee.management.repository.PerformanceRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PerformanceService {
    private final PerformanceRepository performanceRepository;

    public PerformanceService(PerformanceRepository performanceRepository) {
        this.performanceRepository = performanceRepository;
    }

    public List<Performance> getAllPerformances() {
        return performanceRepository.findAll();
    }

    public Performance getPerformanceById(Long id) {
        return performanceRepository.findById(id).orElse(null);
    }

    public Performance createPerformance(Performance performance) {
        return performanceRepository.save(performance);
    }

    public void deletePerformance(Long id) {
        performanceRepository.deleteById(id);
    }
}
