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

    public List<Performance> getEmployeePerformanceHistory(Long employeeId) {
        return performanceRepository.findByEmployeeIdOrderByReviewDateAsc(employeeId);
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

    public String getPerformanceTrend(Long employeeId) {

        List<Performance> history =
                performanceRepository.findByEmployeeIdOrderByReviewDateAsc(employeeId);

        if (history.size() < 2) {
            return "Not enough performance data to determine improvement.";
        }

        Performance previous = history.get(history.size() - 2);
        Performance latest = history.get(history.size() - 1);

        BigDecimal scoreChange =
                latest.getScore().subtract(previous.getScore());

        BigDecimal workloadChange =
                latest.getWorkload().subtract(previous.getWorkload());

        if (scoreChange.compareTo(BigDecimal.ZERO) > 0 &&
                workloadChange.compareTo(BigDecimal.ZERO) < 0) {

            return "Performance improved by " + scoreChange +
                    " points and workload decreased by " +
                    workloadChange.abs() + " points.";

        }
        else if (scoreChange.compareTo(BigDecimal.ZERO) > 0 &&
                workloadChange.compareTo(BigDecimal.ZERO) > 0) {

            return "Performance improved by " + scoreChange +
                    " points, but workload increased by " +
                    workloadChange + " points.";

        }
        else if (scoreChange.compareTo(BigDecimal.ZERO) < 0 &&
                workloadChange.compareTo(BigDecimal.ZERO) > 0) {

            return "Performance decreased by " + scoreChange.abs() +
                    " points while workload increased by " +
                    workloadChange + " points. This may require attention.";

        }
        else if (scoreChange.compareTo(BigDecimal.ZERO) < 0 &&
                workloadChange.compareTo(BigDecimal.ZERO) < 0) {

            return "Performance decreased by " + scoreChange.abs() +
                    " points while workload also decreased by " +
                    workloadChange.abs() + " points.";

        }
        else if (scoreChange.compareTo(BigDecimal.ZERO) == 0 &&
                workloadChange.compareTo(BigDecimal.ZERO) > 0) {

            return "Performance remained unchanged while workload increased by " +
                    workloadChange + " points.";

        }
        else if (scoreChange.compareTo(BigDecimal.ZERO) == 0 &&
                workloadChange.compareTo(BigDecimal.ZERO) < 0) {

            return "Performance remained unchanged while workload decreased by " +
                    workloadChange.abs() + " points.";

        }
        else {

            return "Performance and workload remained unchanged.";

        }
    }
}
