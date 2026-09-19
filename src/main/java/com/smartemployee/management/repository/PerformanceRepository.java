package com.smartemployee.management.repository;

import com.smartemployee.management.entity.Performance;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PerformanceRepository extends JpaRepository<Performance, Long> {

    List<Performance> findByEmployeeIdOrderByReviewDateAsc(Long employeeId);
}
