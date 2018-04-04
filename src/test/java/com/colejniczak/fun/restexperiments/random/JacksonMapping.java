package com.colejniczak.fun.restexperiments.random;

import java.io.IOException;
import java.util.Arrays;

import org.junit.Test;

import com.colejniczak.fun.restexperiments.domain.Company;
import com.colejniczak.fun.restexperiments.domain.Employee;
import com.colejniczak.fun.restexperiments.domain.Phone;
import com.fasterxml.jackson.databind.ObjectMapper;

public class JacksonMapping {

	@Test
	public void recursiveSerializing() throws IOException {
		final Company company = new Company();
		company.setName("TEST1");
		final Employee employee1 = new Employee();
		//employee1.setId(1);
		employee1.setFirstName("Emp 1");
		employee1.setLastName("Emp 1");
		final Employee employee2 = new Employee();
		//employee1.setId(2);
		employee2.setFirstName("Emp 2");
		employee2.setLastName("Emp 2");
		employee1.setCompany(company);
		employee2.setCompany(company);
		final Phone phone1 = new Phone();
		phone1.setNumber("1");
		final Phone phone2 = new Phone();
		phone2.setNumber("2");
		
		employee1.setPhoneNumbers(Arrays.asList(phone1));
		employee2.setPhoneNumbers(Arrays.asList(phone2));
		
		company.setEmployees(Arrays.asList(employee1, employee2));
		
		String result = new ObjectMapper().writeValueAsString(company);
		System.out.println(result);
		Company deserializedCompany = new ObjectMapper().readValue(result, Company.class);
		System.out.println(deserializedCompany.getName());
		
		/*String customString = "{\"id\":null,\"name\":\"TEST1\",\"category\":null,\"employees\":[{\"@id\":\"c1677d11-8595-4d8b-a46b-c4590d96955a\",\"id\":null,\"firstName\":\"Emp 1\",\"lastName\":\"Emp 1\",\"phoneNumbers\":[{\"number\":\"1\"},{\"number\":\"2\"}]},{\"@id\":\"0b85dda6-929a-44c9-b20e-f1d5e7f4e9c3\",\"id\":null,\"firstName\":\"Emp 2\",\"lastName\":\"Emp 2\",\"phoneNumbers\":[{\"number\":\"1\"},{\"number\":\"2\"}]}]}";
		Company deserializedCompany2 = new ObjectMapper().readValue(customString, Company.class);
		System.out.println("2: " + deserializedCompany2.getName());*/
	}
	
}
