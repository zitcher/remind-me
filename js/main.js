$(document).ready(function() {
	var number;

  $("#submit-button").click(function() {
		number = $("#num").val();
		$(".add-reminder").fadeIn();
	  	$("#textme").show();
	  	$(".init-info").fadeOut();
	  	$("#textnum").html(number);
	});
	
	$(".delete").click(function(){
		alert("ran");
		var delText = this.parentElement.parentElement.parentElement.children[0].children[0].children[0].innerHTML;
		var delTS = this.parentElement.children[0].innerHTML;
		var delTime = delTS.substring(0, 5);
		var delDate = delTS.substring(6, 17);
		$.ajax({
			type: 'POST',
			url: '/delete',
			data: {number: number, text: delText, date: delDate, time: delTime},
			success: function(){
				console.log("delete success!");
				var delRow = $().add(this.parentElement.parentElement.parentElement);
				delRow.remove();
			},
			error: function(){
				console.log("delete failure!");
			}
		});
	});
	
	$("#setReminder").submit(function(){
		var text = $("#reminder").val();
		var date = $("#date").val();
		var time = $("#time").val();
			$.ajax({
				type: 'POST',
				url: '/reminder',
				data: {number: number, text: text, date: date, time: time},
				success: function(){
					console.log("Success!");
					var table = document.getElementById("table");
					var newRow = table.insertRow(1);
					var tableText = newRow.insertCell(0);
					var tableTime = newRow.insertCell(1);
					tableText.innerHTML = "<div class='datetime'><p>"+text+"</p></div>";
					tableTime.innerHTML = "<div class='datetime'><p>"+time + " " + date +"</p><div class='btn btn-danger delete'>Delete</div></div>";
					document.getElementById("setReminder").reset();
					$(".view-reminders").fadeIn();
					
					$("tr").click(function(){
						var deletebtn = $().add(this.children[1].children[0].children[1]);
						deletebtn.fadeIn();
						setTimeout(function(){
							deletebtn.fadeOut();
						}, 3000);
						
						$(".delete").click(function(){
							var delText = this.parentElement.parentElement.parentElement.children[0].children[0].children[0].innerHTML;
							var delTS = this.parentElement.children[0].innerHTML;
							var delRow = $().add(this.parentElement.parentElement.parentElement);
							var delTime = delTS.substring(0, 5);
							var delDate = delTS.substring(6, 17);
							$.ajax({
								type: 'POST',
								url: '/delete',
								data: {number: number, text: delText, date: delDate, time: delTime},
								success: function(){
									console.log("delete success!");
									delRow.remove();
								},
								error: function(){
									console.log("delete failure!");
								}
							});
							alert("ran");
						});
					});
					},
				error: function(){
					console.log("Failure!");
					$("#error").fadeIn();
					setTimeout(function(){
						$("#error").fadeOut();
					}, 4000);
				}
			});
		
		//alert("I ran");
		return false;
	});
	
	
});

function parseDate(date){
	var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	var string = date.toString();
	var year = string.substring(0, 4);
	var month = months[parseInt(string.substring(5, 7)) - 1];
	var day = parseInt(string.substring(8,10));
	if(day%10 === 1){
		day += "st ";
	} else if(day%10 === 2){
		day += "nd ";
	} else if(day%10 === 3){
		day += "rd ";
	} else{
		day += "th ";
	}
	return day + month + " " + year;
}

function reverseParse(parsed){
	
}
