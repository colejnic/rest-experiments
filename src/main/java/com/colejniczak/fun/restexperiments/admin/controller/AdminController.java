package com.colejniczak.fun.restexperiments.admin.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;

@Controller
@SessionAttributes(names = "test")
@RequestMapping(value = "/admin")
public class AdminController {

	@GetMapping
	public String adminHome(Model model) {
		if (model.asMap().get("test") == null) {
			System.out.println("Setting test attribute");
			model.addAttribute("test", "I was set in adminHome");
		} else {
			System.out.println("Test value: " + model.asMap().get("test"));
		}
		
		
		return "admin";
	}
	
	@GetMapping(value = "/2")
	public String adminHome2(@SessionAttribute(name = "test") String test) {
		if (test == null) {
			System.out.println("test is null, adding value");
			test = "I was set in adminHome2";
		}
		else {
			System.out.println("Test value: " + test);
		}
		return "admin";
	}
	
	@GetMapping(value = "/3")
	public String adminHome(@ModelAttribute("test") String test) {
		if (test == null) {
			System.out.println("test is null, adding value");
			test = "I was set in adminHome3";
		}
		else {
			System.out.println("Test value: " + test);
		}
		return "admin";
	}
	
}
