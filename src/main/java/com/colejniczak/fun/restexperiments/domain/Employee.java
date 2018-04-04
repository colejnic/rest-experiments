package com.colejniczak.fun.restexperiments.domain;

import java.util.List;

import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.UniqueConstraint;

import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.Data;
import lombok.ToString;

@Data
@ToString(exclude = "phoneNumbers")
//@JsonIdentityInfo(generator = ObjectIdGenerators.UUIDGenerator.class)
//@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
@Entity
public class Employee {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "employee_id", nullable = true, unique = true)
	private Integer id;
	
	@Column(name = "first_name")
	private String firstName;
	
	@Column(name = "last_name")
	private String lastName;
	
	@JsonBackReference
	@ManyToOne(optional = true)
	@JoinColumn(name = "company_id")
	private Company company;
	
	@ElementCollection
	@CollectionTable(name = "phone",
			joinColumns = @JoinColumn(name = "employee_id"), uniqueConstraints = @UniqueConstraint(columnNames = {"employee_id", "number"}))
	private List<Phone> phoneNumbers;

	/*@PrePersist
	@PreUpdate
	@JsonIgnore
	private void backReference() {
		this.phoneNumbers.forEach(p -> p.addEmployee(this));
	}*/
	
}
