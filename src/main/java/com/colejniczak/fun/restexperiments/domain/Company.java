package com.colejniczak.fun.restexperiments.domain;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import org.springframework.data.rest.core.config.Projection;

import lombok.Data;
import lombok.ToString;

@Data
@ToString(exclude = "employees")
@Entity
public class Company {

	@Projection(name = "test", types = { Company.class })
	public interface TestProjection {
		List<Employee> getEmployees();
	}
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name = "company_id", nullable = false)
	private Integer id;
	
	@Column(name = "name")
	private String name;
	
	@Column(name = "category")
	private String category;
	
	//@JsonManagedReference()
	@OneToMany(mappedBy = "company", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Employee> employees;

	/*public void setEmployees(List<Employee> employees) {
		if (this.employees != null) {
			this.employees.clear();
			if (employees != null) {
				this.employees.addAll(employees);
			}
		}
		else {
			this.employees = employees;
		}
	}*/
	
	/*@PrePersist
	@PreUpdate
	private void backReference() {
		if (this.employees != null) {
			this.employees.stream().forEach(e -> e.setCompany(this));
		}
	}*/
	
}
