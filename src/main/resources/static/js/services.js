var companiesBaseUri;
var employeesBaseUri;

$(document).ready(function() {
	companiesBaseUri = document.getElementById('companiesBaseUri').value;
	employeesBaseUri = document.getElementById('employeesBaseUri').value;
	window.$frequent = {
		$companySelect : $("#companySelector"),
		$employeeList : $("#employeeList")
	};
	
	$frequent.$companySelect.change(function() {
		prepareCompanySection();
	});

	$("#companyForm").submit(function(event) {
		createCompany( getFormData($(this).serializeArray()) , processCompanyCreation);
		event.preventDefault();
	});
	
	$("#employeeForm").submit(function(event) {
		createNewEmployeeForCompany(getFormData($(this).serializeArray()), $frequent.$companySelect.children(":selected").attr("id"), processEmployeeCreation);
		event.preventDefault();
	});
	
	loadAllCompanies(processCompaniesLoad);
	prepareCompanySection();
});

function prepareCompanySection() {
	var value = $frequent.$companySelect.val();
	if (value > 0) {
		disableCompanyForm();
		loadCompany($frequent.$companySelect.children(":selected").attr("id"), processCompanyLoad);
	}
	else if (value < 0) {
		disableCompanyForm();
		clearCompanyForm();
		return;
	}
	else {
		clearCompanyForm();
		enableCompanyForm();
	}
}

function clearCompanyForm() {
	$("#companyName").val("");
	$("#companyCategory").val("");
	clearEmployeeList();
	disableEmployeeForm()
}

function disableCompanyForm() {
	$("#createCompanyButton").hide();
	$("#companyName").prop("disabled", true);
	$("#companyCategory").prop("disabled", true);
}

function enableCompanyForm() {
	$("#createCompanyButton").show();
	$("#companyName").prop("disabled", false);
	$("#companyCategory").prop("disabled", false);
}

function populateCompanyDropDown(companies) {
	$.each(companies, function(i, company) {
		addCompanyToDropDown(company);
	});
}

function addCompanyToDropDown(company) {
	$frequent.$companySelect.append($("<option></option>")
			.attr("id", company._links.self.href)
			.attr("value",1)
			.text(company.name));
}

function processCompanyLoad(company) {
	populateCompanyInformation(company);
	handleEmployeeInformationForCompany(company);
}

function processCompaniesLoad(data) {
	populateCompanyDropDown(data._embedded.companies);
}

function processCompanyCreation(company) {
	addCompanyToDropDown(company);
	populateCompanyInformation(company);
	$frequent.$companySelect.find("option[id='"+company._links.self.href+"']").prop('selected', true);
	prepareCompanySection();
}

function populateCompanyInformation(company) {
	$("#companyName").val(company.name);
	$("#companyCategory").val(company.category);
}

function processEmployeesLoad(data) {
	populateEmployeeList(data._embedded.employees);
}

function processEmployeeCreation(employee) {
	clearEmployeeForm();
	addEmployeeToList(employee);
}

function handleEmployeeInformationForCompany(company) {
	clearEmployeeList();
	loadEmployeesForCompany(company._links.employees.href, processEmployeesLoad);
	enableEmployeeForm();
}

function clearEmployeeList() {
	$frequent.$employeeList.empty();
	disableEmployeeForm();
}

function enableEmployeeForm() {
	$("#employeeFirstName").prop("disabled", false);
	$("#employeeLastName").prop("disabled", false);
	$("#createEmployeeButton").show();
}

function disableEmployeeForm() {
	$("#employeeFirstName").prop("disabled", true);
	$("#employeeLastName").prop("disabled", true);
	$("#createEmployeeButton").hide();
}

function clearEmployeeForm() {
	$("#employeeFirstName").val("");
	$("#employeeLastName").val("");
}

function populateEmployeeList(employees) {
	$.each(employees, function(i, employee) {
		addEmployeeToList(employee);
	});
}

function addEmployeeToList(employee) {
	$frequent.$employeeList.append($("<li></li>").text(employee.firstName + " " + employee.lastName));
}

function getFormData(data) {
   var unindexed_array = data;
   var indexed_array = {};

   $.map(unindexed_array, function(n, i) {
    indexed_array[n['name']] = n['value'];
   });

   return indexed_array;
}

