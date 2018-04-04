package com.colejniczak.fun.restexperiments.domain;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import lombok.Data;

@Data
@Embeddable
public class Phone {

	@Column(name = "number", unique = true, nullable = false)
	private String number;
	
}
