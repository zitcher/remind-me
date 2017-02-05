$(document).ready(function() {
	var number;

    $("#submit-button").click(function() {
		number = $("#num").val();
		$("#submit-info").submit(function() {
			$.ajax({
				type: 'POST',
				url: '/phone',
				data: {phone: number}
			});
			$(".main-ui").show();
			return false;
		});
	});

	$("#add-reminder").click(function() {
		var text = $("#reminder").val();
		var date = $("#date").val();
		var time = $("#time").val();
		//var newRem = new Reminder(text, date, time);
		$("#setReminder").submit(function() {
			$.ajax({
				type: 'POST',
				url: '/reminder',
				data: {number: number, text: text, date: date, time: time}
			});
			$(".main-ui").show();
			return false;
		});
		var tableRow = document.createElement("TR");
		var child1 = document.createElement("TD");
		var child2 = document.createElement("TD");
		var t1 = document.createTextNode(text);
		var t2 = document.createTextNode(date + " " + time);
		tableRow.appendChild(child1.appendChild(t1));
		tableRow.appendChild(child2.appendChild(t2));
		//document.body.appendChild(tableRow);
		//parentElement.insertBefore(newElement, parentElement.children[2]);
		$("#table").appendChild(tableRow);

	});
});
