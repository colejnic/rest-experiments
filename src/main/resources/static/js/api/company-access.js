function loadCompany(companyId, onSuccess, onError) {
	$
	.ajax({
		type : 'GET',
		url : companyId,
		dataType : 'json',
		cache : false,
		success : function(company, status, jqXHR) {
			if (onSuccess) {
				onSuccess(company, status, jqXHR);
			}
		},
		error : function(data, status, error) {
			if (onError) {
				onError(data, status, error);
			}
			else {				
				if (data.status == 404) {
					alert("Company not found.");
				}
				else {
					console.log("ERROR WITH AJAX CALL");
				}
			}
		}
	});
}

function loadAllCompanies(onSuccess, onError) {
	$
	.ajax({
		type : 'GET',
		url : companiesBaseUri+"?nocache="+new Date().getTime(),
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
					alert("Companies not found.");
				}
				else {
					console.log("ERROR WITH AJAX CALL");
				}
			}
		}
	});
}

function createCompany(company, onSuccess, onError) {
	$
	.ajax({
		type : 'POST',
		url : companiesBaseUri,
		data : JSON.stringify(company),
		contentType : 'application/json',
		dataType : 'json',
		cache : false,
		success : function(company, status, jqXHR) {
			if (onSuccess) {
				onSuccess(company, status, jqXHR);
			}
		},
		error : function(data, status, error) {
			if (onError) {
				onError(data, status, error);
			}
			else {				
				if (data.status == 404) {
					alert("Company not found.");
				}
				else {
					console.log("ERROR WITH AJAX CALL");
				}
			}
		}
	});
}

function saveCompany(companyId, company, onSuccess, onError) {
	$
	.ajax({
		type : 'PATCH',
		url : companyId,
		data : JSON.stringify(company),
		contentType : 'application/json',
		dataType : 'json',
		cache : false,
		success : function(company, status, jqXHR) {
			if (onSuccess) {
				onSuccess(company, status, jqXHR);
			}
		},
		error : function(data, status, error) {
			if (onError) {
				onError(data, status, error);
			}
			else {				
				if (data.status == 404) {
					alert("Company not found.");
				}
				else {
					console.log("ERROR WITH AJAX CALL");
				}
			}
		}
	});
}