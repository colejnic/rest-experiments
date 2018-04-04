package com.colejniczak.fun.restexperiments;

import java.util.Arrays;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.client.AutoConfigureMockRestServiceServer;
import org.springframework.boot.test.autoconfigure.web.client.RestClientTest;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.web.client.RestTemplate;

import com.colejniczak.fun.restexperiments.domain.Company;
import com.colejniczak.fun.restexperiments.domain.Employee;

@RunWith(SpringRunner.class)
//@SpringBootTest
@ContextConfiguration(classes = RestConfiguration.class)
@RestClientTest
@AutoConfigureMockRestServiceServer(enabled = false)
public class RestExperimentsApplicationTests {

	@Autowired
	RestTemplate restTemplate;
	
	@Test
	public void contextLoads() {
	}

	@Test
	public void createCompany() {
		Company company = new Company();
		company.setName("Home Depot3");
		
		final Employee employee1 = new Employee();
		employee1.setFirstName("Emp 1");
		employee1.setLastName("Emp 1");
		final Employee employee2 = new Employee();
		employee2.setFirstName("Emp 2");
		employee2.setLastName("Emp 2");
		/*final PhoneNumber phone1 = new PhoneNumber();
		phone1.setNumber("1");
		final PhoneNumber phone2 = new PhoneNumber();
		phone2.setNumber("2");
		
		employee1.setPhoneNumbers(Arrays.asList(phone1, phone2));
		employee2.setPhoneNumbers(Arrays.asList(phone1, phone2));
		
		phone1.setEmployees(Arrays.asList(employee1));
		*/
		company.setEmployees(Arrays.asList(employee1, employee2));
		
		ResponseEntity<Company> response = restTemplate.postForEntity("/companies", company, null, Company.class);
		System.out.println(response.getStatusCode().toString());
	}
	
}
