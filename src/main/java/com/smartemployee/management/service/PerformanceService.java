package com.smartemployee.management.service;

import com.smartemployee.management.entity.Performance;
import com.smartemployee.management.repository.PerformanceRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
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

    public String getImprovementSuggestion(Performance performance) {
        if (performance.getScore().compareTo(BigDecimal.valueOf(60)) < 0) {
            return "Performance needs significant improvement.";
        }
        else if (performance.getScore().compareTo(BigDecimal.valueOf(75)) < 0) {
            return  "Performance is below expectations. Focus on improvement areas.";
        }
        else if (performance.getScore().compareTo(BigDecimal.valueOf(85)) < 0) {
            return  "Performance is satisfactory. Continue improving.";
        }
        else {
            return "Excellent performance. Maintain the current progress.";
        }
    }
}
