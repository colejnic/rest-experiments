package com.colejniczak.fun.restexperiments.repositories;

import org.springframework.data.querydsl.QueryDslPredicateExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.colejniczak.fun.restexperiments.domain.Company;

@RepositoryRestResource
public interface CompanyRepository extends PagingAndSortingRepository<Company, Integer>, QueryDslPredicateExecutor<Company> {

}
