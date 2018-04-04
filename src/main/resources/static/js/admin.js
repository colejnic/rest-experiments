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
		saveCompany( $frequent.$companySelect.children(":selected").attr("id"), getFormData($(this).serializeArray()) , processCompanySave);
		event.preventDefault();
	});

	loadAllCompanies(processCompaniesLoad);
	prepareCompanySection();
});

function prepareCompanySection() {
	var value = $frequent.$companySelect.val();
	if (value > 0) {
		enableCompanyForm();
		loadCompany($frequent.$companySelect.children(":selected").attr("id"), processCompanyLoad);
	}
	else if (value < 0) {
		disableCompanyForm();
		clearCompanyForm();
		return;
	}
	else {
		clearCompanyForm();
		disableCompanyForm();
	}
}

function clearCompanyForm() {
	$("#companyName").val("");
	$("#companyCategory").val("");
	clearEmployeeList();
}

function disableCompanyForm() {
	$("#saveCompanyButton").hide();
	$("#companyName").prop("disabled", true);
	$("#companyCategory").prop("disabled", true);
}

function enableCompanyForm() {
	$("#saveCompanyButton").show();
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

function processCompanySave(company) {
	$("#companyForm input[type='text']").stop(true, true);
	$("#companyForm input[type='text']").effect("highlight", {color: "#44ed71"}, 1000);
	$frequent.$companySelect.find("option[id='"+company._links.self.href+"']").prop('selected', true);
	$frequent.$companySelect.find("option[id='"+company._links.self.href+"']").text(company.name);
}

function populateCompanyInformation(company) {
	$("#companyName").val(company.name);
	$("#companyCategory").val(company.category);
}

function processEmployeesLoad(data) {
	populateEmployeeList(data._embedded.employees);
}

function processEmployeeSave(employee) {
	var $listItem = $("[id='"+employee._links.self.href+"']");
	//$listItem.find("input[type='text']").css({backgroundColor: "#ffffff"});
	//$listItem.find("input[type='text']").toggle("highlight", "#44ed71");
	//$listItem.find("input[type='text']").clearQueue().finish();
	$listItem.find("input[type='text']").stop(true, true);
	$listItem.find("input[type='text']").css({backgroundColor: "#ffffff"});
	//$listItem.find("input[type='text']").animate({backgroundColor: "#ffffff"}, 'slow');
	$listItem.find("input[type='text']").effect("highlight", {color: "#44ed71"}, 1000);
}

function processEmployeeFailure(employeeId) {
	var $listItem = $("[id='"+employeeId+"']");
	$listItem.find("input[type='text']").stop(true, true);
	$listItem.find("input[type='text']").animate({backgroundColor: "#ff0000"}, 'slow');
	//$listItem.find("input[type='text']").css("background-color", "#ff0000");
	//$listItem.find("input[type='text']").effect("highlight", {color: "#ff0000"}, 1000);
}

function processEmployeePendingSave(employeeId) {
	var $listItem = $("[id='"+employeeId+"']");
	$listItem.find("input[type='text']").stop(true, true);
	$listItem.find("input[type='text']").animate({backgroundColor: "#ffff00"}, 'slow');
}

function handleEmployeeInformationForCompany(company) {
	clearEmployeeList();
	loadEmployeesForCompany(company._links.employees.href, processEmployeesLoad);
}

function clearEmployeeList() {
	$frequent.$employeeList.empty();
}

function populateEmployeeList(employees) {
	$.each(employees, function(i, employee) {
		addEmployeeToList(employee);
	});
}

function addEmployeeToList(employee) {
	var $listItem = $("<li></li>").attr("id", employee._links.self.href);
	var $employeeForm = $("<form></form>")
	var $firstnameInput = $("<input name='firstName' type='text'></input>").val(employee.firstName);
	var $lastnameInput = $("<input name='lastName' type='text'></input>").val(employee.lastName);
	var $saveEmployeeButton = $("<input type='submit' value='Save Employee Data' />");
	$employeeForm
		.append($firstnameInput)
		.append($lastnameInput)
		.append($saveEmployeeButton)
		.submit(function(event) {
			//saveEmployee($(this).closest("li").find("input[name='employeeId']").val(), getFormData($(this).serializeArray()), processEmployeeCreation);
			processEmployeePendingSave($(this).closest("li").attr("id"));
			saveEmployee($(this).closest("li").attr("id"), getFormData($(this).serializeArray()), processEmployeeSave, processEmployeeFailure);
			event.preventDefault();
		});
	$listItem.append($employeeForm);
	$frequent.$employeeList.append($listItem);
}

function getFormData(data) {
   var unindexed_array = data;
   var indexed_array = {};

   $.map(unindexed_array, function(n, i) {
    indexed_array[n['name']] = n['value'];
   });

   return indexed_array;
}

