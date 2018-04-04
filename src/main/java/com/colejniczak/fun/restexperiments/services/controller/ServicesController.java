package com.colejniczak.fun.restexperiments.services.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.colejniczak.fun.restexperiments.repositories.CompanyRepository;

@Controller
@RequestMapping(value = "/services")
public class ServicesController {

	private static final String SUCCESSFULLY_DELETED_ALL_COMPANIES = "successfully deleted all companies";
	private static final String SERVICES = "services";
	private final CompanyRepository companyRepository;
	
	public ServicesController(final CompanyRepository companyRepository) {
		this.companyRepository = companyRepository;
	}
	
	@GetMapping
	public String servicesHome() {
		return SERVICES;
	}
	
	@GetMapping(value = "/deletecompanies")
	@ResponseBody
	public String deleteAllCompanies() {
		companyRepository.deleteAll();
		return SUCCESSFULLY_DELETED_ALL_COMPANIES;
	}
	
}
