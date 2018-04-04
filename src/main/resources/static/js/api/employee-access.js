function loadEmployeesForCompany(companyEmployeesId, onSuccess, onError) {
	$
	.ajax({
		type : 'GET',
		url : companyEmployeesId+"?nocache="+new Date().getTime(),
		dataType : 'json',
		success : function(data, status, jqXHR) {
			if (onSuccess) {
				onSuccess(data, status, jqXHR);
			}
		},
		error : function(data, status, error) {
			if (onError) {
				onError(data, status, error);
			}
			else {				
				if (data.status == 404) {
					alert("Employees not found.");
				}
				else {
					console.log("ERROR WITH AJAX CALL");
				}
			}
		}
	});
}

function createNewEmployeeForCompany(employee, companyId, onSuccess, onError) {
	employee["company"] = companyId;
	$
	.ajax({
		type : 'POST',
		url : employeesBaseUri,
		data : JSON.stringify(employee),
		contentType : 'application/json',
		dataType : 'json',
		cache : false,
		success : function(employee, status, jqXHR) {
			onSuccess(employee, status, jqXHR);
		},
		error : function(data, status, error) {
			if (onError) {
				onError(data, status, error);
			}
			else {				
				if (data.status == 404) {
					alert("Employee not found.");
				}
				else {
					console.log("ERROR WITH AJAX CALL");
				}
			}
		}
	});
}

function saveEmployee(employeeId, employee, onSuccess, onError) {
	$
	.ajax({
		type : 'PATCH',
		url : employeeId,
		data : JSON.stringify(employee),
		contentType : 'application/json',
		dataType : 'json',
		cache : false,
		success : function(employee, status, jqXHR) {
			onSuccess(employee, status, jqXHR);
		},
		error : function(data, status, error) {
			if (onError) {
				onError(employeeId, data, status, error);
			}
			else {				
				if (data.status == 404) {
					alert("Employee not found.");
				}
				else {
					console.log("ERROR WITH AJAX CALL");
				}
			}
		}
	});
}